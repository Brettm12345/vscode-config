import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    'ionide.ionide-fsharp',
    'ionide.ionide-paket',
    'patcx.vscode-nuget-gallery',
    'formulahendry.dotnet-test-explorer'
  ),
  initWhenFiles('**/*.fs')
);
