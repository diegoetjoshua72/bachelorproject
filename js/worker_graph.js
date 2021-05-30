
//i don't think any initialization will be done here we will just
//figure out how to pass the wasm module here

var g_importObject = {
    'env': {
      'memoryBase': 0,
      'tableBase': 0,
      'memory': new WebAssembly.Memory({ initial: 256 }),
      'table': new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    }
  };
  
var g_objInstance = null;

//why does it run twice 
self.onmessage = function(event) {
    console.log(event)
    const objData = event.data;
    if (objData.type == "CompiledModule") {
        console.log("we are trying to initialize the module");
        //im guessing im fucking up with this g import thing 
        WebAssembly.instantiate(objData.WasmModule,{}).then(instance => {
            console.log("wtf :_> ", instance);
            g_objInstance = instance
        });
    }
    else{
        console.log("objInstance : ", g_objInstance)
        // g_objInstance.exports.get_graph_rust(objData.value)
        console.log("we want to generate teh graph of the following url :)")
    }
  }

// function fetch_make_text_from_url() {
//     remove_all_errors_dom();
//     const url = document.getElementById("urlmake").value; //continue here
//     console.log(url);
//     if (url != "") {
//         fetch(url)
//             .then(check_fetch)
//             .then((result) => {
//                 result
//                     .text() //if the string is 404 not found
//                     .then((string) => {
//                         console.log(
//                             "THIS IS THE MAKE STRING WE GOT FROM :: ",
//                             string
//                         );
//                         postMessage(get_graph_rust(string)); //donc ici je vais utiliser un fonction rust qui permetra de get let dependences
//                     }) //here we need to call the get dep from rust then we can generate the html and the css from it and the raw urls
//                     .catch((err) => {
//                         console.log("ERROR :", err);
//                         display_error_dom(err, "errors");
//                     });
//             })
//             .catch((err) => {
//                 console.log("ERROR :", err);
//                 // display_error_dom(err, context_id);
//             });
//     } else {
//         display_error_dom("Empty url field", "errors");
//     }
// }
