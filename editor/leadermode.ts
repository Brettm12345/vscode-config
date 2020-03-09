import { usePackage } from '../lib/usePackage';

export const init = usePackage('michaelgriscom.leadermode', {
  config: {
    showKeyGuide: 'always',
    keybindings: [
      {
        keySequence: ['e'],
        label: 'Editor'
      },
      {
        keySequence: ['e', 'd'],
        command: 'workbench.action.splitEditorDown',
        label: 'Split down'
      },
      {
        keySequence: ['e', 'e'],
        label: 'Show all editors',
        command: 'workbench.action.showAllEditors'
      },
      {
        keySequence: ['e', 'l'],
        command: 'workbench.action.splitEditorLeft',
        label: 'Split left'
      },
      {
        keySequence: ['e', 'm'],
        command: 'workbench.action.evenEditorWidths',
        label: 'Even-out editors'
      },
      {
        keySequence: ['e', 'M'],
        command: 'workbench.action.maximizeEditor',
        label: 'Maximize editor'
      },
      {
        keySequence: ['e', 'q'],
        label: 'Close active editor',
        command: 'workbench.action.closeActiveEditor'
      },
      {
        keySequence: ['e', 'r'],
        command: 'workbench.action.splitEditor',
        label: 'Split right'
      },
      {
        keySequence: ['e', 'u'],
        command: 'workbench.action.splitEditorUp',
        label: 'Split up'
      },
      {
        keySequence: ['f'],
        label: 'File/Folder'
      },
      {
        keySequence: ['f', 'c'],
        label: 'Copy file path',
        command: 'workbench.action.files.copyPathOfActiveFile'
      },
      {
        keySequence: ['f', 'n'],
        label: 'New file',
        command: 'workbench.action.files.newUntitledFile'
      },
      {
        keySequence: ['f', 'o'],
        label: 'Open file',
        command: 'workbench.action.files.openFile'
      },
      {
        keySequence: ['f', 'O'],
        label: 'Open folder',
        command: 'workbench.action.files.openFolder'
      },
      {
        keySequence: ['f', 'r'],
        label: 'Reveal file in OS',
        command: 'revealFileInOS'
      },
      {
        keySequence: ['f', 's'],
        label: 'Save file',
        command: 'workbench.action.files.save'
      },
      {
        keySequence: ['f', 'S'],
        label: 'Save all files',
        command: 'workbench.action.files.saveAll'
      },
      {
        keySequence: ['g'],
        label: 'Git'
      },
      {
        keySequence: ['g', 'b'],
        label: 'Checkout',
        command: 'git.checkout'
      },
      {
        keySequence: ['g', 'c'],
        label: 'Commit',
        command: 'git.commit'
      },
      {
        keySequence: ['g', 'd'],
        label: 'Delete branch',
        command: 'git.deleteBranch'
      },
      {
        keySequence: ['g', 'f'],
        label: 'Fetch',
        command: 'git.fetch'
      },
      {
        keySequence: ['g', 'i'],
        label: 'Init',
        command: 'git.init'
      },
      {
        keySequence: ['g', 'm'],
        label: 'Merge',
        command: 'git.merge'
      },
      {
        keySequence: ['g', 'p'],
        label: 'Pull',
        command: 'git.pull'
      },
      {
        keySequence: ['g', 's'],
        label: 'Show Git View',
        command: 'workbench.view.scm'
      },
      {
        keySequence: ['g', 'S'],
        label: 'Stage',
        command: 'git.stage'
      },
      {
        keySequence: ['g', 'U'],
        label: 'Unstage',
        command: 'git.unstage'
      },
      {
        keySequence: ['j'],
        label: 'Jump'
      },
      {
        keySequence: ['j', 'd'],
        label: 'Definition',
        command: 'editor.action.goToDeclaration'
      },
      {
        keySequence: ['j', 'D'],
        label: 'Peek Definition',
        command: 'editor.action.previewDeclaration'
      },
      {
        keySequence: ['j', 'e'],
        label: 'Next Error',
        command: 'editor.action.marker.nextInFiles'
      },
      {
        keySequence: ['j', 'i'],
        label: 'Implementation',
        command: 'editor.action.goToImplementation'
      },
      {
        keySequence: ['j', 'I'],
        label: 'Peek Implementation',
        command: 'editor.action.peekImplementation'
      },
      {
        keySequence: ['j', 'l'],
        label: 'Line',
        command: 'workbench.action.gotoLine'
      },
      {
        keySequence: ['j', 'r'],
        label: 'References',
        command: 'editor.action.referenceSearch.trigger'
      },
      {
        keySequence: ['j', 's'],
        label: 'Symbol in file',
        command: 'workbench.action.gotoSymbol'
      },
      {
        keySequence: ['j', 'S'],
        label: 'Symbol in workspace',
        command: 'workbench.action.showAllSymbols'
      },
      {
        keySequence: ['k'],
        label: 'Text'
      },
      {
        keySequence: ['k', 'c'],
        label: 'Toggle comment lines',
        command: 'editor.action.commentLine'
      },
      {
        keySequence: ['k', 'C'],
        label: 'Toggle block comment',
        command: 'editor.action.blockComment'
      },
      {
        keySequence: ['k', 's'],
        label: 'Sort lines',
        command: 'editor.action.sortLinesAscending'
      },
      {
        keySequence: ['k', 'w'],
        label: 'Delete whitespace',
        command: 'editor.action.trimTrailingWhitespace'
      },
      {
        keySequence: ['r'],
        label: 'Refactor'
      },
      {
        keySequence: ['r', 'i'],
        label: 'Organize imports',
        command: 'editor.action.organizeImports'
      },
      {
        keySequence: ['r', 'r'],
        label: 'Rename',
        command: 'editor.action.rename'
      },
      {
        keySequence: ['s'],
        label: 'Settings'
      },
      {
        keySequence: ['s', 's'],
        label: 'Settings file',
        command: 'workbench.action.openGlobalSettings'
      },
      {
        keySequence: ['s', 'S'],
        label: 'Settings file',
        command: 'workbench.action.openWorkspaceSettings'
      },
      {
        keySequence: ['s', 'k'],
        label: 'Keybindings',
        command: 'workbench.action.openGlobalKeybindings'
      },
      {
        keySequence: ['s', 't'],
        label: 'Theme',
        command: 'workbench.action.selectTheme'
      },
      {
        keySequence: ['t'],
        label: 'Toggle'
      },
      {
        keySequence: ['t', 'a'],
        label: 'Activity bar',
        command: 'workbench.action.toggleActivityBarVisibility'
      },
      {
        keySequence: ['t', 'd'],
        label: 'Developer tools',
        command: 'workbench.action.toggleDevTools'
      },
      {
        keySequence: ['t', 'm'],
        label: 'Menu bar',
        command: 'workbench.action.toggleMenuBar'
      },
      {
        keySequence: ['t', 'n'],
        label: 'Minimap',
        command: 'editor.action.toggleMinimap'
      },
      {
        keySequence: ['t', 'p'],
        label: 'Panel',
        command: 'workbench.action.togglePanel'
      },
      {
        keySequence: ['t', 's'],
        label: 'Sidebar',
        command: 'workbench.action.toggleSidebarVisibility'
      },
      {
        keySequence: ['t', 't'],
        label: 'Tabs',
        command: 'workbench.action.toggleTabsVisibility'
      },
      {
        keySequence: ['t', 'u'],
        label: 'Statusbar',
        command: 'workbench.action.toggleStatusbarVisibility'
      },
      {
        keySequence: ['t', 'w'],
        label: 'Render whitespace',
        command: 'editor.action.toggleRenderWhitespace'
      },
      {
        keySequence: ['t', 'z'],
        label: 'Zen mode',
        command: 'workbench.action.toggleZenMode'
      },
      {
        keySequence: ['w'],
        label: 'Window'
      },
      {
        keySequence: ['w', 'n'],
        label: 'New Window',
        command: 'workbench.action.newWindow'
      },
      {
        keySequence: ['w', 'q'],
        label: 'Close Window',
        command: 'workbench.action.closeWindow'
      },
      {
        keySequence: ['w', 'r'],
        label: 'Reload',
        command: 'workbench.action.reloadWindow'
      },
      {
        keySequence: ['w', 's'],
        label: 'Switch Window',
        command: 'workbench.action.quickSwitch'
      },
      {
        keySequence: ['w', 'S'],
        label: 'Switch Window',
        command: 'workbench.action.switchWindow'
      }
    ]
  },
  keymap: [
    {
      key: 'ctrl+shift+alt+meta+l',
      command: 'leadermode.enter',
      when: 'editorTextFocus'
    }
  ]
});
