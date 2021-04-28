let example = `%.dko:
	@echo $<

%.koo:
	$(MAKE) --silent -f deps.mk -f kontroli.mk $*.dko | xargs cat | kocheck $(KOFLAGS) -`

function split_tokens(text){
    let result = text.trim();
    result = text.split(" ");
    console.log("FILES: ",text.match(/\w+.mk/g));
    console.log("NAMES: ", text.match(/\w+:/g));
    console.log(result);
}

//\w+.mk
// two regular expressions one for the names that end in .ml
split_tokens(example);

//anytime there is a \n\t or a space its a new word 
//would be nice to match words with any number of spaces in between
// text.match(/[a-z'\-]+/gi);

function generate_gitraw_urls(filenames){
    return 0;
}

function fetch_files_data(urls){

}