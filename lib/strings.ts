import { reduce } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

type Replacement = [string | RegExp, string];

export const replaceAll = (...replacements: Replacement[]) => (
  str: string
): string =>
  pipe(
    replacements,
    reduce(str, (s, r) => s.replace(...r))
  );
