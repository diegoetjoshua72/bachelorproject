import init, {run_multiple} from './pkg/koweb.js';


async function run_module(program_list, module_to_run, eta, no_scope, no_infer, no_check) {
    await init();
    await run_multiple(program_list, module_to_run, eta, no_scope, no_infer, no_check, self);
}




self.onmessage = function(event) {
    console.log("run mulitple worker event : ", event)
    const {program_list, module_to_run, eta, no_scope, no_infer, no_check } = event.data;
    console.log("program_list:",program_list)
    console.log("module_to_run:",module_to_run)
    console.log("eta:",eta)
    console.log("no_scope:",no_scope)
    console.log("no_infer:",no_infer)
    console.log("no_check:",no_check)
    console.log("self:",self);

    run_module(program_list,module_to_run,eta, no_scope, no_infer, no_check)
        .then(() =>
            self.postMessage('DONE')
        );

};
