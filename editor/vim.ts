import { wa, ea, usePackage, w } from "../lib";
import { map } from "fp-ts/lib/Array";

interface Command {
  command: string;
}
interface KeyBind {
  after?: string[];
  before: string[];
  commands: Command[];
}
type KeyBindTuple = [string | string[], string];
interface KeymapOptions {
  prefix?: string;
  scope?: string;
}

type Keymap = [KeymapOptions, ...KeyBindTuple[]];

const singleton = (a: unknown) => (Array.isArray(a) ? a : [a]);

const keymap = ([{ prefix, scope }, ...keys]: Keymap): KeyBind[] =>
  keys.map(([key, command]) => ({
    before: prefix ? [prefix].concat(singleton(key)) : singleton(key),
    commands: [{ command: scope ? `${scope}.${command}` : command }]
  }));

const keymaps = map(keymap);

const normal = keymaps([
  [{ prefix: "[" }, ["b", wa("previousEditor")], ["e", "goToPrevError"]],
  [{ prefix: "]" }, ["b", wa("nextEditor")], ["e", "goToNextError"]],
  [
    { prefix: "o" },
    ["h", ea("showHover")],
    ["p", w("view.explorer")],
    ["t", wa("terminal.toggleTerminal")]
  ],
  [
    { prefix: "b" },
    ["b", "showAllEditors"],
    ["d", "closeActiveEditor"],
    ["n", "nextEditor"],
    ["p", "previousEditor"],
    ["s", "files.newUntitledFile"],
    ["m", "bookmarks.toggle"],
    ["M", "bookmarks.toggleLabled"]
  ],
  [
    { prefix: "h" },
    ["d", wa("openGlobalKeybindings")],
    ["f", ea("inspectTMScopes")],
    ["r", wa("reloadWindow")]
  ],
  [
    { prefix: "c" },
    ["f", ea("formatDocument")],
    ["i", "extension.sortImports"],
    ["x", wa("view.problems")]
  ],
  [
    { prefix: "g" },
    ["g", "magit.status"],
    ["s", "git.stage"],
    ["u", "git-unstage"]
  ],
  [
    { prefix: "w", scope: "workbench.action" },
    ["d", "closeEditorsInGroup"],
    ["h", "focusPreviousGroup"],
    ["u", "closeUnmodifiedEditors"],
    ["v", "splitEditor"]
  ],
  [
    { prefix: "f" },

    ["f", "actions.find"],
    ["p", wa("findInFiles")],
    ["P", "betterSearch.search"],
    ["r", "references-view.find"],
    ["s", wa("gotoSymbol")],
    ["t", wa("showAllSymbols")]
  ],
  [
    { prefix: "p", scope: "projectManager" },
    ["i", "refreshProjects"],
    ["p", "listProjects"]
  ]
]);

export const init = usePackage("vscodevim.vim", {
  config: {
    "camelCaseMotion.enable": false,
    autoindent: true,
    startofline: true,
    showcmd: true,
    foldfix: true,
    "cursorStylePerMode.insert": "line-thin",
    "cursorStylePerMode.normal": "block",
    "cursorStylePerMode.replace": "underline-thin",
    easymotion: true,
    easymotionMarkerFontFamily: "Operator Mono SSm Lig",
    easymotionMarkerFontWeight: "400",
    easymotionMarkerFontSize: "12",
    easymotionMarkerHeight: 18,
    easymotionMarkerWidthPerChar: 10,
    easymotionMarkerYOffset: 4,
    easymotionMarkerBackgroundColor: "#5881ea",
    "highlightedyank.color": "#74a0f133",
    "highlightedyank.enable": true,
    leader: "<space>",
    normalModeKeyBindings: normal,
    history: 1000,
    sneak: true,
    visualModeKeyBindingsNonRecursive: [
      {
        before: [">"],
        commands: ["editor.action.indentLines"]
      },
      {
        before: ["<"],
        commands: ["editor.action.outdentLines"]
      }
    ],
    sneakUseIgnorecaseAndSmartcase: true,
    gdefault: true,
    useSystemClipboard: true
  }
});
