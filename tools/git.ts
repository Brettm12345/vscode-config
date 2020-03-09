import { usePackages } from '../lib';

export const init = usePackages(
  'knisterpeter.vscode-github',
  'github.vscode-pull-request-github',
  'fabiospampinato.vscode-open-in-github',
  'lamartire.git-indicators',
  'qezhu.gitlink',
  'vsls-contrib.gistfs',
  'me-dutour-mathieu.vscode-github-actions',
  'davidedmiston.bettergitcommits',
  'kahole.magit',
  'howardzuo.vscode-gitk',
  [
    'eamodio.gitlens',
    {
      config: {
        'currentLine.enabled': false,
        'statusBar.reduceFlicker': true,
        'views.repositories.location': 'scm',
        'views.fileHistory.location': 'scm',
        'views.lineHistory.location': 'scm',
        'views.compare.location': 'scm',
        'views.search.location': 'scm'
      }
    }
  ]
);
