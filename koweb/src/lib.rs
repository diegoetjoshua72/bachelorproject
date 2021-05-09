use wasm_bindgen::prelude::*;
//parses strings into commands which are then either
// use kontroli::error::SignatureError;
// use kontroli::rc::{Intro, Rule, Signature, Typing};
// use kontroli::scope::{Command, Symbols};
// use kontroli::error::Error;
// use kontroli::error::SymbolsError;
use byte_unit::{Byte, ByteError};
use kocheck::{parse, seq, Error, Event, Opt};
use serde::{Deserialize, Serialize};

use log::{info, trace, warn, Level};

// use crate::itertools::Itertools;

pub mod lazy_fetch;
pub mod parse_make;

//not sure what wee alloc does
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

extern crate console_error_panic_hook;
use std::panic;

//i should get the the automatic code format and debugger going as well today
fn init_console_wasm_debug() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}

// #[wasm_bindgen(module = "/www/js/program.js")]
// extern "C" {
// type Prog;
// #[wasm_bindgen(static_method_of = Prog)]
// fn get_piece_to_koweb_static() -> String;
// }

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// #[wasm_bindgen(module = "/www/js/kocheck.js")]
// extern "C" {
//     //reflect object might be what we are looking for
//     pub type Test2;

//     #[wasm_bindgen(static_method_of = Test2)]
//     pub fn test_text2() -> String;
// }

#[wasm_bindgen(module = "/www/js/program.js")]
extern "C" {
    //reflect object might be what we are looking for
    pub type Test;

    #[wasm_bindgen(static_method_of = Test)]
    pub fn test_text() -> String;

}

// #[wasm_bindgen(module = "/www/js/init_wasm.js")]
// extern "C" {
//     //reflect object might be what we are looking for

//     pub fn call_exported_rust_func() -> String;
// }

static mut test: i32 = 0;

#[wasm_bindgen]
pub fn get_string_js(string_js: String) -> String {
    return string_js;
}

//this function is called in the js or rust context and executes in the rust context
//so i can pass a string as argument in js and use it here
//
//the other way i thought is to get a function that i can call in rust that executes in the
//js context and that allowes me to read a string from the js context
//
//like i could call a function that i export from js that calls a function
//that is exported from rust
//that will pass the string TODO this <- ->

#[wasm_bindgen()]
pub fn increment_test() {
    unsafe {
        // alert(Prog::get_piece_to_koweb_static().as_str());
        alert(format!("test : {}", test).as_str());
        alert(Test::test_text().as_str());
        // alert(call_exported_rust_func().as_str());
        // alert(Test2::test_text2().as_str()); MIME TYPE ISSUE AAA

        // let value = js_sys::Reflect::get(&target, &property_key).expect("reflect failed");
        test += 1;
    }
}
//manage to get strings from koweb

fn produce_from_js(
    cmds_from_js: &'static str,
    opt: &Opt,
) -> impl Iterator<Item = Result<Event, Error>> {
    let module = std::iter::once(Ok(Event::Module(vec!["js".to_string()])));
    let cmds = parse(cmds_from_js.as_bytes(), opt).map(|cmd| cmd.map(Event::Command));
    module.chain(cmds)
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
pub fn run_test(
    cmds_from_js: String,
    eta: bool,
    no_scope: bool,
    no_infer: bool,
    no_check: bool,
) -> Result<(), JsValue> {
    // let mut f = File::open("foo.txt")?;
    // let mut buffer = [0; 10];

    println!("hello this is a test");
    console_log::init_with_level(Level::Trace);
    init_console_wasm_debug();
    alert(cmds_from_js.as_str());

    info!("testing the info part");

    let static_cmds_str = string_to_static_str(cmds_from_js);

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

    let iter = produce_from_js(static_cmds_str, &opt);

    let mut iter = Box::new(iter).inspect(|r| r.iter().for_each(|event| write_to_webpage(event)));

    seq::consume(iter, &opt).expect("something went wrong in the consume");

    Ok(())
}

// Result::unwrap()` on an `Err` value: Error("invalid type: string \"[]\", expected a sequence", line: 1, column: 4)', koweb/./src/lib.rs:209:69

#[derive(Serialize, Deserialize, Debug)]
pub struct Program {
    name: String,
    dependency: Vec<String>,
    raw_url: String,
}

#[wasm_bindgen]
pub fn run_multiple(programs: &JsValue) {
    console_log::init_with_level(Level::Trace);
    init_console_wasm_debug();
    let vec_of_programs: Vec<Program> = programs.into_serde().unwrap();
    info!("PROGRAM LIST IN RUST : {:?}", vec_of_programs);

    //i would need the list of url for the dependencies

    for program in vec_of_programs {
        let result = lazy_fetch::get_chunk(program.raw_url, 1000);
        //i don't want to return a future here
        info!("result of chunk");
    }
}
