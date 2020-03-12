import * as A from 'fp-ts/lib/Array';

import { ea, usePackage, w, wa, e, Init } from '../lib';

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

const keymaps: (xs: Keymap[]) => KeyBind[] = A.chain(keymap);

const normal: KeyBind[] = keymaps([
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
    ['c', ea('showContextMenu')],
    ['d', w('debug.startView.focus')],
    ['e', 'extensions.listview.focus'],
    ['D', 'dockerContainers.focus'],
    ['h', ea('showHover')],
    ['H', w('view.extension.localHistory')],
    ['p', w('view.explorer')],
    ['r', w('debug.action.toggleRepl')],
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
    ['c', 'gitlens.showCommitSearch'],
    ['h', 'gitlens.showQuickFileHistory'],
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
    ['b', 'gitlens.toggleFileBlame'],
    ['B', 'gitlens.toggleCodeLens'],
    ['r', 'extension.colorHighlight'],
    ['e', 'errorLens.toggle'],
    ['b', 'breadcrumbs.toggle'],
    ['T', ea('toggleTabFocusMode')],
    ['m', ea('toggleMinimap')],
    ['w', ea('toggleWordWrap')],
    ['c', 'codemetrics.toggleCodeMetricsDisplayed'],
    ['C', 'io.orta.jest.coverage.toggle'],
    ['i', 'importCost.toggle'],
    ['P', 'prettifySymbolsMode.togglePrettySymbols'],
    ['s', 'cSpell.toggleEnableSpellChecker'],
    ['p', wa('togglePannel')],
    ['d', wa('toggleDeveloperTools')],
    ['D', e('debug.action.toggleBreakpoint')],
    ['z', wa('toggleZenMode')],
    ['S', wa('toggleAutoSave')],
    ['a', wa('toggleActivityBarVisibility')],
    ['t', wa('toggleTabsVisibility')],
    ['f', wa('toggleFullScreen')],
    ['s', wa('toggleSidebarVisibility')]
  ]
]);

const visual: KeyBind[] = keymap([
  { scope: 'editor.action', global: true },
  ['<', 'outdentLines'],
  ['>', 'indentLines']
]);

export const init: Init = usePackage('vscodevim.vim', {
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
    easymotionMarkerFontFamily: 'monospace',
    easymotionMarkerFontWeight: '500',
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
    visualModeKeyBindingsNonRecursive: visual,
    sneakUseIgnorecaseAndSmartcase: true,
    gdefault: true,
    useSystemClipboard: true
  }
});
