import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    'davidanson.vscode-markdownlint',
    'sycl.markdown-command-runner',
    'yzhang.markdown-all-in-one'
  ),
  initWhenFiles('**/*.md')
);
