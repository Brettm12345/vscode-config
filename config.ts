import { configSet } from './lib';
import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';

export const init = pipe(
  configSet('editor', {
    accessibilitySupport: 'off',
    autoClosingQuotes: 'always',
    formatOnPaste: true,
    formatOnSave: true,
    formatOnType: true,
    mouseWheelScrollSensitivity: 3,
    mouseWheelZoom: true,
    multiCursorModifier: 'ctrlCmd',
    tabSize: 2
  }),
  T.chain(() =>
    configSet('explorer', {
      confirmDelete: false,
      confirmDragAndDrop: false
    })
  ),
  T.chain(() =>
    configSet('files', {
      autoSave: 'off',
      exclude: {
        '**/.DS_Store': true,
        '**/.git': true,
        '**/.hg': true,
        '**/.history': true,
        '**/.svn': true,
        '**/CVS': true,
        '**/node_modules': true
      },
      trimTrailingWhitespace: true
    })
  ),
  T.chain(() =>
    configSet('search', {
      '**/.history': true,
      '**/bower_components': true,
      '**/node_modules': true
    })
  )
);
