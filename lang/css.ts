import { configSet, usePackages } from '../lib';
import * as T from 'fp-ts/lib/Task';
import { pipe } from 'fp-ts/lib/pipeable';

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
    'zignd.html-css-class-completion',
    'bradlc.vscode-tailwindcss',
    'kisstkondoros.csstriggers',
    'jpoissonnier.vscode-styled-components',
    'agauniyal.vscode-caniuse',
    'cpylua.language-postcss',
    'kisstkondoros.csstriggers',
    'mrmlnc.vscode-postcss-sorting',
    'nkzq.sass-variables-helper',
    [
      'thisismanta.stylus-supremacy',
      {
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
          tabStopChar: '\t',
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
    ]
  ),
  T.chain(() =>
    configSet({
      '[postcss]': fmt,
      '[scss]': fmt
    })
  )
);
