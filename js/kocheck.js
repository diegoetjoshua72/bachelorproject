
// import {init_editor} from './editor.js';
import init, {run_test } from '../pkg/koweb.js';
// import * as wasm from '../pkg/koweb.js';

console.log(window.editor);

// var eta = document.querySelector("#eta").checked;
// var no_scope = document.querySelector("#no_scope").checked;
// var no_infer = document.querySelector("#no_infer").checked;
// var no_check = document.querySelector("#no_check").checked;
//no_scope no_infer no_check

function print_options(){
    console.log(window.editor);
    console.log(document.querySelector("#eta").checked);
    console.log(document.querySelector("#no_scope").checked);
    console.log(document.querySelector("#no_infer").checked);
    console.log(document.querySelector("#no_check").checked);
}

// var checkedValue = document.querySelector('.messageCheckbox:checked').value;

async function run() {
    await init();
    run_test(window.editor.getValue(), document.querySelector("#eta").checked, document.querySelector("#no_scope").checked , document.querySelector("#no_infer").checked , document.querySelector("#no_check").checked);
    
    //why does it not work on the first run
    //matter of fact it should not even run on startup why is it running everytime i refresh that 
    //does not make any sense either ??????????????????
}


var run_button = document.getElementById("run");
run_button.onclick = print_options;