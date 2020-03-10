import { usePackages } from '../lib';

export const init = usePackages(
  [
    'hbenl.vscode-test-explorer',
    {
      scope: 'testExplorer',
      config: {
        mergeSuites: true,
        addToEditorContextMenu: true,
        showExpandButton: 0,
        showCollapseButton: false,
        sort: 'byLocation'
      },
      keymap: [
        {
          scope: 'test-explorer'
        },
        ['ctrl+c ctrl+l', 'show-log'],
        ['ctrl+c t', 'run-all']
      ]
    }
  ],
  'connorshea.vscode-test-explorer-status-bar'
);
