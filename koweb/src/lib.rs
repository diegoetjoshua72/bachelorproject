use wasm_bindgen::prelude::*;

//parses strings into commands which are then either
use colosseum::unsync::Arena;
// use kontroli::error::SignatureError;
use kontroli::rc::{Intro, Rule, Signature, Typing};
use kontroli::scope::{Command, Symbols};

// use kontroli::error::Error;
use kontroli::error::SymbolsError;

use byte_unit::{Byte, ByteError};
use kocheck::{parse, seq, Error, Event, Opt};

use log::{info, trace, warn, Level};

//not sure what wee alloc does
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

extern crate console_error_panic_hook;
use std::panic;

//i should get the the automatic code format and debugger going as well today
fn init_console_wasm_debug() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));

    // ...
}

#[wasm_bindgen(module = "/www/js/kocheck.js")]
extern "C" {
    fn name() -> String;
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn read_some(stuff: &str) {
    // let buffer = vec![0;100];
    alert(stuff);
    // for c in stuff.bytes(){
    // buffer.append(&mut c);
    // }
    //need to get a piece of the string defined by the user the amount
}

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

static mut test: i32 = 0;

#[wasm_bindgen()]
pub fn increment_test() {
    unsafe {
        alert(name().as_str());
        alert(format!("test : {}", test).as_str());
        test += 1;
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
    alert(name().as_str());
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
