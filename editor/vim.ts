import * as A from 'fp-ts/lib/Array';
import * as R from 'fp-ts/lib/Record';

import { ea, usePackage, wa, Init, withPrefix } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';

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

const scope = (x: string, ...xs: KeyBindTuple[]): KeyBindTuple[] =>
  pipe(
    xs,
    A.map(([k, v]) => [k, `${x}.${v}`])
  );

const scopes: (x: Record<string, KeyBindTuple[]>) => KeyBindTuple[] = flow(
  R.toArray,
  A.chain(([x, xs]) => scope(x, ...xs))
);

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
    ...scopes({
      filesExplorer: [['d', 'findInFolder']],
      'workbench.view': [['p', 'search']],
      actions: [['b', 'find']],
      betterSearch: [
        ['s', 'search'],
        ['S', 'searchFull']
      ],
      clairvoyant: [
        ['c', 'sight'],
        ['C', 'sightDocument'],
        ['t', 'sightToken']
      ],
      'workbench.action': [
        ['i', 'gotoSymbol'],
        ['I', 'showAllSymbols']
      ]
    })
  ],
  [
    { prefix: 'o' },
    ['e', 'extensions.listview.focus'],
    ['D', 'dockerContainers.focus'],
    ...scopes({
      workbench: [
        ['H', 'view.extension.localHistory'],
        ['p', 'view.explorer'],
        ['r', 'debug.action.toggleRepl'],
        ['d', 'debug.startView.focus']
      ],
      'editor.action': [
        ['h', 'showHover'],
        ['c', 'showContextMenu']
      ],
      'workbench.action': [
        ['t', 'terminal.toggleTerminal'],
        ['T', 'quickOpenTerm']
      ]
    })
  ],
  [
    { prefix: 'b' },
    ...scopes({
      extension: [['x', 'openScratchpad']],
      'workbench.action': [
        ['[', 'previousEditor'],
        [']', 'nextEditor'],
        ['b', 'showAllEditorsByMostRecentlyUsed'],
        ['B', 'showAllEditors'],
        ['d', 'closeActiveEditor'],
        ['k', 'closeActiveEditor'],
        ['K', 'closeAllEditors'],
        ['O', 'closeOtherEditors'],
        ['N', 'files.newUntitledFile'],
        ['s', 'files.save'],
        ['S', 'files.saveAll']
      ],
      bookmarks: [
        ['m', 'toggle'],
        ['M', 'toggleLabled']
      ]
    })
  ],
  [
    { prefix: 'h' },
    ...scopes({
      extension: [['p', 'managePackage']],
      'editor.action': [['f', 'inspectTMScopes']],
      perfview: [['i', 'show']],
      'workbench.action': [
        ['d', 'openGlobalKeybindings'],
        ['r', 'reloadWindow'],
        ['t', 'generateColorTheme']
      ]
    })
  ],
  [
    { prefix: 'c' },
    ...scopes({
      'workbench.actions.view': [['x', 'toggleProblems']],
      'editor.action': [
        ['a', 'codeAction'],
        ['r', 'rename'],
        ['i', 'organizeImports'],
        ['f', 'formatDocument']
      ],
      'workbench.action': [
        ['c', 'tasks.build'],
        ['j', 'showAllSymbols']
      ],
      extension: [
        ['C', 'extension.changeCase.commands'],
        ['m', 'extension.runMake'],
        ['M', 'extension.runMakeByTarget']
      ]
    })
  ],
  [
    { prefix: 'g' },
    ['u', 'git-unstage'],
    ...scopes({
      git: [
        ['p', 'push'],
        ['P', 'pushTo'],
        ['b', 'checkout'],
        ['f', 'fetchAll'],
        ['U', 'unstageAll'],
        ['s', 'stage'],
        ['r', 'undoCommit']
      ],
      gitlens: [
        ['c', 'showCommitSearch'],
        ['h', 'showQuickFileHistory']
      ],
      magit: [
        ['g', 'status'],
        ['C', 'commit']
      ]
    })
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
    ['p', 'init-script.openInitScript'],
    ...scopes({
      'workbench.action.files': [
        ['d', 'openFolder'],
        ['D', 'openFolderInNewWindow'],
        ['f', 'openFile'],
        ['F', 'openFileFolderInNewWindow'],
        ['r', 'revert'],
        ['y', 'copyPathOfActiveFile'],
        ['w', 'showOpenedFileInNewWindow']
      ],
      'workbench.action': [
        ['b', 'openGlobalKeybindingsFile'],
        ['s', 'openGlobalSettings'],
        ['d', 'openFolder'],
        ['D', 'openFolderInNewWindow'],
        ['f', 'openFile'],
        ['F', 'openFileFolderInNewWindow'],
        ['r', 'revert'],
        ['y', 'copyPathOfActiveFile'],
        ['w', 'showOpenedFileInNewWindow']
      ]
    })
  ],
  [
    { prefix: 'p' },
    ...scopes({
      cliarvoyant: [['s', 'scanWorkspace']],
      'workbench.view.extension': [['T', 'testExplorer']],
      'workbench.action': [
        ['t', 'tasks.openWorkspaceFileTasks'],
        ['g', 'openWorkspaceSettings']
      ],
      projectManager: [
        ['a', 'addToWorkspace'],
        ['e', 'editProjects'],
        ['d', 'deleteProject'],
        ['i', 'refreshProjects'],
        ['o', 'open'],
        ['O', 'openInNewWindow'],
        ['f', 'addToFavorites'],
        ['p', 'listProjects'],
        ['r', 'renameProject']
      ]
    })
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
    ['C', 'io.orta.jest.coverage.toggle'],
    ['i', 'importCost.toggle'],
    ['P', 'prettifySymbolsMode.togglePrettySymbols'],
    ['s', 'cSpell.toggleEnableSpellChecker'],
    ...scopes({
      'editor.debug.action': [['D', 'toggleBreakpoint']],
      gitlens: [
        ['b', 'toggleFileBlame'],
        ['B', 'toggleCodeLens']
      ],
      'editor.action': [
        ['T', 'toggleTabFocusMode'],
        ['m', 'toggleMinimap'],
        ['w', 'toggleWordWrap']
      ],
      'workbench.action': [
        ['p', 'togglePannel'],
        ['d', 'toggleDeveloperTools'],
        ['z', 'toggleZenMode'],
        ['S', 'toggleAutoSave'],
        ['a', 'toggleActivityBarVisibility'],
        ['t', 'toggleTabsVisibility'],
        ['f', 'toggleFullScreen'],
        ['s', 'toggleSidebarVisibility']
      ]
    })
  ]
]);

const visual: KeyBind[] = keymap([
  { scope: 'editor.action', global: true },
  ['<', 'outdentLines'],
  ['>', 'indentLines']
]);

type CursorStyle =
  | 'block'
  | 'block-outline'
  | 'line'
  | 'line-thin'
  | 'underline'
  | 'underline-thin';

type VimMode =
  | 'normal'
  | 'insert'
  | 'visual'
  | 'visualblock'
  | 'visualline'
  | 'replace';

const cursor: Record<VimMode, CursorStyle> = {
  insert: 'line-thin',
  normal: 'block',
  visual: 'block-outline',
  visualline: 'block-outline',
  visualblock: 'block-outline',
  replace: 'underline-thin'
};

export const init: Init = usePackage('vscodevim.vim', {
  config: {
    'camelCaseMotion.enable': false,
    autoindent: true,
    startofline: true,
    showcmd: true,
    foldfix: true,
    easymotion: true,
    ...withPrefix('cursorStylePerMode.', cursor),
    ...withPrefix('easymotionMarker', {
      FontFamily: 'monospace',
      FontWeight: '500',
      FontSize: '12',
      Height: 18,
      WidthPerChar: 10,
      YOffset: 4,
      BackgroundColor: '#5881ea'
    }),
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
