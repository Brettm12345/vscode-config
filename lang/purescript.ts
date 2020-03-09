import { usePackage } from '../lib';

export const init = usePackage('nwolverson.ide-purescript', {
  config: {
    addSpagoSources: true,
    editorMode: true,
    buildCommand: 'spago build --purs-args --json-errors',
    polling: true,
    addNpmPath: true,
    pscIdeServerExe: 'purs ide server'
  }
});
