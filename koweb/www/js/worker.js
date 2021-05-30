






// importScripts("wasm_fractal.js");
// not ordinarily necessary, but for streaming WASM compilation to
// work it needs to be served with a content-type of application/wasm,
// which isn't always the case (eg with php -S), so we remove for now:
// delete WebAssembly.instantiateStreaming;
// wasmFractal("./wasm_fractal_bg.wasm").then((wasm) => {}


let module_to_run = document.getElementById("file_to_run").value;
console.log("WORKER MODULE TO RUN",module_to_run);

self.addEventListener("message", function(e){
    console.log("this is what we got int the worker !!!", e.data)
})

function log() {
    postMessage({
        type: "call",
        command: ["console", "log"],
        args: Array.prototype.slice.call(arguments)
    })
}

//i want to console log things and post messages when things need to be written on the DOM sounds quite possible right now 
