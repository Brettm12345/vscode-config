import { Init, handleModules } from '../lib';

export const init: Init = handleModules([
  import('./c'),
  import('./css'),
  import('./dhall'),
  import('./docker'),
  import('./markdown'),
  import('./haskell'),
  import('./org'),
  import('./go'),
  import('./purescript'),
  import('./nix'),
  import('./rust'),
  import('./shell'),
  import('./typescript')
]);
