let example = `%.dko:
	@echo $<

%.koo:
	$(MAKE) --silent -f deps.mk -f kontroli.mk $*.dko | xargs cat | kocheck $(KOFLAGS) -`

function split_tokens(text){
    let result = text.trim();
    result = text.split(" ");
    console.log("result");

}

split_tokens(example);