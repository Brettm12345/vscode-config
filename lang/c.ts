import { usePackages, Init, whenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages('ccls-project.ccls', 'jeff-hykin.better-c-syntax'),
  whenFiles('**/*.c')
);
