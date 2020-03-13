import { usePackages, Init, initWhenFiles, andThenSet } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    'davidanson.vscode-markdownlint',
    'sycl.markdown-command-runner',
    'yzhang.markdown-all-in-one'
  ),
  andThenSet('markdown.preview', {
    linkify: true,
    fontFamily: 'Inter'
  }),
  initWhenFiles('**/*.md')
);
