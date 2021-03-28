
import {init_editor} from './editor.js';
import init, { greeting, run_test } from '../pkg/koweb.js';
// import * as wasm from '../pkg/koweb.js';

console.log(init_editor());

async function run() {
    await init();
    run_test(editor.getValue());
}


var run_button = document.getElementById("run");
run_button.addEventListener('click', run());