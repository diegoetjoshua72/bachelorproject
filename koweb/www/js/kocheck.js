

//require is in nodejs
//import is also in webpack
//native js modules 

import {editor,init_editor,hello} from './editor';
import init, { greeting, run_test } from '../pkg/koweb.js';
// import * as wasm from '../pkg/koweb.js';

init_editor();

async function run() {
    await init();
    run_test(window.editor.getValue());
}


hello();
var run_button = document.getElementById("run");
run_button.onclick = run();