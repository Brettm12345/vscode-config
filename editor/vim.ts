import * as A from 'fp-ts/lib/Array';

import { ea, usePackage, w, wa } from '../lib';

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
    ['space', ea('insertLineBefore')]
  ],
  [
    { prefix: ']', global: true },
    ['b', wa('nextEditor')],
    ['space', ea('insertLineAfter')]
  ],
  [
    { prefix: 's' },
    ['s', 'betterSearch.search'],
    ['S', 'betterSearch.searchFull'],
    ['c', 'clairvoyant.sight'],
    ['C', 'cliarvoyant.sightDocument'],
    ['t', 'clairvoyant.sightToken'],
    ['i', wa('gotoSymbol')],
    ['I', wa('showAllSymbols')],
    ['d', 'filesExplorer.findInFolder'],
    ['p', w('view.search')],
    ['b', 'actions.find']
  ],
  [
    { prefix: 'o' },
    ['d', w('debug.startView.focus')],
    ['e', 'extensions.listview.focus'],
    ['D', 'dockerContainers.focus'],
    ['h', ea('showHover')],
    ['H', w('view.extension.localHistory')],
    ['p', w('view.explorer')],
    ['r', w('panel.repl.view.focus')],
    ['t', wa('terminal.toggleTerminal')],
    ['T', wa('quickOpenTerm')]
  ],
  [
    { prefix: 'b' },
    ['[', wa('previousEditor')],
    [']', wa('nextEditor')],
    ['b', wa('showAllEditorsByMostRecentlyUsed')],
    ['B', wa('showAllEditors')],
    ['d', wa('closeActiveEditor')],
    ['k', wa('closeActiveEditor')],
    ['K', wa('closeAllEditors')],
    ['O', wa('closeOtherEditors')],
    ['N', wa('files.newUntitledFile')],
    ['s', wa('files.save')],
    ['S', wa('files.saveAll')],
    ['x', 'extension.openScratchpad'],
    ['m', 'bookmarks.toggle'],
    ['M', 'bookmarks.toggleLabled']
  ],
  [
    { prefix: 'h' },
    ['d', wa('openGlobalKeybindings')],
    ['f', ea('inspectTMScopes')],
    ['i', 'perfview.show'],
    ['p', 'extension.managePackage'],
    ['r', wa('reloadWindow')],
    ['t', wa('generateColorTheme')]
  ],
  [
    { prefix: 'c' },
    ['a', ea('codeAction')],
    ['c', wa('tasks.build')],
    ['C', 'extension.changeCase.commands'],
    ['m', 'extension.runMake'],
    ['M', 'extension.runMakeByTarget'],
    ['i', ea('organizeImports')],
    ['f', ea('formatDocument')],
    ['j', wa('showAllSymbols')],
    ['r', ea('rename')],
    ['x', w('actions.view.toggleProblems')]
  ],
  [
    { prefix: 'g' },
    ['g', 'magit.status'],
    ['p', 'git.push'],
    ['P', 'git.pushTo'],
    ['b', 'git.checkout'],
    ['f', 'git.fetchAll'],
    ['c', 'magit.commit'],
    ['s', 'git.stage'],
    ['r', 'git.undoCommit'],
    ['u', 'git-unstage'],
    ['U', 'git.unstageAll']
  ],
  [
    { prefix: 'w', scope: 'workbench.action' },
    ['d', 'closeEditorsInGroup'],
    ['h', 'focusPreviousGroup'],
    ['w', 'quickSwitchWindow'],
    ['u', 'closeUnmodifiedEditors'],
    ['v', 'splitEditor']
  ],
  [
    { prefix: 'f' },
    ['d', wa('files.openFolder')],
    ['D', wa('files.openFolderInNewWindow')],
    ['f', wa('files.openFile')],
    ['F', wa('files.openFileFolderInNewWindow')],
    ['r', wa('files.revert')],
    ['y', wa('files.copyPathOfActiveFile')],
    ['w', wa('files.showOpenedFileInNewWindow')],
    ['b', wa('openGlobalKeybindingsFile')],
    ['s', wa('openGlobalSettings')],
    ['p', 'init-script.openInitScript']
  ],
  [
    { prefix: 'p', scope: 'projectManager' },
    ['a', 'addToWorkspace'],
    ['e', 'editProjects'],
    ['d', 'deleteProject'],
    ['i', 'refreshProjects'],
    ['o', 'open'],
    ['O', 'openInNewWindow'],
    ['f', 'addToFavorites'],
    ['p', 'listProjects'],
    ['r', 'renameProject']
  ],
  [
    { prefix: 'p' },
    ['s', 'clairvoyant.scanWorkspace'],
    ['t', wa('tasks.openWorkspaceFileTasks')],
    ['T', w('view.extension.testExplorer')],
    ['g', wa('openWorkspaceSettings')]
  ],
  [
    { prefix: 'n', scope: 'notification' },
    ['c', 'collapse'],
    ['e', 'expand'],
    ['t', 'toggle'],
    ['x', 'clear']
  ],
  [
    { prefix: 't' },
    ['r', 'extension.colorHighlight'],
    ['e', 'errorLens.toggle'],
    ['b', 'breadcrumbs.toggle'],
    ['c', 'codemetrics.toggleCodeMetricsDisplayed'],
    ['i', 'importCost.toggle'],
    ['p', 'prettifySymbolsMode.togglePrettySymbols'],
    ['s', 'cSpell.toggleEnableSpellChecker'],
    ['z', wa('toggleZenMode')],
    ['S', wa('toggleAutoSave')],
    ['a', wa('toggleActivityBarVisibility')],
    ['t', wa('toggleTabsVisibility')],
    ['f', wa('toggleFullScreen')],
    ['s', wa('toggleSidebarVisibility')]
  ]
]);

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
