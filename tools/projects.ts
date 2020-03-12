import { usePackage, Init } from '../lib';

export const init: Init = usePackage('alefragnani.project-manager', {
  scope: 'projectManager',
  keymap: [
    {
      scope: 'projectManager',
      modifier: 'hyper'
    },
    ['p', 'listProjects'],
    ['f', 'addToFavorites'],
    ['i', 'refreshProjects'],
    ['a', 'addToWorkspace']
  ],
  config: {
    'git.baseFolders': ['/home/brett/src'],
    'git.maxDepthRecursion': 3,
    groupList: true,
    sortList: 'Recent',
    cacheProjectsBetweenSessions: false,
    showProjectNameInStatusBar: true
  }
});
