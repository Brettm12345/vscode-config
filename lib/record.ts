import * as R from 'fp-ts/lib/Record';
import * as A from 'fp-ts/lib/Array';
import { getLastSemigroup } from 'fp-ts/lib/Semigroup';

export const prefixKeys = <A extends string, B>(prefix: string) => (
  rec: Record<A, B>
): Record<string, B> =>
  R.fromFoldableMap(getLastSemigroup<B>(), A.array)(
    R.toArray(rec),
    ([k, v]) => [`${prefix}${k}`, v]
  );

export const withPrefix = <A extends string, B>(
  prefix: string,
  r: Record<A, B>
): Record<string, B> => prefixKeys<A, B>(prefix)(r);
