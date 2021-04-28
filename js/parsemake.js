let example = `%.dko:
	@echo $<

%.koo:
	$(MAKE) --silent -f deps.mk -f kontroli.mk $*.dko | xargs cat | kocheck $(KOFLAGS) -`

 

function fetch_make_text_from_url(){
    const url = document.getElementById("urlmake").value;
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
                        return string;
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

function split_tokens(text){
    let result = text.trim();
    result = text.split(" ");
    console.log("FILES: ",text.match(/\w+.mk/g));
    console.log("NAMES: ", text.match(/\w+:/g));
    files = text.match(/\w+:/g);
    console.log(result);
    return files;
}


//i need to have the link to the initial .mk file 
//\w+.mk
// two regular expressions one for the names that end in .ml
console.log(fetch_make_text_from_url());
console.log(split_token(fetch_make_text_from_url()));

//anytime there is a \n\t or a space its a new word 
//would be nice to match words with any number of spaces in between
// text.match(/[a-z'\-]+/gi);

function generate_gitraw_urls(filenames){

    return 0;
}

function fetch_files_data(urls){
    return 0;
}

function generate_html_fs(){
    return 0;
}



//TODO
//will do that after this example works tho
//but i also need to be able to handle relative paths so ../ should make it go one folder down when making the github urls 

//TODO when i do run and i have multiple files they should also be passed in some order 