import { workspace, WorkspaceFolder, Uri, GlobPattern } from 'vscode';
import * as p from 'path';
import { existsSync } from 'fs-extra';
import * as B from 'fp-ts/lib/boolean';
import * as T from 'fp-ts/lib/Task';
import * as NEA from 'fp-ts/lib/NonEmptyArray';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { constFalse, flow, Endomorphism, constant } from 'fp-ts/lib/function';
import { Task } from 'fp-ts/lib/Task';

import { noInit, Init } from './packages';

/**
 * Returns true if vscode contains a file in its workspace root
 */
export const hasFile = (name: string): boolean =>
  pipe(
    workspace.workspaceFolders,
    O.fromNullable,
    O.map(
      A.reduce<WorkspaceFolder, boolean>(
        false,
        (prev, workspaceFolder) =>
          prev || existsSync(p.join(workspaceFolder.uri.fsPath, name))
      )
    ),
    O.getOrElse(constFalse)
  );

const findFilesAync = (
  ...args: Parameters<typeof workspace.findFiles>
): Promise<Uri[]> =>
  new Promise((resolve, reject) => {
    try {
      workspace.findFiles(...args).then(resolve);
    } catch (error) {
      reject(error);
    }
  });

export const findFiles = (
  ...args: Parameters<typeof workspace.findFiles>
): Task<boolean> =>
  pipe(() => findFilesAync(...args), T.map(flow(NEA.fromArray, O.isSome)));

export const hasAny = (files?: GlobPattern[]): Task<boolean> =>
  pipe(
    O.fromNullable(files),
    O.fold(
      constant(T.of(true)),
      flow(
        A.map(findFiles),
        A.array.sequence(T.task),
        T.map(A.reduce(false as boolean, (a, b) => a || b))
      )
    )
  );

export const initWhen = (fa: Task<boolean>): Endomorphism<Init> => f =>
  T.task.chain(
    fa,
    B.fold(
      () => noInit,
      () => f
    )
  );

export const initWhenFiles = (...xs: GlobPattern[]) =>
  pipe(xs, hasAny, initWhen);
