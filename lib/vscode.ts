import { workspace, WorkspaceFolder, Uri, GlobPattern } from 'vscode';
import * as p from 'path';
import { existsSync } from 'fs-extra';
import * as B from 'fp-ts/lib/boolean';
import * as T from 'fp-ts/lib/Task';
import * as NEA from 'fp-ts/lib/NonEmptyArray';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { constFalse, flow, Endomorphism } from 'fp-ts/lib/function';
import { Task } from 'fp-ts/lib/Task';
import { noInit, Init } from './fp';

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

export const whenFiles = (files: GlobPattern): Endomorphism<Init> => (
  f: Init
): Init =>
  pipe(
    findFiles(files),
    T.chain(
      B.fold(
        () => noInit,
        () => f
      )
    )
  );
