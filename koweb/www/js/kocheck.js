import init, {
    run_test,
    increment_test,
    get_graph_rust,
    run_multiple,
} from "../pkg/koweb.js";
import { Test } from "./program.js";

let program_list = [];

//TODO
//1)init was at load : DONE
//2)generate correct gitraw urls: DONE
//3)create and set up all the program objects: DONE
//prio) work on parse buffer and getting the string data to rust !
//4)based on what is available generate the options on what to run: LATER FIRST TRY TO GET DATA TO RUST
//5)Try running a .dk that requires dependencies and see what is the output:
//6)Try to load a hard .mk file like given previously

//si je passe les urls a rust ? direct peut etre c'est mieux

//7)Check if it is possible to fetch bit by bit in JS https://api.video/blog/tutorials/uploading-large-files-with-javascript file and blob api like video split things in segments
//https://nordicapis.com/everything-you-need-to-know-about-api-pagination/ interesting stuff here for this and maybe the fetch can all be done in rust that would be quite cool
//then i don't even need to pass strings from js to rust. and the problem is solved

//attends donc peut etre enfait ce que je vais faire c'est utiliser webpack enfait mais je ferais ca vers la fin

//still first the right urls have to be made and the program also
//first investigate the two way

class Program {
    constructor(name, dependency, dependency_url_list, raw_url) {
        this.name = name;
        this.dependency = dependency;
        this.dependency_url_list = dependency_url_list;
        this.raw_url = raw_url;
    }

    static get_piece_of_text(buffer_size) {
        return this.text.slice(buffer_size, this.text.length - 1);
    }
    //get bit of string function that will need to be passed to rust ?
    //
}

function remove_all_outputs_dom() {
    document.querySelectorAll(".prompt").forEach((e) => e.remove());
}

function remove_all_errors_dom() {
    document.querySelectorAll(".error").forEach((e) => e.remove());
}

let check_fetch = function check_fetch(response) {
    if (response.ok === false) {
        display_error_dom(
            "ERROR IN FETCH : " + response.statusText + " - " + response.url,
            "errors"
        );
        throw Error(response.statusText);
    }
    return response; //why do we return tho
};

function load_program_from_url(context_id) {
    remove_all_errors_dom();
    const url = document.getElementById("url").value;
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE GET FROM THE URL :: ",
                            string
                        );
                        load_text_from_url_in_editor(string);
                    })
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                // display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", context_id);
    }
}

function run_program_from_url(context_id) {
    remove_all_errors_dom();
    const url = document.getElementById("url").value;
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text()
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE RUN FROM THE URL :: ",
                        );
                        run(string);
                    })
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, context_id);
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", context_id);
    }
}

function display_error_dom(error_msg, context) {
    var error_msg_dom = document.createElement("p");
    var text = document.createTextNode(error_msg);
    error_msg_dom.classList.add("error");
    error_msg_dom.classList.add("bounce-in");
    error_msg_dom.appendChild(text);
    var element = document.getElementById(context);
    element.appendChild(error_msg_dom);
}

function print_options() {
    console.log(window.editor);
    console.log(document.querySelector("#eta").checked);
    console.log(document.querySelector("#no_scope").checked);
    console.log(document.querySelector("#no_infer").checked);
    console.log(document.querySelector("#no_check").checked);
}

function load_text_from_url_in_editor(program_text) {
    window.editor.setValue(program_text);
}

async function run(program = undefined) {
    // try {
    remove_all_outputs_dom();
    // await init();
    var testing = await window.editor.getValue();
    const prog = new Program(testing, "pipo", "toto");
    // console.log(prog);
    //si la classe casse trop les couilles je peut faire une closure mais je pense la classes c'est bien

    // prog.go_through_iterator();
    // prog.get_piece_to_koweb();

    if (program === undefined) {
        run_test(
            window.editor.getValue(),
            document.getElementById("eta").checked,
            document.getElementById("no_scope").checked,
            document.getElementById("no_infer").checked,
            document.getElementById("no_check").checked
        );
    } else {
        console.log("ran from url");
        run_test(
            program,
            document.getElementById("eta").checked,
            document.getElementById("no_scope").checked,
            document.getElementById("no_infer").checked,
            document.getElementById("no_check").checked
        );
    }
    // } catch {
    //     remove_all_errors_dom();
    //     display_error_dom("something went wrong in the kontroli run", "errors");
    // }
}

var load_url = (document.getElementById("load_url").onclick = () => {
    load_program_from_url("errors");
});

//this performs run
var run_url = (document.getElementById("run_url").onclick = () => {
    run_program_from_url("errors");
});

var run_button = document.getElementById("run");
run_button.onclick = async () => {
    await run();
};

var run_multiple_button = document.getElementById("run_multiple");
run_multiple_button.onclick = async () => {


    if (typeof(worker) == "undefined"){
        let worker = new Worker("worker.js");
    }

    worker.postMessage({
        program_list: program_list,
        module_to_run: module_to_run,
        eta: document.getElementById("eta").checked,
        no_scope: document.getElementById("no_scope").checked,
        no_infer: document.getElementById("no_infer").checked,
        no_check: document.getElementById("no_check").checked

    });
    //workers run in another GLOBAL context damn interesting
    //finish reading the workers article after eating
    //hmm i can't manipulate the dom in worker so the writing to webpage in rust might not work 
    //data is sent between the worker and the main thread via a system of messages

    //so i need to update the dom with the result of this webworker
    //but that is quite annoying i think 

    //i could add an onmessage listener that first lets pass data to the worker and do the run multiple there 
    

    // let module_to_run = document.getElementById("file_to_run").value;

    // await run_multiple(
    //     program_list,
    //     module_to_run,
    //     document.getElementById("eta").checked,
    //     document.getElementById("no_scope").checked,
    //     document.getElementById("no_infer").checked,
    //     document.getElementById("no_check").checked
    // );
};

var test_click = document.getElementById("increment");
test_click.onclick = () => {
    console.log(window.editor);
    console.log(window.editor.getModel().getValueInRange());
    // increment_test();
};


var load_make = document.getElementById("load_make");
load_make.onclick = () => {
    fetch_make_text_from_url();
};


// const url = "https://raw.githubusercontent.com//bachelorproject/master/examples/kontroli.mk";
// https://github.com/01mf02/kontroli-rs/blob/master/examples/sudoku/deps.mk
function fetch_make_text_from_url() {
    remove_all_errors_dom();
    const url = document.getElementById("urlmake").value; //continue here
    console.log(url);
    if (url != "") {
        fetch(url)
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => {
                        console.log(
                            "THIS IS THE MAKE STRING WE GOT FROM :: ",
                            string
                        );
                        use_graph_data(get_graph_rust(string)); //donc ici je vais utiliser un fonction rust qui permetra de get let dependences
                    }) //here we need to call the get dep from rust then we can generate the html and the css from it and the raw urls
                    .catch((err) => {
                        console.log("ERROR :", err);
                        display_error_dom(err, "errors");
                    });
            })
            .catch((err) => {
                console.log("ERROR :", err);
                // display_error_dom(err, context_id);
            });
    } else {
        display_error_dom("Empty url field", "errors");
    }
}

function use_graph_data(graph_data) {
    const dependency_list = graph_data;
    console.log("GRAPH DATA : ", graph_data);

    let list_of_files = [];

    for (let i = 0; i < dependency_list.length; i++) {
        list_of_files.push(dependency_list[i][0]);
    }
    console.log("LIST OF FILES : ", list_of_files);

    generate_html(graph_data);
    generate_run_options_html(graph_data);
    const urls = generate_gitraw_urls(list_of_files);
    const dependency_url_list = dependencies_as_urls(graph_data, urls);
    save_to_program_list(graph_data, urls, dependency_url_list);
}

function remove_all_select_options() {
    document.querySelectorAll(".select").forEach((e) => e.remove());
}

function generate_run_options_html(graph_data) {
    remove_all_select_options();
    let parent_select = document.getElementById("file_to_run");
    for (const node of graph_data) {
        let option = document.createElement("option");
        let test = document.createTextNode(node[0]);
        option.appendChild(test);
        option.classList.add("select");
        option.value = node[0];
        parent_select.appendChild(option);
    }
}

function remove_all_files_dom() {
    document.querySelectorAll(".fs").forEach((e) => e.remove());
}

function generate_html(graph_data) {
    // console.log("GENERATE_HTML : ", graph_data);
    remove_all_files_dom();

    let details_outer = document.createElement("DETAILS");
    details_outer.classList.add("fs");

    let summary_outer = document.createElement("SUMMARY");
    let summary_outer_text = document.createTextNode("Kontroli module");
    summary_outer.appendChild(summary_outer_text);

    details_outer.appendChild(summary_outer);

    let ul = document.createElement("ul");

    for (const node of graph_data) {
        let li_top = document.createElement("li");
        let ul_inner = document.createElement("ul");

        let details_inner = document.createElement("DETAILS");
        let summary_inner = document.createElement("SUMMARY");

        let summary_inner_text = document.createTextNode(node[0]);
        summary_inner.appendChild(summary_inner_text);
        details_inner.appendChild(summary_inner);

        let li_button = document.createElement("li");
        let li_span = document.createElement("li");

        let button = document.createElement("button");
        let text_top_level = document.createTextNode(node[0]);
        let text_list_dependencies = node[1];

        let span = document.createElement("span");

        for (const dep of text_list_dependencies) {
            if (
                text_list_dependencies.length - 1 !==
                text_list_dependencies.indexOf(dep)
            ) {
                span.appendChild(document.createTextNode(dep + " -> "));
            } else {
                span.appendChild(document.createTextNode(dep));
            }
        }
        span.classList.add("deps_path");

        button.appendChild(text_top_level);
        li_button.appendChild(button);
        li_span.appendChild(span);
        ul_inner.appendChild(li_button);
        ul_inner.appendChild(li_span);
        details_inner.appendChild(ul_inner);
        li_top.appendChild(details_inner);
        ul.appendChild(li_top);
    }
    details_outer.appendChild(ul);
    document.getElementById("file_sys").appendChild(details_outer);
}

function generate_gitraw_urls(list_of_files) {
    const top_url = document.getElementById("urlmake").value;

    let result_list = [];

    for (let file of list_of_files) {
        // console.log("FILE : ", file);
        if (file.startsWith("../")) {
            let sub_dir_counter = 0;
            while (file.startsWith("../")) {
                sub_dir_counter += 1;
                console.log("file before remove ../", file);
                file = file.slice(3, file.length);
                console.log("file after remove ../", file);
            }

            let result_relative_url = top_url.substring(
                0,
                top_url.lastIndexOf("/")
            );
            while (sub_dir_counter != 0) {
                result_relative_url = result_relative_url.slice(0, -1);
                result_relative_url = result_relative_url.substring(
                    0,
                    result_relative_url.lastIndexOf("/")
                );
                sub_dir_counter -= 1;
            }
            result_list.push(result_relative_url + "/" + file);
        } else {
            //so i need to get the url till the last /
            var firstpart = top_url.substring(0, top_url.lastIndexOf("/"));
            let dkurl = firstpart + "/" + file; //this is not correct i need to remove the n.mk then add file
            // console.log("NEW GITRAW URL : ", dkurl);
            result_list.push(dkurl);
        }
    }
    // console.log("GENERATE URL FINAL :", result_list);
    return result_list;
}

// TODO fix this i think
// TODO i should only display run selected module when tehre is something loaded or display a message like nothing was loaded
function dependencies_as_urls(graph_data, urls) {
    // console.log("DEBUG DEPENDENCY AS URL");
    // let counter = 0;
    let dep_url_list_list = [];
    for (let node of graph_data) {
        let dep_url_list = generate_gitraw_urls(node[1]);
        // console.log("DEBUG LIST PUSHED IN LIST LIST", dep_url_list);
        dep_url_list_list.push(dep_url_list);
    }
    return dep_url_list_list;
}

function save_to_program_list(graph_data, urls, dependency_url_list) {
    for (let i = 0; i < graph_data.length; i++) {
        program_list.push(
            new Program(
                graph_data[i][0],
                graph_data[i][1],
                dependency_url_list[i],
                urls[i]
            )
        );
    }
    console.log("PROGRAM LIST : ", program_list);
}
