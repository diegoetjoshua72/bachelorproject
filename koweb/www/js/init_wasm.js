import init,{get_string_js} from "../pkg/koweb.js";
async function init_wasm_module(){
    await init();
}
init_wasm_module();
//something like this sounds promissing
export function call_exported_rust_func () {
    get_string_js("test pass");
}