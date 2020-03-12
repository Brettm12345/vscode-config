import * as T from 'fp-ts/lib/Task';
import { task } from 'fp-ts/lib/Task';
import { array } from 'fp-ts/lib/Array';
import { flow, unsafeCoerce } from 'fp-ts/lib/function';

import { Init } from './packages';

const runAll: (xs: void[]) => void = unsafeCoerce;

export const flattenInit: (xs: Init[]) => Init = flow(
  array.sequence(task),
  T.map(runAll)
);
