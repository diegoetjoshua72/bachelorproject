import editor from './editor';
import init, { greeting, run_test } from '../pkg/koweb.js';
async function run() {
    await init();
    run_test(editor.getValue());
}

var run_button = document.getElementById("run");
run_button.onclick = run();