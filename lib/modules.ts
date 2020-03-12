import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';
import * as A from 'fp-ts/lib/Array';
import { flow } from 'fp-ts/lib/function';

import { flattenInit } from './fp';
import { Init } from './packages';

interface Module {
  init: Init;
}
export const handleModules = (xs: Promise<Module>[]): Init =>
  pipe(
    () => Promise.all(xs),
    T.chain(
      flow(
        A.map(({ init }) => init),
        flattenInit
      )
    )
  );
