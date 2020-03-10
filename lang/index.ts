/* eslint-disable no-unused-vars */
import { hasFile, findFiles } from '../lib';
import * as T from 'fp-ts/lib/Task';
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
import { constVoid } from 'fp-ts/lib/function';

const empty = {
  init: T.fromIO(constVoid)
};

const ps =
  hasFile('spago.dhall') || hasFile('psc-package.json') ? purescript : empty;
const rs = hasFile('Cargo.toml') ? rust : empty;

export {
  // c,
  css,
  dhall,
  // fsharp,
  // docker,
  markdown,
  haskell,
  org,
  // go,
  ps,
  nix,
  rs,
  shell,
  typescript
};
