

let module_to_run = document.getElementById("file_to_run").value;
console.log("WORKER MODULE TO RUN",module_to_run);

self.addEventListener("message", function(e){
    console.log("this is what we got int the worker !!!", e.data)
})