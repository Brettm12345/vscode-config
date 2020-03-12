import * as A from 'fp-ts/lib/Array';
import { Endomorphism, identity, constVoid } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { Extensions } from '../global';
import { pipe } from 'fp-ts/lib/pipeable';
import * as R from 'fp-ts/lib/Record';
import * as T from 'fp-ts/lib/Task';
import { Task } from 'fp-ts/lib/Task';
import { ExtensionContext, GlobPattern } from 'vscode';
import * as UP from 'vscode-use-package';

import { flattenInit } from './fp';
import { CommonArgs, handleKeybinding, Keybinding } from './keyboard';
import { initWhenFiles } from './vscode';

/**
 * Init Script
 */
export type Init = Task<void>;
export const noInit: Init = T.fromIO(constVoid);

interface PackageOptions<Config extends Dictionary>
  extends Omit<UP.UsePackageOptions, 'keymap'> {
  keymap?: [CommonArgs, ...Keybinding[]];
  config?: Config;
  whenFiles?: GlobPattern | GlobPattern[];
}

type Package<Config = {}> =
  | [keyof Extensions | string, PackageOptions<Config>]
  | string;

type Dictionary = Record<string, any>;

export const initUsePackage = (c: ExtensionContext): Init =>
  T.fromIO(() => UP.initUsePackage(c));

const handleOptions = <Config extends Dictionary>(
  opt: PackageOptions<Config>
): UP.UsePackageOptions => ({
  ...opt,
  keymap: pipe(
    O.fromNullable(opt.keymap),
    O.map(([common, ...keys]) => pipe(keys, A.map(handleKeybinding(common)))),
    O.toUndefined
  )
});

export const usePackage = <A extends keyof Extensions | string>(
  name: string,
  {
    whenFiles,
    ...options
  }: PackageOptions<A extends keyof Extensions ? Extensions[A] : {}> = {}
): Init =>
  pipe(
    () => UP.usePackage(name, handleOptions(options)),
    whenFiles
      ? initWhenFiles(...(Array.isArray(whenFiles) ? whenFiles : [whenFiles]))
      : identity
  );

export const usePackages = (...xs: Package[]): Init =>
  pipe(
    xs,
    A.map(x => (Array.isArray(x) ? usePackage(...x) : usePackage(x))),
    flattenInit
  );
export const useMorePackages = (...xs: Package[]): Endomorphism<Init> =>
  T.chain(() => usePackages(...xs));

export const configsSet = (config: Record<string, Dictionary>): Init =>
  pipe(
    R.toArray(config),
    A.map(x => () => UP.configSet(...x)),
    flattenInit
  );

export const configSet = (
  scope: string | Dictionary,
  options?: Dictionary
): Init => () => UP.configSet(scope, options);

export const andThenSet = (
  scope: string | Dictionary,
  options?: Dictionary
): Endomorphism<Init> => T.chain(() => configSet(scope, options));
