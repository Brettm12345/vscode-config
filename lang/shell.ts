import { usePackages, Init } from '../lib';
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
        {
          'editor.defaultFormatter': 'foxundermoon.shell-format'
        },
        fmt => ({
          '[dotenv]': fmt,
          '[shellscript]': fmt
        })
      )
    }
  ]
);
