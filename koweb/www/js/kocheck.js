import init, { run_test, increment_test , get_graph_rust} from "../pkg/koweb.js";
// import * as Program from "./program.js";





class Mem {
    constructor() {
        this.program_list = [];
    }

    add_mem(item){
        this.program_list.push(item);
    }

    clear_mem(){
        this.program_list = [];
    }
}

class Program {
    constructor(text, dependency, raw_url){
        this.text = text;
        this.dependency = dependency;
        this.raw_url = raw_url;
    }
    //get bit of string function that will need to be passed to rust ?
    //
}

let memory = new Mem();


function remove_all_outputs_dom() {
    document.querySelectorAll(".prompt").forEach((e) => e.remove());
}

function remove_all_errors_dom() {
    document.querySelectorAll(".error").forEach((e) => e.remove());
}

let check_fetch = function check_fetch(response) {
    if (response.ok === false) {
        display_error_dom(
            "ERROR IN FETCH : " + response.statusText + " - " + response.url,
            "errors"
        );
        throw Error(response.statusText);
    }
    return response; //why do we return tho
};

function load_program_from_url(context_id) {
    remove_all_errors_dom();
    const url = document.getElementById("url").value;
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE GET FROM THE URL :: ",
                            string
                        );
                        load_text_from_url_in_editor(string);
                    })
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                // display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", context_id);
    }
}

function run_program_from_url(context_id) {
    remove_all_errors_dom();
    const url = document.getElementById("url").value;
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text()
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE RUN FROM THE URL :: ",
                            string
                        );
                        run(string);
                    })
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", context_id);
    }
}

function display_error_dom(error_msg, context) {
    var error_msg_dom = document.createElement("p");
    var text = document.createTextNode(error_msg);
    error_msg_dom.classList.add("error");
    error_msg_dom.classList.add("bounce-in");
    error_msg_dom.appendChild(text);
    var element = document.getElementById(context);
    element.appendChild(error_msg_dom);
}

function print_options() {
    console.log(window.editor);
    console.log(document.querySelector("#eta").checked);
    console.log(document.querySelector("#no_scope").checked);
    console.log(document.querySelector("#no_infer").checked);
    console.log(document.querySelector("#no_check").checked);
}

function load_text_from_url_in_editor(program_text) {
    window.editor.setValue(program_text);
}




//i will have to do like a check here for 64 MB 
// [...Buffer.from('hello world')] test this
const myIter = new String("new string that i want to pass in like maybe three next calls something like that")[Symbol.iterator] = function () {
    return {
        start: 0,
        end: this.length,
        size_slice: 2,
        next() {
            return {
                done: (this.start < this.end) ? false : true,
                value: () => {
                    let result = this.slice(this.start, this.size_slice);
                    this.start += this.size_slice;
                    return result;
                }
            }
        }
    }
}

console.log(myIter);

// for (let i = 0; i<10 ; i++) {
//     console.log("CUSTOM ITERATOR TEST", myString.next());
// }

function unpack(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}
// console.log("turning string into BYTES : ", unpack(myString));
// console.log("BYTE STRING TEST: ", [...Buffer.from(myString)])
// console.log([...myString]);



//expolorer facon async de passer des donnes de javascript vers rust
//maybe i can pass a closure to the run function 
//iterators and generators 
//
async function run(program = undefined) {
    // try {
        remove_all_outputs_dom();
        await init();
        var testing = await window.editor.getValue();
        // const prog = Program.Prog.static_constructor(testing);
        // console.log(prog);
        //si la classe casse trop les couilles je peut faire une closure mais je pense la classes c'est bien


        // prog.go_through_iterator();
        // prog.get_piece_to_koweb();

        if (program === undefined) {
            run_test(
                window.editor.getValue(),
                document.getElementById("eta").checked,
                document.getElementById("no_scope").checked,
                document.getElementById("no_infer").checked,
                document.getElementById("no_check").checked
            );
        } else {
            console.log("ran from url");
            run_test(
                program,
                document.getElementById("eta").checked,
                document.getElementById("no_scope").checked,
                document.getElementById("no_infer").checked,
                document.getElementById("no_check").checked
            );
        }
    // } catch {
    //     remove_all_errors_dom();
    //     display_error_dom("something went wrong in the kontroli run", "errors");
    // }
}

var load_url = (document.getElementById("load_url").onclick = () => {
    load_program_from_url("errors");
});

//this performs run
var run_url = (document.getElementById("run_url").onclick = () => {
    run_program_from_url("errors");
});

var run_button = document.getElementById("run");
run_button.onclick = async () => {
    await run();
};

var test = document.getElementById("increment");
test.onclick = () => {
    increment_test();
};



//TODO
//now the wasm is compiling 
//try import the new function 
//try run it here on the make button 
//see if i can console.log the output if i can that would be great i then just need to adapt the code in the parse.js
//and do everything in this onclick i guess 
//1 user clicks
//2 gets the make string from url
//3 passes the maek string to rust
//4 rust returns everything 
// -> generate gitraw urls for each file that we might need
//5 generate html and css for the modules
//6 store the information returned by rust permanently somehow 
// -> when clicking on the file name it will do a fetch for its raw url but how can i determine how large it is whilst fetching
// -> using a HEAD Request ???
//7 enable the possibility to load the files in the editor WITH WARNING IF THE FIlE IS TOO LARGE <--- GOAL FOR TODAY

//8 create a program queue and a program class make the parse buffer work and the passing of string data to the parse buffer
//take and give 
//9 add the possibility for run to run mulitiple files 


//TODO IMPORTANT FOR UNDERSTANDING AND PRESENTATION / WRITTING PAPER 
//make a little comparison program for sieves of primes to see what gains in performance can be obtained with wasm (talk about the use of the sieves prime for cpu tests)
//understand how javascript function are passed to rust 
//understand how rust gets transpiled to wasm 
//how is the wasm executed with regards to javascript 
//talk about async programing and why wasm needs to be loaded async
// you need to get to the mulithreading part i want to talk about if it is possible or not to do multithreading and why not or why it is 




// https://github.com/01mf02/kontroli-rs/blob/master/examples/sudoku/deps.mk
function fetch_make_text_from_url(){
    // const url = "https://raw.githubusercontent.com//bachelorproject/master/examples/kontroli.mk";
    remove_all_errors_dom();
    const url = document.getElementById("urlmake").value; //continue here
    console.log(url);
    if (url != "") {
        fetch(url,{mode: 'no-cors'})
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE GET FROM THE URL :: ",
                            string
                        );
                        generate_gitraw_urls(get_graph_rust(string)); //donc ici je vais utiliser un fonction rust qui permetra de get let dependences 
                    })  //here we need to call the get dep from rust then we can generate the html and the css from it and the raw urls
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, "errors");
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                // display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", "errors");
    }
}


var load_make = document.getElementById("load_make");
load_make.onclick = () => {
    fetch_make_text_from_url();
    // let test = get_graph_rust(make_text);
    // console.log(test);
};

function generate_gitraw_urls(make_text){
    console.log(make_text);
    //todo 
    //generating the gitraw urls 
    //fetching the data and storing it somewhere only when the user clicks on a sub button
    //i need some kind of memory that keeps track of all the programs loaded 
    //global variable ? session ? i think i will just use global object called
    //Mem with a list that contains prog objects that have the program text and their 
    //dependency tree 

    //and that checks before loading them how large they are
    //this memory will also be used for the running of the programs 
}

//first lets make the url work rather than passing the hardcoded
//ok now that i have this output it needs to be stored somehow 
//and somewhere but i am not sure where it would get stored 



// var testbuff = document.getElementById("testbuff");
// test.onclick = () => {
//     read_some(Prog.);
// };
