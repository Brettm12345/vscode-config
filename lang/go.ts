import { usePackage, findFiles } from '../lib';
import * as T from 'fp-ts/lib/Task';
import * as B from 'fp-ts/lib/boolean';
import { pipe } from 'fp-ts/lib/pipeable';
import { constVoid } from 'fp-ts/lib/function';

export const init = pipe(
  findFiles('**/*.go'),
  T.chain(
    B.fold(
      () => usePackage('jeff-hykin.better-go-syntax'),
      () => T.fromIO(constVoid)
    )
  )
);
