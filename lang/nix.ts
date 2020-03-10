import { usePackages, findFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as B from 'fp-ts/lib/boolean';
import { constVoid } from 'fp-ts/lib/function';

export const init = pipe(
  findFiles('**/*.nix'),
  T.chain(
    B.fold(
      () =>
        usePackages(
          'bbenoist.nix',
          'brettm12345.nixfmt-vscode',
          'arrterian.nix-env-selector'
        ),
      () => T.fromIO(constVoid)
    )
  )
);
