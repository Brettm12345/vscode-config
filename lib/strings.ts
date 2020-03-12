import { reduce } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { Endomorphism } from 'fp-ts/lib/function';

type Replacement = [string | RegExp, string];

export const replaceAll = (
  ...replacements: Replacement[]
): Endomorphism<string> => str =>
  pipe(
    replacements,
    reduce(str, (s, r) => s.replace(...r))
  );
