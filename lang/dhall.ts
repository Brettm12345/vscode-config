import { usePackages, Init, whenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages('panaeon.dhall-lang', 'panaeon.vscode-dhall-lsp-server'),
  whenFiles('**/*.ps')
);
