import init, { run_test, increment_test , read_some } from "../pkg/koweb.js";
import * as Program from "./program.js";



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
        const prog = Program.Prog.static_constructor(testing);
        console.log(prog);
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

var load_make = document.getElementById("load_make");
test.onclick = () => {
    fetch_make_text_from_url();
};

// var testbuff = document.getElementById("testbuff");
// test.onclick = () => {
//     read_some(Prog.);
// };
