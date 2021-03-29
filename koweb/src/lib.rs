use wasm_bindgen::prelude::*;

//parses strings into commands which are then either
use colosseum::unsync::Arena;
// use kontroli::error::SignatureError;
use kontroli::rc::{Intro, Rule, Signature, Typing};
use kontroli::scope::{Command, Symbols};

// use kontroli::error::Error;
use kontroli::error::SymbolsError;

use byte_unit::{Byte, ByteError};
use kocheck::{Opt, Event, parse, Error};


//not sure what wee alloc does
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn alert(s: &str);
}

//https://github.com/Deducteam/lambdapi/tree/master/editors/vscode

#[wasm_bindgen]
pub fn greeting() {
    alert("debug code is run");
}



pub struct JsOpt {
    eta: bool,
    no_scope: bool,
    no_infer: bool,
    no_check: bool,
    // buffer: Byte,
    // channel_capacity: Option<Option<usize>>,
    program: String, //&[u8]

}

impl JsOpt {
    pub fn from_js_args ( program: &str, eta:bool,no_scope:bool,no_infer:bool,no_check:bool) -> Self {
        
        Self {
            eta,
            no_scope,
            no_infer,
            no_check,
            program: program.to_string(),
        }
    }
}

//TODO
//lets turn our js string into a &[u8] 
//parse also wants some buffer size but idk i guess i need to give the default or something 64MB
//ok lets do that then i get the string from the editor then i will try to parse it here with this produce function and we will see
//whats next

//this will take my program and turn it into commands modules 
// fn produce(pr: PathRead, opt: &Opt) -> impl Iterator<Item = Result<Event, Error>> {
//     let path = std::iter::once(Ok(Event::Module(pr.path)));
//     let cmds = parse(pr.read, &opt).map(|cmd| cmd.map(Event::Command));
//     path.chain(cmds)
// }


//but here i don't need a file path vector and then to turn those files into iterators all i should get is a string and change that into an iterator 
//like i could just pass the program as a string and then split it into an vector or strings for every line and then turn it into an iterator and run it 

fn produce_from_js(program_str: &'static String ,opt: &Opt ) -> impl Iterator<Item = Result<Event, Error>>{
    unsafe{
        let cmds = parse(program_str.as_bytes(),opt).map(|cmd| cmd.map(Event::Command));
        cmds 
    }
}

//turn my stuff into a Pathread 


#[wasm_bindgen]
pub fn run_test(cmds_from_js: 'static + String, eta: bool, no_scope: bool, no_infer: bool , no_check: bool) -> Result<(), JsValue> {
    // set_panic_hook();
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();
    alert(&cmds_from_js[..]);

    let optjs = JsOpt::from_js_args(&cmds_from_js[..], eta, no_scope, no_infer, no_check);
    
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

    unsafe {
        produce_from_js(&cmds_from_js, &opt);
    }

    //how can i turn my string into Commands

    // produce(pr?, &opt)
    //when i produce i will get an iterator of Enums Event:Module followed by Event:Commands i guess i'll make some special js module 

    //i need to make this kind of thing work get a similar output 

    //1 we need to parse into commands which are actually of the type EVENT
    //2 we then need to parse commands which is done by the consome 

    //fn produce(pr: PathRead, opt: &Opt) -> impl Iterator<Item = Result<Event, Error>> {
    //     let path = std::iter::once(Ok(Event::Module(pr.path)));
    //     let cmds = parse(pr.read, &opt).map(|cmd| cmd.map(Event::Command));
    //     path.chain(cmds)
    // }   


    //calling parse on my string when passing it in parse .as_bytes()
    // https://stackoverflow.com/questions/32674905/pass-string-to-function-taking-read-trait

    let cmds = [
        // declarations
        "prop :.\n",
        "imp : prop -> prop -> prop.\n",
        // definition with a rewrite rule
        "def proof : prop -> Type.\n",
        "[x, y] proof (imp x y) --> proof x -> proof y.\n",
        // theorem
        r"thm imp_refl (x : prop) : proof (imp x x) := p : proof x => p.\n",
    ];

    let arena = Arena::new();
    let mut syms = Symbols::new();
    let mut sig = Signature::new();

    for c in cmds.iter() {
        // parse and scope command in one go
        let cmd: Command<String> = Command::parse(c, &syms).unwrap();
        match cmd {
            // introduction of a new name
            Command::Intro(id, it) => {
                let id: &str = arena.alloc(id);
                // add symbol to symbol table and fail if it is not new
                let sym = syms.insert(id).unwrap();

                //TODO
                //need to figure out how i can do error handling code and pass them to the js
                // match sym {
                //     Ok(symbol) => sym = symbol,
                //     Err(SymbolsError) => return Ok(JsValue.from_str("test")),
                // }

                // typecheck and insert into signature
                let typing: Typing = Typing::new(Intro::from(it), &sig)
                    .unwrap()
                    .check(&sig)
                    .unwrap();
                sig.insert(sym, typing).unwrap()
            }
            // addition of rewrite rules
            Command::Rules(rules) => sig.add_rules(rules.into_iter().map(Rule::from)).unwrap(),
        }
    }
    Ok(())
}
