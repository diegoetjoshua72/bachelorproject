
// import {init_editor} from './editor.js';
import init, {run_test } from '../pkg/koweb.js';
// import * as wasm from '../pkg/koweb.js';

console.log(window.editor);

var eta = document.querySelector("eta:checked").value;
var no_scope = document.querySelector("no_scope:checked").value;
var no_infer = document.querySelector("no_infer:checked").value;
var no_check = document.querySelector("no_check:checked").value;
//no_scope no_infer no_check

console.log(eta);
console.log(no_scope);
console.log(no_infer);
console.log(no_check);
// var checkedValue = document.querySelector('.messageCheckbox:checked').value;

async function run() {
    await init();
    run_test(window.editor.getValue());
    //why does it not work on the first run
    //matter of fact it should not even run on startup why is it running everytime i refresh that 
    //does not make any sense either ??????????????????
}


var run_button = document.getElementById("run");
run_button.addEventListener('click', run());