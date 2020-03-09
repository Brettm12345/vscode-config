/* eslint-disable no-unused-vars */
import { hasFile } from '../lib';
import * as c from './c';
import * as css from './css';
import * as dhall from './dhall';
import * as fsharp from './fsharp';
import * as docker from './docker';
import * as markdown from './markdown';
import * as haskell from './haskell';
import * as org from './org';
import * as go from './go';
import * as purescript from './purescript';
import * as nix from './nix';
import * as rust from './rust';
import * as shell from './shell';
import * as typescript from './typescript';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const empty = { init: async () => {} };
const ps =
  hasFile('spago.dhall') || hasFile('psc-package.json') ? purescript : empty;
const ts = hasFile('package.json') ? typescript : empty;
const rs = hasFile('Cargo.toml') ? rust : empty;

export {
  // c,
  css,
  dhall,
  fsharp,
  // docker,
  markdown,
  haskell,
  org,
  // go,
  ps,
  nix,
  rs,
  shell,
  ts
};
