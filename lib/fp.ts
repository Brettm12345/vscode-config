import { Task, task } from 'fp-ts/lib/Task';
import { array } from 'fp-ts/lib/Array';
import { flow, unsafeCoerce } from 'fp-ts/lib/function';

export const flattenTasks: (
  a: Task<void>[]
) => Task<void> = flow(array.sequence(task), a => unsafeCoerce(a));
