import { keymaps } from '../lib';

export const init = keymaps([
  [
    {
      modifier: 'meh',
      scope: 'editor.action'
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
    ['k', 'nextEditor'],
    ['j', 'previousEditor']
  ],
  [
    { when: 'listFocus && !inputFocus', scope: 'list' },
    ['h', 'collapse'],
    ['j', 'focusDown'],
    ['k', 'focusUp'],
    ['l', 'expand']
  ],
  [
    { scope: 'workbench.action', modifier: 'ctrl' },
    ['h', 'navigateLeft'],
    ['j', 'navigateDown'],
    ['k', 'navigateUp'],
    ['l', 'navigateRight']
  ],
  [
    {
      when: 'editorTextFocus && foldingEnabled',
      scope: 'editor',
      modifier: 'hyper'
    },
    ['/', 'foldAllBlockComments'],
    ['space', 'toggleFold']
  ],
  [
    {
      when:
        'explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus'
    },
    ['c f', 'explorer.newFile'],
    ['c d', 'explorer.newFolder'],
    ['d', 'deleteFile'],
    ['r', 'renameFile']
  ]
]);
