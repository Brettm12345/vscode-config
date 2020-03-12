import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    'bbenoist.nix',
    'brettm12345.nixfmt-vscode',
    'arrterian.nix-env-selector'
  ),
  initWhenFiles('**/*.nix')
);
