import { usePackages, Init } from '../lib';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = usePackages(
  'mads-hartmann.bash-ide-vscode',
  'jeff-hykin.better-shellscript-syntax',
  'ryu1kn.edit-with-shell',
  'rogalmic.bash-debug',
  'timonwong.shellcheck',
  ['hangxingliu.vscode-awk-hint', { whenFiles: '**/*.awk' }],
  ['bmalehorn.vscode-fish', { whenFiles: '**/*.fish' }],
  [
    'foxundermoon.shell-format',
    {
      globalConfig: pipe(
        ['dotenv', 'shellscript'],
        A.reduce({}, (acc, key) => ({
          ...acc,
          [`[${key}]`]: {
            'editor.defaultFormatter': 'foxundermoon.shell-format'
          }
        }))
      )
    }
  ]
);
