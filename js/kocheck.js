
import init, { greeting, run_test } from '../pkg/koweb.js';
async function run() {
    await init();
    run_test(editor.getValue());
}

var run_button = document.getElementById("run");
run_button.onclick = run();


//i want to get the cmds from the editor and turn that into an cmd iterator
//in rust
//see how i can access wasm stuff n