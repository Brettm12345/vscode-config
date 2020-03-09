import { keymaps } from '../lib/keyboard';

export const init = keymaps([
  [
    {
      modifier: 'meh',
      scope: 'editorAction'
    },
    ['f', 'startFindReplaceAction']
  ],
  [
    { modifier: 'meh', scope: 'workbench.action' },
    ['t', 'showAllSymbols'],
    ['s', 'gotoSymbol']
  ],
  [
    {
      modifier: 'hyper',
      scope: 'workbench.action'
    },
    ['j', 'nextEditor'],
    ['k', 'previousEditor']
  ],
  [
    { when: 'listFocus && !inputFocus', scope: 'list' },
    ['h', 'collapse'],
    ['l', 'expand'],
    ['k', 'focusUp'],
    ['j', 'focusDown']
  ],
  [
    { scope: 'workbench.action', modifier: 'ctrl' },
    ['k', 'navigateUp'],
    ['j', 'navigateDown'],
    ['h', 'navigateLeft'],
    ['l', 'navigateRight']
  ],
  [
    {
      when: 'editorTextFocus && editorLangId == magit'
    },
    ['j', 'cursorDown'],
    ['k', 'cursorUp'],
    ['x', 'magit.discard-at-point'],
    ['tab', 'magit.toggle-fold']
  ],
  [
    {
      when: 'editorTextFocus && foldingEnabled',
      scope: 'editor'
    },
    ['hyper+/', 'foldAllBlockComments']
  ],
  [
    {
      when:
        'explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus'
    },
    ['c f', 'explorer.newFile'],
    ['c d', 'explorer.newFolder'],
    ['r', 'renameFile'],
    ['d', 'deleteFile']
  ]
]);
