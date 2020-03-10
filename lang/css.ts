import { pipe } from 'fp-ts/lib/pipeable';

import { usePackages, andThenSet } from '../lib';

const stylusSupremacy = [
  'thisismanta.stylus-supremacy',
  {
    scope: 'stylusSupremacy',
    config: {
      insertColons: false,
      insertSemicolons: false,
      insertBraces: false,
      insertNewLineAroundImports: true,
      insertNewLineAroundBlocks: true,
      insertNewLineAroundProperties: false,
      insertNewLineAroundOthers: false,
      preserveNewLinesBetweenPropertyValues: true,
      insertSpaceBeforeComment: true,
      insertSpaceAfterComment: true,
      insertSpaceAfterComma: true,
      insertSpaceInsideParenthesis: false,
      insertParenthesisAfterNegation: false,
      insertParenthesisAroundIfCondition: true,
      insertNewLineBeforeElse: false,
      insertLeadingZeroBeforeFraction: true,
      selectorSeparator: ', ',
      newLineChar: '\n',
      quoteChar: "'",
      sortProperties: 'alphabetical',
      alwaysUseImport: true,
      alwaysUseNot: false,
      alwaysUseAtBlock: false,
      alwaysUseExtends: true,
      alwaysUseNoneOverZero: false,
      alwaysUseZeroWithoutUnit: false,
      reduceMarginAndPaddingValues: false,
      ignoreFiles: []
    }
  }
];

const fmt = {
  'editor.defaultFormatter': 'esbenp.prettier-vscode'
};
export const init = pipe(
  usePackages(
    'bradlc.vscode-tailwindcss',
    'mrmlnc.vscode-scss',
    'color-variable-replace.color-variable-replace',
    'mrmlnc.vscode-doiuse',
    'heybourn.headwind',
    'alan.stylus',
    'bradlc.vscode-tailwindcss',
    'kisstkondoros.csstriggers',
    'jpoissonnier.vscode-styled-components',
    'agauniyal.vscode-caniuse',
    'cpylua.language-postcss',
    'kisstkondoros.csstriggers',
    'mrmlnc.vscode-postcss-sorting',
    'nkzq.sass-variables-helper'
  ),
  andThenSet({
    '[postcss]': fmt,
    '[scss]': fmt
  })
);
