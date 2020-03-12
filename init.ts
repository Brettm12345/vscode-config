import * as A from 'fp-ts/lib/Array';
import * as R from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import { flow } from 'fp-ts/lib/function';
import { ExtensionContext } from 'vscode';

import { initUsePackage, flattenInit, Init } from './lib';
import * as config from './config';
import * as editor from './editor';
import * as checkers from './checkers';
import * as lang from './lang';
import * as ui from './ui';
import * as tools from './tools';

interface Module {
  init: Init;
}

const groups: Array<Record<string, Module>> = [
  ui,
  editor,
  lang,
  tools,
  checkers
];

export const init = (ctx: ExtensionContext): Promise<void> =>
  flattenInit([
    initUsePackage(ctx),
    config.init,
    ...pipe(
      groups,
      A.chain(
        flow(
          R.toArray,
          A.map(a => a[1].init)
        )
      )
    )
  ])();
