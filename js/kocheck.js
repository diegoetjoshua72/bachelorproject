// import {init_editor} from './editor.js';
import init, { run_test, increment } from "../pkg/koweb.js";
// import * as wasm from '../pkg/koweb.js';

function remove_all_outputs_dom() {
    document.querySelectorAll(".prompt").forEach((e) => e.remove());
}

function remove_all_errors_dom() {
    document.querySelectorAll(".error").forEach((e) => e.remove());
}

//when this is run all error tags should be cleared
//make a run string from url and a load string from url function

//we have to check the status of the ok property

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

//javascript and Webassembly share the same execution thread when you execute wasm within javascript the javascript halts and vice versa
//still some erors loadings idk

// editor.getModel().setValue('some value');
// console.log(window.editor);


// function get_piece(){
    //so i get the string from the url or the texteditor then from 
    //rust when i need a piece i get a piece of it 


    //read the string only when necessary
    // a() && b()
    //if a() is false JS won't execute b()
// }


//maybe i need a static property in this then 
class Prog {
    constructor(program_text){
        this.program_text = program_text[Symbol.iterator]();
        this.test = this.program_text.next();
    }

    get_piece(){
        return this.program_text.next();
    }
}


async function run(program = undefined) {
    try {
        remove_all_outputs_dom();
        await init();
        var testing = await window.editor.getValue();
        console.log("this is testing ::: ", testing);

        const prog = new Prog(testing);
        console.log(prog);

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
    } catch {
        remove_all_errors_dom();
        display_error_dom("something went wrong in the kontroli run", "errors");
    }
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

//i see this works quite well the state is kept intact hmm
//i should re read the research paper
//but i have to wait for the run before doing this but that makes sense
//once run is done things are inscope
var test = document.getElementById("increment");
test.onclick = () => {
    increment();
};
