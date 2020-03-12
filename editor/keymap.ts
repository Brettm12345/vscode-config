import { keymaps, Init } from '../lib';

export const init: Init = keymaps([
  [
    {
      modifier: 'meh',
      scope: 'editor.action'
    },
    ['f', 'startFindReplaceAction']
  ],
  [
    { when: 'breadcrumbsActive && breadcrumbsVisible', scope: 'breadcrumbs' },
    ['l', 'focusNext'],
    ['h', 'focusPrevious'],
    ['j', 'selectFocused']
  ],
  [
    {
      modifier: 'ctrl',
      when:
        'inSearchEditor && inputBoxFocus || inputBoxFocus && searchViewletVisible',
      scope: 'search.focus'
    },
    ['j', 'nextInputBox'],
    ['k', 'previousInputBox']
  ],
  [
    { modifier: 'meh', scope: 'workbench.action' },
    ['t', 'showAllSymbols'],
    ['s', 'gotoSymbol']
  ],
  [{ modifier: 'meh', scope: 'extension' }, ['c', 'colorReplace']],
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
