import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages('panaeon.dhall-lang', 'panaeon.vscode-dhall-lsp-server'),
  initWhenFiles('**/*.dhall', '**/*.ps')
);
