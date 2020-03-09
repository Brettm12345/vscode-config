import { usePackages } from "../lib";

export const init = usePackages(
  [
    "hbenl.vscode-test-explorer",
    {
      scope: "testExplorer",
      config: {
        mergeSuites: true,
        addToEditorContextMenu: true,
        showExpandButton: 0,
        showCollapseButton: false,
        sort: "byLocation"
      },
      keymap: [
        {
          key: "ctrl+c ctrl+l",
          command: "test-explorer.show-log"
        },
        {
          key: "ctrl+c t",
          command: "test-explorer.run-all"
        }
      ]
    }
  ],
  "connorshea.vscode-test-explorer-status-bar"
);
