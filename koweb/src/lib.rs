use wasm_bindgen::prelude::*;
//parses strings into commands which are then either
// use kontroli::error::SignatureError;
// use kontroli::rc::{Intro, Rule, Signature, Typing};
// use kontroli::scope::{Command, Symbols};
// use kontroli::error::Error;
// use kontroli::error::SymbolsError;

use byte_unit::{Byte, ByteError};
use kocheck::{parse, seq, Error, Event, Opt};

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

//parse buffer info
//it is a struct with some fields buffer that is a circular buffer and
// read parse fail which are generic types and i assume they each become something like koparse are whater
//read needs to implement the read trait

//the parse buffer trait implements the following functions
//fill
//keepds reading until either the buffer is full or the reader returns no data.

//and it implements the iterator trait
//this is the complicated looking part
//the implementation of the next function for this buffer

//the subtype is type Item = Result<O,E>

//Iresult is the result of parsing functions it depends on I the input type and O the output type
//donce P

//pub enum IResult<I, O, E = u32>

//it takes 5 generic types
//O it looks like its the output type
//E it looks like this is the error type
//R is what we are reading
//P function that returns a result of parsing some input IResult the input is an array of &[u8] and the output is of type O or verbose Error
//F in case of failure this function takes in the parsing error and returns an E which is the error type

//next()
//returns an option with an item with inside a result<O,E>
//what does a loop return in rust ?
//matching on two things at the same time its not actually its calling a fuction
//self.parse calls a function with self.buf.data as argument and we match on that
//if no more space and position is 0 then we double otherwise we shift ?
//
//if the available space is not 0 and we parsed something incomplete then we call self fill()
//if there is no more available data in the buffer then we break
//else if there was nothing in the read_byte variable that we set to the reutrn of fill
//then the code itself is incomplete so we send an error
//
//if we match an err that is not an err::incomplete we break

//if the parsing was ok then we break and we return something about the data remaining
//and some ok toplevel ok the breaks return the value to consumed and result
//

//

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

//TODO list
//1 lazi
//2 better debug line of parse error would be nice
//3 loading bar
//4 makefiles loading multiple files (multiple editor tabs and file system)

//essayer de virer le static lifetime =)
//essayer de passer de maniere async le code dans le text editor (lazy)
//verification de fichier passer par le file system ou url
//run from : ----
//error
// -> String ??? -> (peut etre async lazy reading)???
//regarder le parse buffer
//typing reduce convertible
//i want to be able to get error messages and line numbers
//then i want to be able to run it with the run button
//make the loading bar thing
//calling parse on my string when passing it in parse .as_bytes()
// https://stackoverflow.com/questions/32674905/pass-string-to-function-taking-read-trait

//try to get rid of the run_test arguments

//lets try and read from that js iterator in prog from rust without passing it

// pub fn

//UTILISER LE PARSE BUFFER
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
