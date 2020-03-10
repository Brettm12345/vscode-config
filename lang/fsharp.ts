import { usePackages, findFiles } from '../lib';
import * as T from 'fp-ts/lib/Task';
import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/pipeable';
import { constVoid } from 'fp-ts/lib/function';

export const init = pipe(
  findFiles('**/*.fs'),
  T.chain(
    B.fold(
      () =>
        usePackages(
          'ionide.ionide-fsharp',
          'ionide.ionide-paket',
          'patcx.vscode-nuget-gallery',
          'formulahendry.dotnet-test-explorer'
        ),
      () => T.fromIO(constVoid)
    )
  )
);
