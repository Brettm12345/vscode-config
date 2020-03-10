import * as A from 'fp-ts/lib/Array';
import * as T from 'fp-ts/lib/Task';
import * as O from 'fp-ts/lib/Option';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { IO } from 'fp-ts/lib/IO';
import { Task } from 'fp-ts/lib/Task';
import * as UP from 'vscode-use-package';
import { ExtensionContext } from 'vscode';

import { flattenTasks } from './fp';
import { handleKeybinding, CommonArgs, Keybinding } from './keyboard';

interface PackageOptions extends Omit<UP.UsePackageOptions, 'keymap'> {
  keymap?: [CommonArgs, ...Keybinding[]];
}

type Package = [string, PackageOptions] | string;

type Dictionary = Record<string, any>;

export const initUsePackage = (c: ExtensionContext): IO<void> => () =>
  UP.initUsePackage(c);

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
  options: PackageOptions = {}
): Task<void> => () => UP.usePackage(name, handleOptions(options));

export const usePackages = (...xs: Package[]): Task<void> =>
  pipe(
    xs,
    A.map(x => (Array.isArray(x) ? usePackage(...x) : usePackage(x))),
    flattenTasks
  );
export const useMorePackages = (...xs: Package[]) =>
  T.chain(() => usePackages(...xs));

export const configsSet = (config: Record<string, Dictionary>): Task<void> =>
  pipe(
    R.toArray(config),
    A.map(x => () => UP.configSet(...x)),
    flattenTasks
  );

export const configSet = (
  scope: string | Dictionary,
  options?: Dictionary
): Task<void> => () => UP.configSet(scope, options);

export const andThenSet = (scope: string | Dictionary, options?: Dictionary) =>
  T.chain(() => configSet(scope, options));
