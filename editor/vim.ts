import { wa, ea, usePackage, w } from '../lib';
import * as A from 'fp-ts/lib/Array';

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
  prefix: string;
  global?: boolean;
  scope?: string;
}

type Keymap = [KeymapOptions, ...KeyBindTuple[]];

const singleton = <A>(a: A | A[]): A[] => (Array.isArray(a) ? a : [a]);

const keymap = ([
  { prefix, scope, global = false },
  ...keys
]: Keymap): KeyBind[] =>
  keys.map(([key, command]) => ({
    before: (() => {
      const x = prefix ? [prefix].concat(key) : singleton(key);
      return global ? x : ['<leader>', ...x];
    })(),
    commands: [{ command: scope ? `${scope}.${command}` : command }]
  }));

const keymaps = A.chain(keymap);

const normal = keymaps([
  [
    { prefix: '[', global: true },
    ['b', wa('previousEditor')],
    ['e', 'goToPrevError']
  ],
  [
    { prefix: ']', global: true },
    ['b', wa('nextEditor')],
    ['e', 'goToNextError']
  ],
  [
    { prefix: 'o' },
    ['h', ea('showHover')],
    ['p', w('view.explorer')],
    ['t', wa('terminal.toggleTerminal')]
  ],
  [
    { prefix: 'b' },
    ['b', wa('showAllEditors')],
    ['d', wa('closeActiveEditor')],
    ['n', wa('nextEditor')],
    ['p', wa('previousEditor')],
    ['s', wa('files.newUntitledFile')],
    ['m', 'bookmarks.toggle'],
    ['M', 'bookmarks.toggleLabled']
  ],
  [
    { prefix: 'h' },
    ['d', wa('openGlobalKeybindings')],
    ['f', ea('inspectTMScopes')],
    ['r', wa('reloadWindow')]
  ],
  [
    { prefix: 'c' },
    ['f', ea('formatDocument')],
    ['i', 'extension.sortImports'],
    ['x', w('actions.view.toggleProblems')]
  ],
  [
    { prefix: 'g' },
    ['g', 'magit.status'],
    ['s', 'git.stage'],
    ['u', 'git-unstage']
  ],
  [
    { prefix: 'w', scope: 'workbench.action' },
    ['d', 'closeEditorsInGroup'],
    ['h', 'focusPreviousGroup'],
    ['u', 'closeUnmodifiedEditors'],
    ['v', 'splitEditor']
  ],
  [
    { prefix: 'f' },
    ['f', 'actions.find'],
    ['p', wa('findInFiles')],
    ['s', wa('gotoSymbol')],
    ['t', wa('showAllSymbols')]
  ],
  [
    { prefix: 'p', scope: 'projectManager' },
    ['i', 'refreshProjects'],
    ['p', 'listProjects']
  ]
]);

console.log(normal);

export const init = usePackage('vscodevim.vim', {
  config: {
    'camelCaseMotion.enable': false,
    autoindent: true,
    startofline: true,
    showcmd: true,
    foldfix: true,
    'cursorStylePerMode.insert': 'line-thin',
    'cursorStylePerMode.normal': 'block',
    'cursorStylePerMode.replace': 'underline-thin',
    easymotion: true,
    easymotionMarkerFontFamily: 'Operator Mono SSm Lig',
    easymotionMarkerFontWeight: '400',
    easymotionMarkerFontSize: '12',
    easymotionMarkerHeight: 18,
    easymotionMarkerWidthPerChar: 10,
    easymotionMarkerYOffset: 4,
    easymotionMarkerBackgroundColor: '#5881ea',
    'highlightedyank.color': '#74a0f133',
    'highlightedyank.enable': true,
    leader: '<space>',
    normalModeKeyBindings: normal,
    history: 1000,
    sneak: true,
    visualModeKeyBindingsNonRecursive: [
      {
        before: ['>'],
        commands: ['editor.action.indentLines']
      },
      {
        before: ['<'],
        commands: ['editor.action.outdentLines']
      }
    ],
    sneakUseIgnorecaseAndSmartcase: true,
    gdefault: true,
    useSystemClipboard: true
  }
});
