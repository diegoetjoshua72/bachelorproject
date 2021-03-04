const rust = import('./pkg/koweb.js');

function get_cmds(){
    var program_string = window.editor.getValue();
    console.log(program_string);
    console.log(typeof(program_string));
    return program_string;
}

rust
  .then(m => {

    m.greet();

    document.getElementById("run").addEventListener("click", 
    ()=>{
      m.run_test(get_cmds());
    });
  })
  .catch(console.error);

  //i want to get the cmds from the editor and turn that into an cmd iterator
  //in rust
  //see how i can access wasm stuff now 