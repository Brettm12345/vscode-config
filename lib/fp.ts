import * as T from 'fp-ts/lib/Task';
import { Task, task } from 'fp-ts/lib/Task';
import { array } from 'fp-ts/lib/Array';
import { flow, unsafeCoerce } from 'fp-ts/lib/function';

const runAll: (a: void[]) => void = unsafeCoerce;

export const flattenTasks: (a: Task<void>[]) => Task<void> = flow(
  array.sequence(task),
  T.map(runAll)
);
