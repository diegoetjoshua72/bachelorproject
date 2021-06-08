
let program_list = [];

class Program {
    constructor(name, dependency, dependency_url_list, raw_url) {
        this.name = name;
        this.dependency = dependency;
        this.dependency_url_list = dependency_url_list;
        this.raw_url = raw_url;
    }
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
}


//i have to use the functions that i will define in index.html
//here
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

    const module_to_run = document.getElementById("file_to_run").value;
    const worker_run_multiple = new Worker('/js/worker_run_multiple.js', {type: 'module'});

    worker_run_multiple.postMessage({
        program_list: program_list,
        module_to_run: module_to_run,
        eta: document.getElementById("eta").checked,
        no_scope: document.getElementById("no_scope").checked,
        no_infer: document.getElementById("no_infer").checked,
        no_check: document.getElementById("no_check").checked
    });

    worker_run_multiple.onmessage = function(event) {
        const message_type = event.data.message_type;
        const value = event.data.value;

        console.log("Message type: ", message_type)
        console.log("Message type: ", value)

        if(message_type === "output"){
            write_output_html(value);
        }
        else if (message_type === "header"){
            write_header_html(value);
        }
        else if (message_type === "done"){
            write_done_html();
            worker_run_multiple.terminate();
        }
        else {
            console.log("unknown message from worker in run_multiple()")
        }
    }

    worker_run_multiple.onerror = function(event){
        throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
    };

};


var load_make = document.getElementById("load_make");
load_make.onclick = () => {
    const url = document.getElementById("urlmake").value;
    // const text = fetch_make_text_from_url(url);
    console.log("url in main ", url)
    const worker_graph = new Worker('/js/worker_graph.js', {type: 'module'});
    worker_graph.postMessage({type: "args", value: url})

    worker_graph.onmessage = function(event) {
        console.log("final result from the worker : ", event.data);
        worker_graph.terminate();
        use_graph_data(event.data)
    }

    worker_graph.onerror = function(event){
        throw new Error(event.message + " (" + event.filename + ":" + event.lineno + ")");
    };

};


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


function dependencies_as_urls(graph_data, urls) {

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



function write_header_html(module_name){
    let div = document.createElement("div");
    let text = document.createElement("p");
    let header_span = document.createElement("span");
    header_span.className = "header_output";
    header_span.textContent = "#> ";
    text.className = "line";
    text.textContent = module_name;
    div.className = "prompt";
    div.appendChild(header_span);
    div.appendChild(text);
    let output = document.getElementById("output");
    output.className = "display_output";
    output.appendChild(div);
}


function write_output_html(kontroli_event_text){
    let div = document.createElement("div");
    let text = document.createElement("p");
    let lambda_span = document.createElement("span");
    lambda_span.className = "lambda";
    lambda_span.textContent = "λ> ";
    text.className = "line";
    text.textContent = kontroli_event_text;
    div.setClassName = "prompt";
    div.appendChild(lambda_span);
    div.appendChild(text);
    let output = document.getElementById("output");
    output.className = "display_output";
    output.appendChild(div);

}


function write_done_html(){
    let div = document.createElement("div");
    let lambda_span = document.createElement("span");
    lambda_span.className = "lambda";
    lambda_span.textContent = "v/DONE";
    div.setClassName = "prompt";
    div.appendChild(lambda_span);
    let output = document.getElementById("output");
    output.className = "display_output";
    output.appendChild(div);
}
