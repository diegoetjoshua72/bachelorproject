import init, {get_graph_rust} from './pkg/koweb.js';


async function run_graph(text) {
    await init();
    // console.log(get_graph_rust(text));
    return get_graph_rust(text)
}


self.onmessage = function(event) {
    console.log("event object in teh worker : ", event)

    const type = event.data.type
    const url = event.data.value
    console.log("Type",type)
    console.log("url",url)

    if (type === "args"){
      fetch_make_text_from_url(url)
    }
    else{
      console.log("unknown message passed to graph data worker");
    }
  };



let check_fetch = function check_fetch(response) {
    if (response.ok === false) {
        // display_error_dom(
        //     "ERROR IN FETCH : " + response.statusText + " - " + response.url,
        //     "errors"
        // );
        console.log("error in worker fetch")

        throw Error(response.statusText);
    }
    return response; //why do we return tho
};

function fetch_make_text_from_url(url) {
    console.log(url);
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((text) => {
                        console.log(
                            "THIS IS THE MAKE STRING WE GOT FROM :: ",
                            text
                        );

                        run_graph(text).then((slay) => self.postMessage(slay))

                        //donc ici je vais utiliser un fonction rust qui permetra de get let dependences
                    }) //here we need to call the get dep from rust then we can generate the html and the css from it and the raw urls
                    .catch((err) => {
                        console.log("ERROR :", err);
                        // display_error_dom(err, "errors");
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                // display_error_dom(err, context_id);
            });
    } else {
        console.log("empty url field")
        // TODO post messages from the worker with error type
        // display_error_dom("Empty url field", "errors");
    }
}
