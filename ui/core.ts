import { pipe } from 'fp-ts/lib/pipeable';

import { configSet, andThenSet, useMorePackages } from '../lib';

const font = 'monospace';
export const init = pipe(
  configSet('editor', {
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: false,
    cursorStyle: 'line-thin',
    cursorSurroundingLines: 10,
    fontLigatures: true,
    fontFamily: font,
    fontSize: 11,
    fontWeight: '500',
    'hover.delay': 150,
    insertSpaces: true,
    lineHeight: 23,
    lineNumbers: 'relative',
    'minimap.enabled': true,
    'minimap.maxColumn': 400,
    'minimap.renderCharacters': false,
    'minimap.scale': 2,
    'minimap.showSlider': 'always',
    renderIndentGuides: true,
    renderLineHighlight: 'all',
    renderWhitespace: 'none',
    rulers: [80],
    showFoldingControls: 'mouseover',
    smoothScrolling: true,
    suggestFontSize: 12,
    suggestLineHeight: 22,
    suggestSelection: 'first'
  }),
  andThenSet('terminal.integrated', {
    cursorStyle: 'line',
    drawBoldTextInBrightColors: false,
    experimentalRefreshOnResume: true,
    fontFamily: font,
    fontSize: 10
  }),
  andThenSet('window', {
    menuBarVisibility: 'compact',
    titleBarStyle: 'native',
    zoomLevel: 3
  }),
  andThenSet('workbench', {
    'editor.showTabs': true,
    'list.automaticKeyboardNavigation': true,
    'list.horizontalScrolling': true,
    'sideBar.location': 'right',
    'tree.indent': 8
  }),
  useMorePackages(
    'kruemelkatze.vscode-dashboard',
    'fabiospampinato.vscode-statusbar-debugger',
    'amos402.scope-bar',
    'natqe.reload',
    'ibm.output-colorizer'
  )
);
