let example = `%.dko:
	@echo $<

%.koo:
	$(MAKE) --silent -f deps.mk -f kontroli.mk $*.dko | xargs cat | kocheck $(KOFLAGS) -`

 
//duplicate
function display_error_dom(error_msg, context) {
    var error_msg_dom = document.createElement("p");
    var text = document.createTextNode(error_msg);
    error_msg_dom.classList.add("error");
    error_msg_dom.classList.add("bounce-in");
    error_msg_dom.appendChild(text);
    var element = document.getElementById(context);
    element.appendChild(error_msg_dom);
}    

//duplicate
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



//i call this with button 
function fetch_make_text_from_url(){
    // const url = "https://raw.githubusercontent.com//bachelorproject/master/examples/kontroli.mk";
    const url = document.getElementById("urlmake").value; //continue here
    if (url != "") {
        fetch(url,{mode: 'no-cors'})
            .then(check_fetch)
            .then((result) => {
                result
                    .text() //if the string is 404 not found
                    .then((string) => {
                        console.log(
                            "THIS IS THE STRING WE GET FROM THE URL :: ",
                            string
                        );
                        generate_gitraw_urls(get_graph_rust(string)); //donc ici je vais utiliser un fonction rust qui permetra de get let dependences 
                    })  //here we need to call the get dep from rust then we can generate the html and the css from it and the raw urls
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

// function split_tokens(text){
//     let result = text.trim();
//     result = text.split(" ");
//     // console.log("FILES: ",text.match(/\w+.mk/g));
//     // console.log("NAMES: ", text.match(/\w+:/g));
//     files = text.match(/\w+:/g);
//     console.log(result);
//     return files;
// }


function generate_gitraw_urls(make_text){

    console.log("gitraw urls: make_text: ", make_text);

    // filenames = split_tokens(make_text);
    // console.log("FILENAMES : ", filenames);
    // let url = "https://raw.githubusercontent.com/diegoetjoshua72/bachelorproject/master/examples/kontroli.mk";
    // let mkfile = url.match(/[^\/]+(?=\/$|$)/);
    // console.log("MAKEFILE : ", mkfile);
    // let dkfile_context = url.slice(0,(url.length - mkfile.length));
    // console.log("DK FILE CONTEXT : ", dkfile_context);

    // let result_list = [];

    // for (const file of filenames) {
    //     console.log("FILE : ", file);
    //     if(file.includes("../")){

    //         //1) count the number of ../ in the file
    //         //2) use that count for the regex to create the context
    //         //3) 
    //         let count_sub_dir = file.match(/..\//).length();
    //         console.log(count_sub_dir);
            
    //         var index = url.lastIndexOf("/");
    //         var fileName = url.substr(index)
            
    //         console.log("index returned from lastIndexOf : ", index);
    //         console.log("alternative fileName : ", fileName);
            
    //         let relative_context = 0;
            
    //         continue;
    //         //i would have to strip a ../ for every level
    //         //right now 1 level sub dir will work but i want to make ../../../ and so on work as well
    //     }
    //     else{
    //         let dkurl = dkfile_context + file;
    //         console.log("NEW GITRAW URL : ", dkurl);
    //         result_list.push(dkurl);
    //     }
    // }
    console.log(result_list);
    //then here i fetch the data for each of the links in the result_list I THINK I NEED TO STORE LIKE TUPLES WITH NAME/LINKVALUE IN RESULT LIST() AND THEN FETCH FILE DATA THE RESULT LIST IS A LIST OF FILENAME / PROGRAM
    //then i create the html details here ()
    return 0;
}



function fetch_files_data(urls){
    return 0;
}

function generate_html_fs(){
    return 0;
}


fetch_make_text_from_url();

//TODO
//will do that after this example works tho
//but i also need to be able to handle relative paths so ../ should make it go one folder down when making the github urls 

//TODO when i do run and i have multiple files they should also be passed in the order they appear in the dk file 


// # solve_easy.dko: solve_easy.dk sudoku.dko

// # in this case the solve_easy.dk depends on everything that comes afterwards

//dko c'est un peu le object file name 
//make a tree for dependencies solve_easy.dk depends on sudoku.dko
//sudoku.dk depends on bool.dko
//USER GIVES ENTRY FILE
//IF THE USER CHOSES TO LOAD SOLVE EASY THEN WE DETERMINE THE DEPENDENCIES AND THE ORDER THINGS NEEDS TO BE PASSED IN 
//PAS PASSER LA CONCATENATION DE TOUT EN ENTIER 
//LOOK FOR A CRATE THAT READS MAKEFILES AND DEPENDENCY GRAPHS 



// https://crates.io/crates/depgraph
// fetch dans js le .mk parse dans rust le .mk 
// les fichier et leur dependence : list of tuples (ficher, vec[dependence])
// return ca 


// # ../bool.dko: ../bool.dk
// # sudoku.dko: sudoku.dk ../bool.dko