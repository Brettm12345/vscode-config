import { pipe } from 'fp-ts/lib/pipeable';

import {
  usePackages,
  useMorePackages,
  andThenSet,
  Init,
  initWhenFiles
} from '../lib';

// Inline types unfortunately slows down vscode significantly
// const inlineTypes = [
//   'sokra.ts-inline-types',
//   {
//     scope: 'inline-types',
//     config: {
//       'features.functionParameterType': true,
//       'features.parameterName': false,
//       'darkThemeDecorationStyle.color': '#828bb8',
//       'darkThemeDecorationStyle.opacity': 1
//     }
//   }
// ];

export const init: Init = pipe(
  usePackages(
    'folke.vscode-monorepo-workspace',
    'salbert.comment-ts',
    'hookyqr.jsdoctagcomplete',
    'ipatalas.vscode-postfix-ts',
    'bierner.lit-html',
    'unional.vscode-sort-package-json',
    'vaibhavvishal.web-extension',
    'dannymcgee.ts-grammar-extended',
    'ldd-vs-code.better-package-json',
    'anish.voyager',
    'kisstkondoros.vscode-codemetrics',
    'thisismanta.package-watch',
    'richie5um2.vscode-sort-json',
    'jpoissonnier.vscode-styled-components',
    'silvenon.mdx',
    'ms-vscode.typescript-javascript-grammar',
    'ms-vscode.vscode-typescript-next',
    'visualstudioexptteam.vscodeintellicode',
    'mariusschulz.yarn-lock-syntax',
    'firefox-devtools.vscode-firefox-debug',
    [
      'mike-co.import-sorter',
      {
        scope: 'importSorter',
        config: {
          'sortConfiguration.removeUnusedImports': false,
          'importStringConfiguration.hasSemicolon': false,
          'importStringConfiguration.tabSize': 2,
          'sortConfiguration.importMembers.order': 'lowercaseLast',
          'sortConfiguration.importPaths.order': 'lowercaseLast',
          'generalConfiguration.sortOnBeforeSave': false,
          'importStringConfiguration.maximumNumberOfImportExpressionsPerLine.count': 60,
          'importStringConfiguration.maximumNumberOfImportExpressionsPerLine.type':
            'newLineEachExpressionAfterCountLimitExceptIfOnlyOne'
        }
      }
    ]
  ),
  // Feature: Linting
  useMorePackages(
    [
      'dbaeumer.vscode-eslint',
      {
        scope: 'eslint',
        config: {
          alwaysShowStatus: false,
          packageManager: 'yarn',
          'lintTask.enable': true,
          run: 'onSave'
        }
      }
    ],
    [
      'wix.vscode-import-cost',
      {
        scope: 'importCost',
        config: {
          showCalculatingDecoration: true,
          largePackageColor: '#ff5370',
          mediumPackageColor: '#FF966C',
          smallPackageColor: '#c3e88d'
        }
      }
    ]
  ),
  // Feature: Testing
  useMorePackages(
    [
      'orta.vscode-jest',
      {
        scope: 'jest',
        config: {
          autoEnable: false
        }
      }
    ],
    'develax.daddy-jest',
    'tlent.jest-snapshot-language-support',
    'rtbenfield.vscode-jest-test-adapter',
    'asvetliakov.snapshot-tools',
    'esbenp.prettier-vscode'
  ),
  andThenSet({
    '[typescript]': {
      'editor.defaultFormatter': 'esbenp.prettier-vscode'
    }
  }),
  andThenSet('typescript', {
    'format.enable': false,
    'format.insertSpaceAfterFunctionKeywordForAnonymousFunctions': false,
    'format.insertSpaceAfterTypeAssertion': true,
    'format.insertSpaceBeforeAndAfterBinaryOperators': false,
    'preferences.quoteStyle': 'single',
    'suggest.completeFunctionCalls': true,
    'surveys.enabled': false,
    'tsserver.log': 'normal',
    'tsserver.trace': 'messages',
    'updateImportsOnFileMove.enabled': 'always'
  }),
  initWhenFiles('**/*.ts', '**/*.js', 'package.json')
);
