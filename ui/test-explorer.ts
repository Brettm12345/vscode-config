import { usePackages, Init } from '../lib';

export const init: Init = usePackages(
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
