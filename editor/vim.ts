import * as A from 'fp-ts/lib/Array';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';

import { ea, usePackage, wa, Init, withPrefix } from '../lib';

interface Command {
  command: string;
}
interface KeyBind {
  after?: string[];
  before: string[];
  commands?: Command[] | string[];
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
    commands: [scope ? `${scope}.${command}` : command]
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

const SortJson: Keymap = [
  { prefix: 'S', scope: 'sortJSON' },
  ['j', 'sortJSON'],
  ['J', 'sortJSONReverse'],
  ['k', 'sortJSONKeyLength'],
  ['K', 'sortJSONKeyLengthReverse'],
  ['a', 'sortJSONAlphaNum'],
  ['A', 'sortJSONAlphaNumReverse'],
  ['v', 'sortJSONValues'],
  ['V', 'sortJSONValuesReverse'],
  ['t', 'sortJSONType'],
  ['T', 'sortJSONTypeReverse']
];
const normal: KeyBind[] = keymaps([
  [
    {},
    ...scopes({
      'workbench.action': [
        ['<', 'showAllEditorsByMostRecentlyUsed'],
        [',', 'previousEditor'],
        ['*', 'showAllSymbols']
      ]
    })
  ],
  [
    { prefix: '[', global: true },
    ['b', wa('previousEditor')],
    ...scopes({
      'workbench.action': [['b', 'previousEditor']],
      editorAction: [
        ['space', 'insertLinesBefore'],
        ['d', 'dirtydiff.previous'],
        ['e', 'marker.prev'],
        ['E', 'marker.prevInFiles']
      ]
    })
  ],
  [
    { prefix: ']', global: true },
    ...scopes({
      'workbench.action': [['b', 'nextEditor']],
      'editor.action': [
        ['space', 'insertLineAfter'],
        ['d', 'dirtydiff.next'],
        ['e', 'marker.next'],
        ['E', 'marker.nextInFiles']
      ]
    })
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
  SortJson,
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
      extension: [
        ['P', 'cm_open_palette'],
        ['C', 'cm_open_picker'],
        ['e', 'cm_open_picker_sel']
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
        ['s', 'openSnippets'],
        ['r', 'reloadWindow'],
        ['t', 'selectTheme'],
        ['T', 'generateColorTheme']
      ]
    })
  ],
  [
    { prefix: 'c' },
    ...scopes({
      'workbench.actions.view': [['x', 'toggleProblems']],
      'editor.action': [
        ['A', 'AutoFix'],
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
      'gistpad.showcase': [['G', 'view']],
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
    ['H', 'closeEditorsToTheLeft'],
    ['o', 'closeEditorsInOtherGroups'],
    ['a', 'closeEditorInAllGroups'],
    ['w', 'quickSwitchWindow'],
    ['u', 'closeUnmodifiedEditors'],
    ['v', 'splitEditor']
  ],
  [
    { prefix: 'gz', scope: 'editor.action' },
    ...scopes({
      'workbench.action': [['t', 'toggleMultiCursorModifier']],
      'editor.action': [
        ['K', 'addCursorsToBottom'],
        ['J', 'addCursorsToTop'],
        ['k', 'insertCursorAbove'],
        ['j', 'insertCursorBelow'],
        ['e', 'insertCursorAtEndOfEachLineSelected']
      ]
    })
  ],
  [
    { prefix: 'f' },
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
        ['p', 'openSettingsJson'],
        ['P', 'openDefaultSettingsJson'],
        ['k', 'openGlobalKeybindingsFile'],
        ['K', 'openDefaultKeybindingsFile'],
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
        ['D', 'refreshGitProjects'],
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
        ['d', 'toggleDevTools'],
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

const visual: KeyBind[] = keymaps([
  [
    { scope: 'editor.action', global: true },
    ['<', 'outdentLines'],
    ['>', 'indentLines']
  ],
  SortJson
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

export const init: Init = usePackage<'vscodevim.vim'>('vscodevim.vim', {
  config: {
    'camelCaseMotion.enable': false,
    autoindent: true,
    startofline: true,
    showcmd: true,
    foldfix: true,
    enableNeovim: true,
    experimentalOptimizations: true,

    handleKeys: {
      '<C-e>': false
    },
    easymotion: true,
    ...withPrefix('cursorStylePerMode.', cursor),
    ...withPrefix('easymotionMarker', {
      FontFamily: 'monospace',
      FontWeight: '500',
      FontSize: '12',
      Height: 20,
      WidthPerChar: 20,
      YOffset: 4,
      ForegroundColorOneChar: '#b2dfff',
      ForegroundColorTwoChar: '#82aaff',
      BackgroundColor: '#191a2a'
    }),
    'highlightedyank.color': '#86e1fccc',
    'highlightedyank.enable': true,
    leader: '<space>',
    normalModeKeyBindings: normal,
    neovimPath: '/home/brett/.nix-profile/bin/nvim',
    overrideCopy: true,
    history: 10000,
    replaceWithRegister: true,
    sneak: true,
    smartcase: true,
    visualModeKeyBindingsNonRecursive: visual,
    sneakUseIgnorecaseAndSmartcase: true,
    gdefault: true,
    visualstar: true,
    useSystemClipboard: true
  }
});
