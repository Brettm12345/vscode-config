import { usePackage } from '../lib';

export const init = usePackage('alefragnani.project-manager', {
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
    'any.baseFolders': ['/home/brett/src/github.com/brettm12345/'],
    'git.baseFolders': ['/home/brett/src/github.com'],
    sortList: 'Recent',
    cacheProjectsBetweenSessions: false,
    showProjectNameInStatusBar: true
  }
});
