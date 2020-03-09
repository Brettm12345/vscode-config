import { workspace, WorkspaceFolder } from 'vscode';
import * as p from 'path';
import { existsSync } from 'fs-extra';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { constFalse } from 'fp-ts/lib/function';

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
