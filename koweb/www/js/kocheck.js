

import init, { greeting } from './pkg/koweb.js';
async function run() {
    await init();
    greeting();
    run_test();
}
run();

//i want to get the cmds from the editor and turn that into an cmd iterator
//in rust
//see how i can access wasm stuff now
