import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    'justusadam.language-haskell',
    'alanz.vscode-hie-server',
    'jcanero.hoogle-vscode'
  ),
  initWhenFiles('**/*.hs')
);
