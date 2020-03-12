import * as A from 'fp-ts/lib/Array';
import * as T from 'fp-ts/lib/Task';
import * as O from 'fp-ts/lib/Option';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import * as UP from 'vscode-use-package';
import { ExtensionContext, GlobPattern } from 'vscode';

import { noInit, flattenInit, Init } from './fp';
import { handleKeybinding, CommonArgs, Keybinding } from './keyboard';
import { Endomorphism } from 'fp-ts/lib/function';
import { findFiles } from './vscode';

interface PackageOptions extends Omit<UP.UsePackageOptions, 'keymap'> {
  keymap?: [CommonArgs, ...Keybinding[]];
  ifFiles?: GlobPattern;
}

type Package = [string, PackageOptions] | string;

type Dictionary = Record<string, any>;

export const initUsePackage = (c: ExtensionContext): Init =>
  T.fromIO(() => UP.initUsePackage(c));

const handleOptions = (opt: PackageOptions): UP.UsePackageOptions => ({
  ...opt,
  keymap: pipe(
    O.fromNullable(opt.keymap),
    O.map(([common, ...keys]) => pipe(keys, A.map(handleKeybinding(common)))),
    O.toUndefined
  )
});

export const usePackage = (
  name: string,
  { ifFiles, ...options }: PackageOptions = {}
): Init =>
  pipe(
    ifFiles ? findFiles(ifFiles) : T.of(true),
    T.chain(hasFiles =>
      hasFiles ? () => UP.usePackage(name, handleOptions(options)) : noInit
    )
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
