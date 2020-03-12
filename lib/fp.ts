import * as T from 'fp-ts/lib/Task';
import { Task, task } from 'fp-ts/lib/Task';
import { array } from 'fp-ts/lib/Array';
import { flow, unsafeCoerce, constVoid } from 'fp-ts/lib/function';

export type Init = Task<void>;
export const noInit: Init = T.fromIO(constVoid);

const runAll: (xs: void[]) => void = unsafeCoerce;

export const flattenInit: (xs: Init[]) => Init = flow(
  array.sequence(task),
  T.map(runAll)
);
