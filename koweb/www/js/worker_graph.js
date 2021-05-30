
//i don't think any initialization will be done here we will just
//figure out how to pass the wasm module here
onmessage = function(e) {
    console.log('Message received from main script');
    console.log(e.data)
    console.log('Posting message back to main script');
    postMessage("hello from woker");
    const {type, value} = e.data;
    if (type == "MODUlE") {
        console.log("we are trying to initialize the module");
    }
    else{
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
