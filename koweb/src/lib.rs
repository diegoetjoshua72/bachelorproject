use wasm_bindgen::prelude::*;

//parses strings into commands which are then either
use colosseum::unsync::Arena;
// use kontroli::error::SignatureError;
use kontroli::rc::{Intro, Rule, Signature, Typing};
use kontroli::scope::{Command, Symbols};

// use kontroli::error::Error;
use kontroli::error::SymbolsError;

use byte_unit::{Byte, ByteError};
use kocheck::{Opt, Event, parse, seq, Error};
use log::{info, trace, warn};

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

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn coslog(s: &str);

}

//https://github.com/Deducteam/lambdapi/tree/master/editors/vscode

#[wasm_bindgen]
pub fn greeting() {
    alert("debug code is run");
}

fn produce_from_js(cmds_from_js: &'static str ,opt: &Opt ) -> impl Iterator<Item = Result<Event, Error>>{
    let cmds = parse(cmds_from_js.as_bytes(), opt).map(|cmd| cmd.map(Event::Command));
    cmds 
}

fn string_to_static_str(s: String) -> &'static str {
    Box::leak(s.into_boxed_str())
}

fn write_to_webconsole(event: &kocheck::Event){
    //i need to match here on the cocheck enum ??
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let body = document.body().expect("document should have a body");

    // let val = document.get_element_by_id("console").unwrap();
    let val = document.create_element("p").unwrap();
    val.set_text_content(Some(format!("{}",event).as_str()));
    body.append_child(&val).unwrap();
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


fn print_iterator<I>(iter: &mut I )
where I : Iterator<Item = Result<Event, Error>>,
{
    for element in iter {
        match element{
            Result::Ok(Event) => info!("{}",Event),
            
            Result::Err(Error) => info!("something went wrong : {:?}",Error)
        }
    }
}

#[wasm_bindgen]
pub fn run_test(cmds_from_js: String, eta: bool, no_scope: bool, no_infer: bool , no_check: bool) -> Result<(), JsValue> {

    wasm_logger::init(wasm_logger::Config::default());
    init_console_wasm_debug();
    alert(cmds_from_js.as_str());
    //CAREFULLLLL when something goes wrong in the code i get unreachable in the browser console i need to find a way to get good error messages
    //essayer de virer le static lifetime =)
    //essayer le wasm log 
    //essayer de passer de maniere async le code dans le text editor (lazy)
    //verification de fichier passer par le file system ou url
    //run from : ---- 
        //error
        // -> String ??? -> (peut etre async lazy reading)???
        //regarder le parse buffer

    //typing reduce convertible 
    //something i wrong and i reach unreachable how can i fix that the logging works tho which is really cool


    // env_logger::from_env(Env::default().filter_or("LOG", "warn")).init();
    // log::debug!("hello");
    

    let static_cmds_str  = string_to_static_str(cmds_from_js);

    
    let opt = Opt {
        eta,
        no_scope,
        no_infer,
        no_check,
        buffer : Byte::from_str("64MB").unwrap(),
        channel_capacity : None ,
        jobs : None,
        files : vec!(),
    };

    let iter = produce_from_js(static_cmds_str, &opt);
    
    let mut iter = Box::new(iter).inspect(|r| r.iter().for_each(|event| write_to_webconsole(event)));
    
    // alert(format!("{}",iter.size_hint()));
    //lets print out the iterator to the console i think that would be useful information 
    
    print_iterator(&mut iter);
    

    seq::consume(iter, &opt).expect("something went wrong in the consume");

    //changer la face log 
    
    //that's done through the env logger
    //compare the terminal logs with the logs that i got on the page 
    //and what next find how many things i have to iterate on like the size of the iterator
    //i want to be able to get error messages and line numbers 
    //then i want to be able to run it with the run button 
    //make the loading bar thing
    //calling parse on my string when passing it in parse .as_bytes()
    // https://stackoverflow.com/questions/32674905/pass-string-to-function-taking-read-trait

    Ok(())
}
