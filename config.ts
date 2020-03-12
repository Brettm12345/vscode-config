import { configSet, andThenSet, Init } from './lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
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
  andThenSet('explorer', {
    confirmDelete: false,
    confirmDragAndDrop: false
  }),
  andThenSet('files', {
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
  }),
  andThenSet('search', {
    exclude: {
      '**/.history': true,
      '**/bower_components': true,
      '**/node_modules': true
    }
  })
);
