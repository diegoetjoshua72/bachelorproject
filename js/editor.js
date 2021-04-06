

// import * as loader from '../monaco/min/vs/loader.js'


// export function init_editor(){

//   var test;
//   define('main', ["./monaco/min/vs/editor/editor.main"], function () {
//     console.log("inside");
//     window.test = "hello from inside"
    
//     return {someValue: 2};
  
//     });

//   console.log(window.test);


{/* <script>
var require = { paths: { vs: '../node_modules/monaco-editor/min/vs' } };
</script>
<script src="../node_modules/monaco-editor/min/vs/loader.js"></script>
<script src="../node_modules/monaco-editor/min/vs/editor/editor.main.nls.js"></script>
<script src="../node_modules/monaco-editor/min/vs/editor/editor.main.js"></script>

<script>
var editor = monaco.editor.create(document.getElementById('container'), {
    value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
    language: 'javascript'
});
</script> */}


  require.config({ paths: { vs: "./monaco/min/vs" } });
  require(["vs/editor/editor.main"], function () {
  
    monaco.languages.register({
      id: "lambdapi",
    });

    monaco.languages.setMonarchTokensProvider("lambdapi", {
      tokenizer: {
        root: [
          [/\b(as|begin|builtin|constant|debug|end|flag|in|infix|injective|left|off|notation|on|opaque|prover|prover_timeout|prefix|private|protected|quantifier|right|sequential|TYPE|unif_rule)\b/,"keyword"],
        ],
      },
    });

    //   // Define a new theme that constains only rules that match this language
    monaco.editor.defineTheme("vs-gruv", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          foreground: "908476",
          token: "comment",
        },
        {
          foreground: "aab11e",
          token: "string",
        },
        {
          foreground: "cf8498",
          token: "punctuation.separator.key-value",
        },
        {
          foreground: "cc869b",
          token: "constant",
        },
        {
          foreground: "ead4af",
          token: "variable",
        },
        {
          foreground: "cab990",
          token: "variable.other.object",
        },
        {
          foreground: "f1c050",
          token: "variable.other.class",
        },
        {
          foreground: "f1c050",
          token: "variable.other.constant",
        },
        {
          foreground: "ead4af",
          token: "meta.property.object",
        },
        {
          foreground: "ead4af",
          token: "entity.name.tag",
        },
        {
          foreground: "ead4af",
          token: "meta.function",
        },
        {
          foreground: "ead4af",
          token: "meta.function.static.arrow",
        },
        {
          foreground: "ead4af",
          token: "meta.function.arrow",
        },
        {
          foreground: "fb4938",
          token: "keyword",
        },
        {
          foreground: "fb4938",
          token: "string.regexp punctuation.definition",
        },
        {
          foreground: "fb4938",
          token: "storage",
        },
        {
          foreground: "fb4938",
          token: "storage.type",
        },
        {
          foreground: "fb4938",
          token: "markup.underline.link",
        },
        {
          foreground: "babc52",
          token: "entity.name.class",
        },
        {
          foreground: "babc52",
          token: "entity.name.type.class",
        },
        {
          foreground: "7ba093",
          token: "entity.other.inherited-class",
        },
        {
          foreground: "7ba093",
          token: "tag.decorator",
        },
        {
          foreground: "7ba093",
          token: "tag.decorator entity.name.tag",
        },
        {
          foreground: "8ab572",
          token: "entity.name.function",
        },
        {
          foreground: "8ab572",
          token: "meta.function entity.name.function",
        },
        {
          foreground: "fd971f",
          token: "variable.parameter",
        },
        {
          foreground: "fd971f",
          token: "meta.function storage.type",
        },
        {
          foreground: "fb4938",
          fontStyle: " italic  ",
          token: "entity.name.tag",
        },
        {
          foreground: "8ab572",
          fontStyle: " italic",
          token: "entity.other.attribute-name",
        },
        {
          foreground: "f1c050",
          token: "support.type",
        },
        {
          foreground: "f1c050",
          token: "support.class",
        },
        {
          foreground: "f1c050",
          token: "support.function",
        },
        {
          foreground: "f1c050",
          token: "variable.language",
        },
        {
          foreground: "f1c050",
          token: "support.constant",
        },
        {
          foreground: "f1c050",
          token: "string.regexp keyword.control",
        },
        {
          foreground: "8ab572",
          token: "punctuation.template-string.element",
        },
        {
          foreground: "8ab572",
          token: "string.regexp punctuation.definition.group",
        },
        {
          foreground: "8ab572",
          token: "constant.character.escape",
        },
        {
          foreground: "f8f8f0",
          background: "fb4938",
          token: "invalid",
        },
        {
          foreground: "f8f8f0",
          background: "fd971f",
          token: "invalid.deprecated",
        },
        {
          foreground: "cab990",
          token: "keyword.operator",
        },
        {
          foreground: "cab990",
          token: "keyword.operator.logical",
        },
        {
          foreground: "cab990",
          token: "meta.property-name",
        },
        {
          foreground: "cab990",
          token: "meta.brace",
        },
        {
          foreground: "cab990",
          token: "punctuation.definition.parameters.begin",
        },
        {
          foreground: "cab990",
          token: "punctuation.definition.parameters.end",
        },
        {
          foreground: "cab990",
          token: "keyword.other.parenthesis",
        },
        {
          foreground: "7ba093",
          token: "keyword.operator.ternary",
        },
        {
          foreground: "ead4af",
          token: "punctuation.separator.parameter",
        },
        {
          foreground: "fb4938",
          token: "keyword.operator.module",
        },
        {
          foreground: "d02000",
          token: "sublimelinter.mark.error",
        },
        {
          foreground: "ddb700",
          token: "sublimelinter.mark.warning",
        },
        {
          foreground: "ffffff",
          token: "sublimelinter.gutter-mark",
        },
        {
          foreground: "70c060",
          token: "markup.inserted",
        },
        {
          foreground: "ddb700",
          token: "markup.changed",
        },
        {
          foreground: "fb4938",
          token: "markup.deleted",
        },
      ],
      colors: {
        "editor.foreground": "#EAD4AF",
        "editor.background": "#282828",
        "editor.selectionBackground": "#3B3836",
        "editor.lineHighlightBackground": "#3B3836",
        "editorCursor.foreground": "#908476",
        "editorWhitespace.foreground": "#3B3836",
      },
    });

    var editor = monaco.editor.create(document.getElementById("container"), {
      theme: "vs-gruv",
      value: getCode(),
      language: "lambdapi",
    });
  });


function getCode () {
  return [
    "(; Adding additional arguments via rewriting, by Gaspard Ferey. ;)",
    "N : Type.",
    "0 : N.",
    "S : N -> N.",
    "A : Type.",
    "List : N -> Type.",
    "def magic : N -> N -> Type.",
    "[n  ] magic n 0      -->  List n",
    "[n,i] magic n (S i)  -->  A -> magic n i.",
    "cons : n : N -> magic n n.",
    "def checks",
    "  : A -> A -> A -> List (S (S (S 0)))",
    "  := cons (S (S (S 0))).",
    "(;",
    "def fails",
    "  : A -> A -> A -> List (S (S (S 0)))",
    "  := cons (S (S (0))).",
    ";)",
  ].join("\n")
}


// function getCode() {
//   return [
//     "Typ : Type.",
//     "def eta : _ : Typ -> Type.",
//     "(; theory Pure ;)",
//     "{|fun|type|} : _ : Typ -> _ : Typ -> Typ.",
//     "[a, b] eta ({|fun|type|} a b) --> _ : eta a -> eta b.",
//     "{|prop|type|} : Typ.",
//     "def eps : _ : eta {|prop|type|} -> Type.",
//     "{|itself|type|} : _ : Typ -> Typ.",
//     "{|dummy|type|} : Typ.",
//     "{|Pure.proof|type|} : Typ.",
//     "{|Pure.eq|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|'a|} ({|fun|type|} {|'a|} {|prop|type|})).",
//     "{|Pure.imp|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} {|prop|type|} {|prop|type|})).",
//     "[a, b] eps ({|Pure.imp|const|} a b) --> _ : eps a -> eps b.",
//     "{|Pure.all|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} {|'a|} {|prop|type|}) {|prop|type|}).",
//     "[a, b] eps ({|Pure.all|const|} a b) --> x : eta a -> eps (b x).",
//     "{|Pure.prop|const|} : eta ({|fun|type|} {|prop|type|} {|prop|type|}).",
//     "{|Pure.type|const|} : {|'a|} : Typ -> eta ({|itself|type|} {|'a|}).",
//     "{|Pure.dummy_pattern|const|} : {|'a|} : Typ -> eta {|'a|}.",
//     "{|Pure.Appt|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|Pure.proof|type|} ({|fun|type|} {|'a|} {|Pure.proof|type|})).'",
//     "{|Pure.AppP|const|} : eta ({|fun|type|} {|Pure.proof|type|} ({|fun|type|} {|Pure.proof|type|} {|Pure.proof|type|})).",
//     "{|Pure.Abst|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} {|'a|} {|Pure.proof|type|}) {|Pure.proof|type|}).",
//     "{|Pure.AbsP|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} ({|fun|type|} {|Pure.proof|type|} {|Pure.proof|type|}) {|Pure.proof|type|})).'",
//     "{|Pure.Hyp|const|} : eta ({|fun|type|} {|prop|type|} {|Pure.proof|type|}).",
//     "{|Pure.Oracle|const|} : eta ({|fun|type|} {|prop|type|} {|Pure.proof|type|}).",
//     "{|Pure.OfClass|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} ({|itself|type|} {|'a|}) {|prop|type|}) {|Pure.proof|type|}).",
//     "{|Pure.MinProof|const|} : eta {|Pure.proof|type|}.",
//     "{|Pure.term|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|'a|} {|prop|type|}).",
//     "{|Pure.sort_constraint|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|itself|type|} {|'a|}) {|prop|type|}).",
//     "{|Pure.conjunction|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} {|prop|type|} {|prop|type|})).",
//     "{|Pure.prop_def|axiom|} : A : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.prop|const|} A) A).",
//     "{|Pure.term_def|axiom|} : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.term|const|} {|'a|} x) ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A))).",
//     "{|Pure.sort_constraint_def|axiom|} : {|'a|} : Typ -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|}))).",
//     "{|Pure.conjunction_def|axiom|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C))).",
//     "{|Pure.reflexive|axiom|} : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.eq|const|} {|'a|} x x).",
//     "{|Pure.symmetric|axiom|} : {|'a|} : Typ -> x : eta {|'a|} -> y : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.eq|const|} {|'a|} x y) ({|Pure.eq|const|} {|'a|} y x)).",
//     "{|Pure.transitive|axiom|} : {|'a|} : Typ -> x : eta {|'a|} -> y : eta {|'a|} -> z : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.eq|const|} {|'a|} x y) ({|Pure.imp|const|} ({|Pure.eq|const|} {|'a|} y z) ({|Pure.eq|const|} {|'a|} x z))).",
//     "{|Pure.equal_intr|axiom|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} ({|Pure.imp|const|} B A) ({|Pure.eq|const|} {|prop|type|} A B))).",
//     "{|Pure.equal_elim|axiom|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.eq|const|} {|prop|type|} A B) ({|Pure.imp|const|} A B)).",
//     "{|Pure.abstract_rule|axiom|} : {|'a|} : Typ -> {|'b|} : Typ -> f : eta ({|fun|type|} {|'a|} {|'b|}) -> g : eta ({|fun|type|} {|'a|} {|'b|}) -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.eq|const|} {|'b|} (f x) (g x))) ({|Pure.eq|const|} ({|fun|type|} {|'a|} {|'b|}) (x : eta {|'a|} => f x) (x : eta {|'a|} => g x))).",
//     "{|Pure.combination|axiom|} : {|'a|} : Typ -> {|'b|} : Typ -> f : eta ({|fun|type|} {|'a|} {|'b|}) -> g : eta ({|fun|type|} {|'a|} {|'b|}) -> x : eta {|'a|} -> y : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.eq|const|} ({|fun|type|} {|'a|} {|'b|}) f g) ({|Pure.imp|const|} ({|Pure.eq|const|} {|'a|} x y) ({|Pure.eq|const|} {|'b|} (f x) (g y)))).",
//     "thm {|Pure.prop_def|thm|} : A : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.prop|const|} A) A) := A : eta {|prop|type|} => {|Pure.prop_def|axiom|} A.",
//     "thm {|Pure.term_def|thm|} : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.term|const|} {|'a|} x) ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A))) := {|'a|} : Typ => x : eta {|'a|} => {|Pure.term_def|axiom|} {|'a|} x.",
//     "thm {|Pure.sort_constraint_def|thm|} : {|'a|} : Typ -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|}))) := {|'a|} : Typ => {|Pure.sort_constraint_def|axiom|} {|'a|}.",
//     "thm {|Pure.conjunction_def|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C))) := A : eta {|prop|type|} => B : eta {|prop|type|} => {|Pure.conjunction_def|axiom|} A B.",
//     "thm {|Pure.protectI|thm|} : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.prop|const|} A)) := A : eta {|prop|type|} => {|Pure.equal_elim|axiom|} A ({|Pure.prop|const|} A) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.prop|const|} A) A ({|Pure.prop_def|axiom|} A)).",
//     "thm {|Pure.protectD|thm|} : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.prop|const|} A) A) := A : eta {|prop|type|} => {|Pure.equal_elim|axiom|} ({|Pure.prop|const|} A) A ({|Pure.prop_def|axiom|} A).",
//     "thm {|Pure.termI|thm|} : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.term|const|} {|'a|} x) := {|'a|} : Typ => x : eta {|'a|} => {|Pure.equal_elim|axiom|} ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A)) ({|Pure.term|const|} {|'a|} x) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.term|const|} {|'a|} x) ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A)) ({|Pure.term_def|axiom|} {|'a|} x)) (A : eta {|prop|type|} => H : eps A => H).",
//     "thm proof628 : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.term|const|} {|'a|} x) := {|'a|} : Typ => x : eta {|'a|} => {|Pure.equal_elim|axiom|} ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A)) ({|Pure.term|const|} {|'a|} x) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.term|const|} {|'a|} x) ({|Pure.all|const|} {|prop|type|} (A : eta {|prop|type|} => {|Pure.imp|const|} A A)) ({|Pure.term_def|axiom|} {|'a|} x)) (A : eta {|prop|type|} => H : eps A => H).",
//     "thm proof630 : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.term|const|} {|'a|} x) := {|'a|} : Typ => x : eta {|'a|} => proof628 {|'a|} x.",
//     "thm proof632 : {|'a|} : Typ -> x : eta {|'a|} -> eps ({|Pure.term|const|} {|'a|} x) := {|'a|} : Typ => x : eta {|'a|} => proof630 {|'a|} x.",
//     "thm {|Pure.sort_constraintI|thm|} : {|'a|} : Typ -> eps ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) := {|'a|} : Typ => {|Pure.equal_elim|axiom|} ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})) ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})) ({|Pure.sort_constraint_def|axiom|} {|'a|})) ({|Pure.termI|thm|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})).",
//     "thm proof640 : {|'a|} : Typ -> eps ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) := {|'a|} : Typ => {|Pure.equal_elim|axiom|} ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})) ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) ({|Pure.term|const|} ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})) ({|Pure.sort_constraint_def|axiom|} {|'a|})) (proof632 ({|itself|type|} {|'a|}) ({|Pure.type|const|} {|'a|})).",
//     "thm proof642 : {|'a|} : Typ -> eps ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) := {|'a|} : Typ => proof640 {|'a|}.",
//     "thm proof644 : {|'a|} : Typ -> eps ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) := {|'a|} : Typ => proof642 {|'a|}.",
//     "thm {|Pure.sort_constraint_eq|thm|} : {|'a|} : Typ -> A : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.imp|const|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) A) A) := {|'a|} : Typ => A : eta {|prop|type|} => {|Pure.equal_intr|axiom|} ({|Pure.imp|const|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) A) A (H : eps ({|Pure.imp|const|} ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) A) => H ({|Pure.sort_constraintI|thm|} {|'a|})) (H : eps A => Ha : eps ({|Pure.sort_constraint|const|} {|'a|} ({|Pure.type|const|} {|'a|})) => H).",
//     "thm {|Pure.conjunctionD1|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) A) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps ({|Pure.conjunction|const|} A B) => {|Pure.equal_elim|axiom|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B) H A (Ha : eps A => Hb : eps B => Ha).",
//     "thm {|Pure.conjunctionD2|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) B) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps ({|Pure.conjunction|const|} A B) => {|Pure.equal_elim|axiom|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B) H B (Ha : eps A => Hb : eps B => Hb).",
//     "thm {|Pure.conjunctionI|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B ({|Pure.conjunction|const|} A B))) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps A => Ha : eps B => {|Pure.equal_elim|axiom|} ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction|const|} A B) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B)) (C : eta {|prop|type|} => Hb : eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) => Hb H Ha).",
//     "thm {|Pure.meta_mp|thm|} : P : eta {|prop|type|} -> Q : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} P Q) ({|Pure.imp|const|} P Q)) := P : eta {|prop|type|} => Q : eta {|prop|type|} => H : eps ({|Pure.imp|const|} P Q) => H.",
//     "thm proof598 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.prop|const|} A)) := A : eta {|prop|type|} => {|Pure.equal_elim|axiom|} A ({|Pure.prop|const|} A) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.prop|const|} A) A ({|Pure.prop_def|axiom|} A)).",
//     "thm proof600 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.prop|const|} A)) := A : eta {|prop|type|} => proof598 A.",
//     "thm proof602 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.prop|const|} A)) := A : eta {|prop|type|} => proof600 A.",
//     "thm proof610 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.prop|const|} A) A) := A : eta {|prop|type|} => {|Pure.equal_elim|axiom|} ({|Pure.prop|const|} A) A ({|Pure.prop_def|axiom|} A).",
//     "thm proof612 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.prop|const|} A) A) := A : eta {|prop|type|} => proof610 A.",
//     "thm proof614 : A : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.prop|const|} A) A) := A : eta {|prop|type|} => proof612 A.",
//     "thm proof41928 : P : eta {|prop|type|} -> Q : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} P Q) ({|Pure.imp|const|} P Q)) := P : eta {|prop|type|} => Q : eta {|prop|type|} => H : eps ({|Pure.imp|const|} P Q) => H.",
//     "thm proof41930 : P : eta {|prop|type|} -> eps ({|Pure.imp|const|} P P) := P : eta {|prop|type|} => H : eps P => H.",
//     "thm proof41932 : P : eta {|prop|type|} -> Q : eta {|prop|type|} -> eps ({|Pure.imp|const|} P ({|Pure.imp|const|} ({|Pure.imp|const|} P Q) ({|Pure.prop|const|} Q))) := P : eta {|prop|type|} => Q : eta {|prop|type|} => H : eps P => Ha : eps ({|Pure.imp|const|} P Q) => proof602 Q (proof41928 P Q Ha (proof41930 P H)).",
//     "thm proof41934 : P : eta {|prop|type|} -> Q : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} P Q) ({|Pure.imp|const|} P Q)) := P : eta {|prop|type|} => Q : eta {|prop|type|} => H : eps ({|Pure.imp|const|} P Q) => Ha : eps P => proof614 Q (proof41932 P Q Ha H).",
//     "thm proof41938 : P : eta {|prop|type|} -> Q : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} P Q) ({|Pure.imp|const|} P Q)) := P : eta {|prop|type|} => Q : eta {|prop|type|} => proof41934 P Q.",
//     "thm {|Pure.meta_impE|thm|} : P : eta {|prop|type|} -> V : eta {|prop|type|} -> W : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.imp|const|} P V) ({|Pure.imp|const|} P ({|Pure.imp|const|} ({|Pure.imp|const|} V W) W))) := P : eta {|prop|type|} => V : eta {|prop|type|} => W : eta {|prop|type|} => H : eps ({|Pure.imp|const|} P V) => Ha : eps P => Hb : eps ({|Pure.imp|const|} V W) => Hb ({|Pure.meta_mp|thm|} P V H Ha).",
//     "thm {|Pure.meta_spec|thm|} : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> x : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) (P x)) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => x : eta {|'a|} => H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) => H x.",
//     "thm proof42020 : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x))) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) => H.",
//     "thm proof42022 : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> x : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) ({|Pure.prop|const|} (P x))) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => x : eta {|'a|} => H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) => proof602 (P x) (proof42020 {|'a|} P H x).",
//     "thm proof42024 : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> x : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) (P x)) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => x : eta {|'a|} => H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) => proof614 (P x) (proof42022 {|'a|} P x H).",
//     "thm proof42028 : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> x : eta {|'a|} -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) (P x)) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => x : eta {|'a|} => proof42024 {|'a|} P x.",
//     "thm {|Pure.meta_allE|thm|} : {|'a|} : Typ -> P : eta ({|fun|type|} {|'a|} {|prop|type|}) -> x : eta {|'a|} -> W : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) ({|Pure.imp|const|} ({|Pure.imp|const|} (P x) W) W)) := {|'a|} : Typ => P : eta ({|fun|type|} {|'a|} {|prop|type|}) => x : eta {|'a|} => W : eta {|prop|type|} => H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x)) => Ha : eps ({|Pure.imp|const|} (P x) W) => Ha ({|Pure.meta_spec|thm|} {|'a|} P x H).",
//     "thm {|Pure.swap_params|thm|} : {|'a|} : Typ -> {|'b|} : Typ -> P : eta ({|fun|type|} {|'a|} ({|fun|type|} {|'b|} {|prop|type|})) -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.all|const|} {|'b|} (y : eta {|'b|} => P x y))) ({|Pure.all|const|} {|'b|} (y : eta {|'b|} => {|Pure.all|const|} {|'a|} (x : eta {|'a|} => P x y)))) := {|'a|} : Typ => {|'b|} : Typ => P : eta ({|fun|type|} {|'a|} ({|fun|type|} {|'b|} {|prop|type|})) => {|Pure.equal_intr|axiom|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.all|const|} {|'b|} (y : eta {|'b|} => (xa : eta {|'a|} => ya : eta {|'b|} => (xb : eta {|'a|} => yb : eta {|'b|} => (xc : eta {|'a|} => yc : eta {|'b|} => P xc yc) xb yb) xa ya) x y))) ({|Pure.all|const|} {|'b|} (y : eta {|'b|} => {|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => ya : eta {|'b|} => (xb : eta {|'a|} => yb : eta {|'b|} => (xc : eta {|'a|} => yc : eta {|'b|} => P xc yc) xb yb) xa ya) x y))) (H : eps ({|Pure.all|const|} {|'a|} (a : eta {|'a|} => {|Pure.all|const|} {|'b|} (y : eta {|'b|} => (x : eta {|'a|} => ya : eta {|'b|} => (xa : eta {|'a|} => yb : eta {|'b|} => (xb : eta {|'a|} => yc : eta {|'b|} => P xb yc) xa yb) x ya) a y))) => y : eta {|'b|} => x : eta {|'a|} => H x y) (H : eps ({|Pure.all|const|} {|'b|} (a : eta {|'b|} => {|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => y : eta {|'b|} => (xb : eta {|'a|} => ya : eta {|'b|} => (xc : eta {|'a|} => yb : eta {|'b|} => P xc yb) xb ya) xa y) x a))) => x : eta {|'a|} => y : eta {|'b|} => H y x).",
//     "thm proof696 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) A) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps ({|Pure.conjunction|const|} A B) => {|Pure.equal_elim|axiom|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B) H A (Ha : eps A => Hb : eps B => Ha).",
//     "thm proof698 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) A) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof696 A B.",
//     "thm proof700 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) A) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof698 A B.",
//     "thm proof708 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) B) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps ({|Pure.conjunction|const|} A B) => {|Pure.equal_elim|axiom|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B) H B (Ha : eps A => Hb : eps B => Hb).",
//     "thm proof710 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) B) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof708 A B.",
//     "thm proof712 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) B) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof710 A B.",
//     "thm proof720 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B ({|Pure.conjunction|const|} A B))) := A : eta {|prop|type|} => B : eta {|prop|type|} => H : eps A => Ha : eps B => {|Pure.equal_elim|axiom|} ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction|const|} A B) ({|Pure.symmetric|axiom|} {|prop|type|} ({|Pure.conjunction|const|} A B) ({|Pure.all|const|} {|prop|type|} (C : eta {|prop|type|} => {|Pure.imp|const|} ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) C)) ({|Pure.conjunction_def|axiom|} A B)) (C : eta {|prop|type|} => Hb : eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) => Hb H Ha).",
//     "thm proof722 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B ({|Pure.conjunction|const|} A B))) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof720 A B.",
//     "thm proof724 : A : eta {|prop|type|} -> B : eta {|prop|type|} -> eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B ({|Pure.conjunction|const|} A B))) := A : eta {|prop|type|} => B : eta {|prop|type|} => proof722 A B.",
//     "thm {|Pure.all_conjunction|thm|} : {|'a|} : Typ -> A : eta ({|fun|type|} {|'a|} {|prop|type|}) -> B : eta ({|fun|type|} {|'a|} {|prop|type|}) -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.conjunction|const|} (A x) (B x))) ({|Pure.conjunction|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => A x)) ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => B x)))) := {|'a|} : Typ => A : eta ({|fun|type|} {|'a|} {|prop|type|}) => B : eta ({|fun|type|} {|'a|} {|prop|type|}) => {|Pure.equal_intr|axiom|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.conjunction|const|} ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x) ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x))) ({|Pure.conjunction|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x)) ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x))) (H : eps ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => {|Pure.conjunction|const|} ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x) ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x))) => {|Pure.conjunctionI|thm|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x)) ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x)) (x : eta {|'a|} => {|Pure.conjunctionD1|thm|} ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x) ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x) (H x)) (x : eta {|'a|} => {|Pure.conjunctionD2|thm|} ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x) ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x) (H x))) (H : eps ({|Pure.conjunction|const|} ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x)) ({|Pure.all|const|} {|'a|} (x : eta {|'a|} => (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x))) => x : eta {|'a|} => {|Pure.conjunctionI|thm|} ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => A xc) xb) xa) x) ((xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => B xc) xb) xa) x) ({|Pure.conjunctionD1|thm|} ({|Pure.all|const|} {|'a|} (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => (xd : eta {|'a|} => A xd) xc) xb) xa)) ({|Pure.all|const|} {|'a|} (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => (xd : eta {|'a|} => B xd) xc) xb) xa)) H x) ({|Pure.conjunctionD2|thm|} ({|Pure.all|const|} {|'a|} (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => (xd : eta {|'a|} => A xd) xc) xb) xa)) ({|Pure.all|const|} {|'a|} (xa : eta {|'a|} => (xb : eta {|'a|} => (xc : eta {|'a|} => (xd : eta {|'a|} => B xd) xc) xb) xa)) H x)).",
//     "thm {|Pure.imp_conjunction|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> C : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.imp|const|} A ({|Pure.conjunction|const|} B C)) ({|Pure.conjunction|const|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C))) := A : eta {|prop|type|} => B : eta {|prop|type|} => C : eta {|prop|type|} => {|Pure.equal_intr|axiom|} ({|Pure.imp|const|} A ({|Pure.conjunction|const|} B C)) ({|Pure.conjunction|const|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C)) (H : eps ({|Pure.imp|const|} A ({|Pure.conjunction|const|} B C)) => {|Pure.conjunctionI|thm|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C) (Ha : eps A => {|Pure.conjunctionD1|thm|} B C (H Ha)) (Ha : eps A => {|Pure.conjunctionD2|thm|} B C (H Ha))) (H : eps ({|Pure.conjunction|const|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C)) => Ha : eps A => {|Pure.conjunctionI|thm|} B C ({|Pure.conjunctionD1|thm|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C) H Ha) ({|Pure.conjunctionD2|thm|} ({|Pure.imp|const|} A B) ({|Pure.imp|const|} A C) H Ha)).",
//     "thm {|Pure.conjunction_imp|thm|} : A : eta {|prop|type|} -> B : eta {|prop|type|} -> C : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) C) ({|Pure.imp|const|} A ({|Pure.imp|const|} B C))) := A : eta {|prop|type|} => B : eta {|prop|type|} => C : eta {|prop|type|} => {|Pure.equal_intr|axiom|} ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) C) ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) (H : eps ({|Pure.imp|const|} ({|Pure.conjunction|const|} A B) C) => Ha : eps A => Hb : eps B => H ({|Pure.conjunctionI|thm|} A B Ha Hb)) (H : eps ({|Pure.imp|const|} A ({|Pure.imp|const|} B C)) => Ha : eps ({|Pure.conjunction|const|} A B) => H ({|Pure.conjunctionD1|thm|} A B Ha) ({|Pure.conjunctionD2|thm|} A B Ha)).",
//   ].join("\n");
// }



