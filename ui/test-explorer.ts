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
      }
    }
  ],
  'connorshea.vscode-test-explorer-status-bar'
);
