import * as UP from 'vscode-use-package';
import { IO } from 'fp-ts/lib/IO';
import * as A from 'fp-ts/lib/Array';
import { ExtensionContext } from 'vscode';
import * as R from 'fp-ts/lib/Record';
import { Task } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';

import { flattenTasks } from './fp';

type Package = [string, UP.UsePackageOptions] | string;

type Dictionary = Record<string, any>;

export const initUsePackage = (c: ExtensionContext): IO<void> => () =>
  UP.initUsePackage(c);

export const usePackage = (
  name: string,
  options: UP.UsePackageOptions = {}
): Task<void> => () => UP.usePackage(name, options);

export const usePackages = (...xs: Package[]): Task<void> =>
  pipe(
    xs,
    A.map(x => (Array.isArray(x) ? usePackage(...x) : usePackage(x))),
    flattenTasks
  );

export const configsSet = (config: Record<string, Dictionary>): Task<void> =>
  pipe(
    R.toArray(config),
    A.map(([scope, options]) => () => UP.configSet(scope, options)),
    flattenTasks
  );

export const configSet = (
  scope: string | Dictionary,
  options?: Dictionary
): Task<void> => () => UP.configSet(scope, options);
