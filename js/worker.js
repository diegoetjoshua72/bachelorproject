

// import init, {
//     run_test,
//     increment_test,
//     get_graph_rust,
//     run_multiple,
// } from "../pkg/koweb.js";


//i can do it with one worker and a switch statement actually i think 



// async function init_wasm_module() {
//     await init();
// }
// init_wasm_module();

// onmessage = function(msg) {
//     switch(msg.data.type) {

//         case "graph":
//         const opts = toOpts(msg.data.opts);
//         render(msg.data.id, opts);
//         break;

//         case "run":
//         renderer.set_name(msg.data.name);
//         break;
//     }

// importScripts("wasm_fractal.js");
// not ordinarily necessary, but for streaming WASM compilation to
// work it needs to be served with a content-type of application/wasm,
// which isn't always the case (eg with php -S), so we remove for now:
// delete WebAssembly.instantiateStreaming;
// wasmFractal("./wasm_fractal_bg.wasm").then((wasm) => {}



// let module_to_run = document.getElementById("file_to_run").value;
// console.log("WORKER MODULE TO RUN",module_to_run);

onmessage = function(e) {
    console.log('Message received from main script');
    console.log(e.data)
    // var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    // console.log('Posting message back to main script');
    // postMessage(workerResult);
  }

// function log() {
//     postMessage({
//         type: "call",
//         command: ["console", "log"],
//         args: Array.prototype.slice.call(arguments)
//     })
// }

//i want to console log things and post messages when things need to be written on the DOM sounds quite possible right now 
