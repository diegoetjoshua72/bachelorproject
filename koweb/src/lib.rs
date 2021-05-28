use wasm_bindgen::prelude::*;
//parses strings into commands which are then either
// use kontroli::error::SignatureError;
// use kontroli::error::Error;
// use kontroli::rc::{Intro, Rule, Signature, Typing};
// use kontroli::scope::{Command, Symbols};
// use kontroli::error::SymbolsError;
use byte_unit::{Byte, ByteError};
use js_sys::{Error as JsError, JsString, Reflect};
use kocheck::{parse, seq, Error, Event, Opt};
use log::{info, trace, warn, Level};
use serde::{Deserialize, Serialize};

// use crate::itertools::Itertools;

pub mod lazy_fetch;
pub mod parse_make;

//not sure what wee alloc does
// #[cfg(feature = "wee_alloc")]
// #[global_allocator]
// static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

extern crate console_error_panic_hook;
use std::panic;

fn init_console_wasm_debug() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

static mut test: i32 = 0;

#[wasm_bindgen]
pub fn get_string_js(string_js: String) -> String {
    return string_js;
}

#[wasm_bindgen()]
pub fn increment_test() {
    unsafe {
        // alert(Prog::get_piece_to_koweb_static().as_str());
        // alert(Test::test_text().as_str());
        // alert(call_exported_rust_func().as_str());
        // alert(Test2::test_text2().as_str()); MIME TYPE ISSUE AAA
        // let value = js_sys::Reflect::get(&target, &property_key).expect("reflect failed");
        alert(format!("test : {}", test).as_str());
        test += 1;
    }
}

fn get_text_from_editor() -> Result<String, ()> {
    let window = web_sys::window().expect("no window found");
    // let editor = window.editor();
    let object = match Reflect::get(&window, &js_sys::JsString::from("editor")) {
        Ok(value) if value.is_object() => Ok(value),
        _ => Err("Window object doesn't have a suitable property"),
    }
    .unwrap();

    let method: js_sys::Function = match Reflect::get(&object, &js_sys::JsString::from("getValue"))
    {
        Ok(value) if value.is_function() => {
            // wasm_bindgen::JsValue => js_sys::Function
            Ok(value.into())
        }
        _ => Err("object does not have the specified method"),
    }
    .unwrap();

    let arguments = js_sys::Array::new();

    match Reflect::apply(&method, &object, &arguments) {
        Ok(result) => {
            info!("Applied method successfully.");
            info!("This is the result {:?}", result);
            return Ok(result.as_string().unwrap()); //find how to change JsValue to string
        }
        Err(error) => {
            info!("Attempt to apply method failed.");
        }
    }
    Err(())
}

fn produce_from_js<'a>(
    cmds_from_js: &'a String,
    opt: &Opt,
    module_name: String,
) -> impl Iterator<Item = Result<Event, Error>> + 'a {
    info!("module name in produce -> {}", module_name);
    let module = std::iter::once(Ok(Event::Module(vec![module_name])));
    let commands = parse(cmds_from_js.as_bytes(), opt).map(|cmd| cmd.map(Event::Command));
    // cmds
    module.chain(commands)
}

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

fn write_to_webpage(event: &kocheck::Event) {
    //i need to match here on the cocheck enum ??
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");
    // let val = document.get_element_by_id("console").unwrap();
    let div = document.create_element("div").unwrap();
    let text = document.create_element("p").unwrap();
    let lambda_span = document.create_element("span").unwrap();
    lambda_span.set_class_name("lambda");
    lambda_span.set_text_content(Some("λ> "));
    text.set_class_name("line");
    text.set_text_content(Some(format!("{}", event).as_str()));
    div.set_class_name("prompt");
    div.append_child(&lambda_span);
    div.append_child(&text);
    let output = document.get_element_by_id("output").unwrap();
    output.set_class_name("display_output");
    output.append_child(&div).unwrap();
}

fn write_output_header(module_name: &String) {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");
    // let val = document.get_element_by_id("console").unwrap();
    let div = document.create_element("div").unwrap();
    let text = document.create_element("p").unwrap();
    let header_span = document.create_element("span").unwrap();
    header_span.set_class_name("header_output");
    header_span.set_text_content(Some("#> "));
    text.set_class_name("line");
    text.set_text_content(Some(format!("{}", module_name).as_str()));
    div.set_class_name("prompt");
    div.append_child(&header_span);
    div.append_child(&text);
    let output = document.get_element_by_id("output").unwrap();
    output.set_class_name("display_output");
    output.append_child(&div).unwrap();
}

//temporary i'll use the definition from bin maybe
pub fn flatten_nested_results<O, I, T, E>(outer: O) -> impl Iterator<Item = Result<T, E>>
where
    O: Iterator<Item = Result<I, E>>,
    I: Iterator<Item = Result<T, E>>,
{
    outer.flat_map(|inner_result| {
        let (v, r) = match inner_result {
            Ok(v) => (Some(v), None),
            Err(e) => (None, Some(Err(e))),
        };
        v.into_iter().flatten().chain(r)
    })
}

fn print_iterator<I>(iter: &mut I)
where
    I: Iterator<Item = Result<Event, Error>>,
{
    for element in iter {
        match element {
            Result::Ok(Event) => log(format!("{}", Event).as_str()),
            Result::Err(Error) => log(format!("something went wrong : {:?}", Error).as_str()),
        }
    }
}

#[wasm_bindgen]
pub fn run_test(cmds_from_js: String, eta: bool, no_scope: bool, no_infer: bool, no_check: bool) {
    // let mut f = File::open("foo.txt")?;
    // let mut buffer = [0; 10];

    console_log::init_with_level(Level::Trace);
    init_console_wasm_debug();
    // alert(cmds_from_js.as_str());

    let program_text = get_text_from_editor().unwrap();

    // let static_cmds_str = string_to_static_str(cmds_from_js);

    let opt = Opt {
        eta,
        no_scope,
        no_infer,
        no_check,
        buffer: Byte::from_str("64MB").unwrap(),
        channel_capacity: None,
        jobs: None,
        files: vec![],
    };

    let iter = produce_from_js(&program_text, &opt, String::from("js"));

    let mut iter = Box::new(iter).inspect(|r| r.iter().for_each(|event| write_to_webpage(event)));

    seq::consume(iter, &opt).expect("something went wrong in the consume");

    // Ok(())
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Program {
    name: String,
    dependency: Vec<String>,
    dependency_url_list: Vec<String>,
    raw_url: String,
}

//TODO split in multiple files better after
pub mod fetch_buffer;

#[wasm_bindgen]
pub async fn run_multiple(
    programs: JsValue,
    module_to_run: String,
    eta: bool,
    no_scope: bool,
    no_infer: bool,
    no_check: bool,
) {
    console_log::init_with_level(Level::Trace);
    init_console_wasm_debug();
    let vec_of_programs: Vec<Program> = programs.into_serde().unwrap();
    info!(
        "this is the program we want to run : {} ",
        module_to_run.as_str()
    );
    // info!("PROGRAM LIST IN RUST : {:?}", vec_of_programs);

    for program in vec_of_programs {
        if program.name == module_to_run {
            info!("This is all the program info -> {:?}", program);
            info!("Name of the Program we want to run -> {}", module_to_run);
            let opt = Opt {
                eta,
                no_scope,
                no_infer,
                no_check,
                buffer: Byte::from_str("64MB").unwrap(),
                channel_capacity: None,
                jobs: None,
                files: vec![],
            };
            //maybe i will just do the run here

            produce_from_fetch(
                program
                    .dependency
                    .into_iter()
                    .zip(program.dependency_url_list.into_iter())
                    .collect(),
                &opt,
            )
            .await;
        }
    }
}

async fn produce_from_fetch(dependency_url_list: Vec<(String, String)>, opt: &Opt) {
    info!("got to produce");
    let mut list_text = vec![];
    let mut list_module = vec![];
    for (file_name, url) in dependency_url_list {
        info!("running file => {}", file_name);
        write_output_header(&file_name);

        let res = lazy_fetch::get_program_text(&url)
            .await
            .expect("fetch did not return anything");

        let test_string = String::from_utf8(res.clone().into_inner()).unwrap();
        list_text.push(test_string);
        //parse b
        list_module.push(file_name);
    }
    //
    let vec_iter = produce_from_js_multiple(&list_text, &opt, list_module);
    let iter = vec_iter.into_iter().flat_map(|it| it);
    let mut iter = Box::new(iter).inspect(|r| r.iter().for_each(|event| write_to_webpage(event)));

    seq::consume(iter, &opt).expect("something went wrong in the consume");
}

fn produce_from_js_multiple<'a>(
    list_text: &'a Vec<String>,
    opt: &Opt,
    list_module: Vec<String>,
) -> Vec<impl Iterator<Item = Result<Event, Error>> + 'a> {
    let mut result = vec![];
    for i in 0..list_text.len() {
        let commands = parse(list_text[i].as_bytes(), opt).map(|cmd| cmd.map(Event::Command));
        let module = std::iter::once(Ok(Event::Module(vec![list_module[i].clone()
            [0..list_module[i].len() - 3]
            .to_string()])));
        //.dk enlever
        result.push(module.chain(commands));
    }
    result
}

//enlever.dk
//

// symbol checking is performed on the address of the pointer, making them constant-time operations.
// so the symbol that i care about is sttfa.etap
// two different symbols pointing to equivalent strings are not equal
// To consistently assign the same symbols to equivalent strings, you can use the Symbols type.

//it looks like it stores file paths for modules does it read the files again for the symbols ??
//Ko(Scope(UndeclaredSymbol("sttfa.etap")))

//not sure now i should have modules and such
//add module name to produce
//i probably need to remove everything including . in the filename variable
//pass it to produce from js
//
// i need module sttfa when i run sttfa.dk and then maybe i don't need to have all the files
// loaded at once it would make sense that sttfa.etap is syntax to get stuff from the sttfa module
//that means i need to run them one by one to make all the modules ?

//hope it works this way it does not something to do with how symbols and things are stored
//how could it not work its this .etap things that does not want to work im only calling comsume once so
// def True :
// sttfa.etap (sttfa.p sttfa.bool())
//this fails and its the first line of the second file so is the first file not executed properly ?
