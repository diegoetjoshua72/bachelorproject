

require.config({ paths: { vs: "./monaco/min/vs" } });


var editor = require(["vs/editor/editor.main"], function () {

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

  return(monaco.editor.create(document.getElementById("container"), {
    theme: "vs-gruv",
    value: getCode(),
    language: "lambdapi",
  }));
});

function getCode() {
  return [
    "Typ : Type.",
    "def eta : _ : Typ -> Type.",

    "(; theory Pure ;)",
    "{|fun|type|} : _ : Typ -> _ : Typ -> Typ.",
    "[a, b] eta ({|fun|type|} a b) --> _ : eta a -> eta b.",
    "{|prop|type|} : Typ.",
    "def eps : _ : eta {|prop|type|} -> Type.",
    "{|itself|type|} : _ : Typ -> Typ.",
    "{|dummy|type|} : Typ.",
    "{|Pure.proof|type|} : Typ.",
    "{|Pure.eq|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|'a|} ({|fun|type|} {|'a|} {|prop|type|})).",
    "{|Pure.imp|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} {|prop|type|} {|prop|type|})).",
    "[a, b] eps ({|Pure.imp|const|} a b) --> _ : eps a -> eps b.",
    "{|Pure.all|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} {|'a|} {|prop|type|}) {|prop|type|}).",
    "[a, b] eps ({|Pure.all|const|} a b) --> x : eta a -> eps (b x).",
    "{|Pure.prop|const|} : eta ({|fun|type|} {|prop|type|} {|prop|type|}).",
    "{|Pure.type|const|} : {|'a|} : Typ -> eta ({|itself|type|} {|'a|}).",
    "{|Pure.dummy_pattern|const|} : {|'a|} : Typ -> eta {|'a|}.",
    "{|Pure.Appt|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|Pure.proof|type|} ({|fun|type|} {|'a|} {|Pure.proof|type|})).'",
    "{|Pure.AppP|const|} : eta ({|fun|type|} {|Pure.proof|type|} ({|fun|type|} {|Pure.proof|type|} {|Pure.proof|type|})).",
    "{|Pure.Abst|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} {|'a|} {|Pure.proof|type|}) {|Pure.proof|type|}).",
    "{|Pure.AbsP|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} ({|fun|type|} {|Pure.proof|type|} {|Pure.proof|type|}) {|Pure.proof|type|})).'",
    "{|Pure.Hyp|const|} : eta ({|fun|type|} {|prop|type|} {|Pure.proof|type|}).",
    "{|Pure.Oracle|const|} : eta ({|fun|type|} {|prop|type|} {|Pure.proof|type|}).",
    "{|Pure.OfClass|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|fun|type|} ({|itself|type|} {|'a|}) {|prop|type|}) {|Pure.proof|type|}).",
    "{|Pure.MinProof|const|} : eta {|Pure.proof|type|}.",
    "{|Pure.term|const|} : {|'a|} : Typ -> eta ({|fun|type|} {|'a|} {|prop|type|}).",
    "{|Pure.sort_constraint|const|} : {|'a|} : Typ -> eta ({|fun|type|} ({|itself|type|} {|'a|}) {|prop|type|}).",
    "{|Pure.conjunction|const|} : eta ({|fun|type|} {|prop|type|} ({|fun|type|} {|prop|type|} {|prop|type|})).",
    "{|Pure.prop_def|axiom|} : A : eta {|prop|type|} -> eps ({|Pure.eq|const|} {|prop|type|} ({|Pure.prop|const|} A) A).",
  ].join("\n");
}
