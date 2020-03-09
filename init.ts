import * as A from 'fp-ts/lib/Array';
import * as T from 'fp-ts/lib/Task';
import * as R from 'fp-ts/lib/Record';
import { Task } from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';
import { ExtensionContext } from 'vscode';

import { initUsePackage, flattenTasks } from './lib';
import * as config from './config';
import * as editor from './editor';
import * as checkers from './checkers';
import * as lang from './lang';
import * as ui from './ui';
import * as tools from './tools';

interface Module {
  init: Task<void>;
}

const groups: Array<Record<string, Module>> = [
  ui,
  editor,
  lang,
  tools,
  checkers
];

export const init = (ctx: ExtensionContext) =>
  pipe(
    [pipe(ctx, initUsePackage, T.fromIO), config.init].concat(
      pipe(
        groups,
        A.map(
          flow(
            R.toArray,
            A.map(([_, a]) => a.init)
          )
        ),
        A.flatten
      )
    ),
    flattenTasks
  )();
