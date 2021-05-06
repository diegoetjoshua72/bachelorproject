/* tslint:disable */
/* eslint-disable */
/**
* @param {string} make_text_js
* @returns {any}
*/
export function get_graph_rust(make_text_js: string): any;
/**
*/
export function increment_test(): void;
/**
* @param {string} cmds_from_js
* @param {boolean} eta
* @param {boolean} no_scope
* @param {boolean} no_infer
* @param {boolean} no_check
*/
export function run_test(cmds_from_js: string, eta: boolean, no_scope: boolean, no_infer: boolean, no_check: boolean): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly get_graph_rust: (a: number, b: number) => number;
  readonly increment_test: () => void;
  readonly run_test: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
