// import {init_editor} from './editor.js';
import init, { run_test } from "../pkg/koweb.js";
// import * as wasm from '../pkg/koweb.js';

function remove_all_errors_dom() {
    document.querySelectorAll(".error").forEach((e) => e.remove());
}

//when this is run all error tags should be cleared
//make a run string from url and a load string from url function
function load_program_from_url(context_id) {
    remove_all_errors_dom();
    const url = document.getElementById("url").value;
    if (url != "") {
        fetch(url)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => load_text_from_url_in_editor(string))
                    .catch((err) => {
                        //make 404s display the error message
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
                display_error_dom(err, context_id);
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
            .then((result) => {
                result
                    .text()
                    .then((string) => run(string))
                    .catch((err) => {
                        //make 404s display the error message
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
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

async function run(program = undefined) {
    try {
        const wasm = await init();
        window.wasm = wasm;
        console.log(wasm);
        var testing = await window.editor.getValue();
        console.log("this is testing ::: ", testing);
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
        display_error_dom("something went wrong in the run", error);
    }
}

print_options();
console.log(window.wasm);

var load_url = (document.getElementById("load_url").onclick = () => {
    load_program_from_url("error");
});

var run_url = (document.getElementById("run_url").onclick = () => {
    run_program_from_url("error");
});

var run_button = document.getElementById("run");
run_button.onclick = async () => {
    await run();
};
