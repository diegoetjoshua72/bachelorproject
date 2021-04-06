
// import {init_editor} from './editor.js';
import init, {run_test } from '../pkg/koweb.js';
// import * as wasm from '../pkg/koweb.js';

console.log(window.editor);

// var eta = document.querySelector("#eta").checked;
// var no_scope = document.querySelector("#no_scope").checked;
// var no_infer = document.querySelector("#no_infer").checked;
// var no_check = document.querySelector("#no_check").checked;
//no_scope no_infer no_check



function get_string_from_url () {
    const url = document.getElementById("url").value;
    if(url != ""){
        fetch(url).then(result => {
            result.text().then(string => console.log(string)).catch("Could not get the text");
        }).catch("Given Url is not valid")
    }
    else {
    

    }
}

function display_error_onpage (error_msg, context) {
    var error_msg_dom = document.createElement("p");
    var text = document.createTextNode(error_msg);

    tag.appendChild(text);
    var element = document.getElementById(context);
    element.appendChild(tag);
}


function print_options(){
    console.log(window.editor);
    console.log(document.querySelector("#eta").checked);
    console.log(document.querySelector("#no_scope").checked);
    console.log(document.querySelector("#no_infer").checked);
    console.log(document.querySelector("#no_check").checked);
}

// var checkedValue = document.querySelector('.messageCheckbox:checked').value;

//learn async js and figure out how i can fetch something at an url lazyly 
//async await 
//promises in js 
//stuff like this 
//make a url and file run that would be the goal for now 
//render the loading bar 
//make the run button work 
//

async function run() {
    const wasm = await init();
    wasm.greeting();
    run_test(window.editor.getValue(), document.querySelector("#eta").checked, document.querySelector("#no_scope").checked , document.querySelector("#no_infer").checked , document.querySelector("#no_check").checked);
    
    //why does it not work on the first run
    //matter of fact it should not even run on startup why is it running everytime i refresh that 
    //does not make any sense either ??????????????????
}
run();
var run_button = document.getElementById("run");
run_button.onclick = print_options;