function get_cmds(){
    var program_string = window.editor.getValue();
    console.log(program_string);
    console.log(typeof(program_string));
    return program_string;
}

rust
  .then(m => {
    document.getElementById("run").addEventListener("click", 
    ()=>{
      m.run_test(get_cmds());
    });
  })
  .catch(console.error);
