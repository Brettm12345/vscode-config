import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages('henriiik.docker-linter', 'jeff-hykin.better-dockerfile-syntax'),
  initWhenFiles('**/Dockerfile')
);
