import { usePackage } from "../lib";

export const init = usePackage("alefragnani.project-manager", {
  config: {
    "any.baseFolders": ["/home/brett/src/github.com/brettm12345/"],
    "git.baseFolders": ["/home/brett/src/github.com"],
    sortList: "Recent",
    cacheProjectsBetweenSessions: false,
    showProjectNameInStatusBar: true
  },
  keymap: [
    {
      key: "ctrl+shift+alt+meta+p",
      command: "projectManager.listProjects"
    },
    {
      key: "ctrl+shift+alt+meta+f",
      command: "projectManager.addToFavorites"
    },
    {
      key: "ctrl+shift+alt+meta+i",
      command: "projectManager.refreshProjects"
    },
    {
      key: "ctrl+shift+alt+meta+a",
      command: "projectManager.addToWorkspace"
    }
  ]
});
