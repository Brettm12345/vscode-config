import { pipe } from 'fp-ts/lib/pipeable';
import * as T from 'fp-ts/lib/Task';

import { configSet, usePackages } from '../lib';

const inlineTypes = [
  'sokra.ts-inline-types',
  {
    scope: 'inline-types',
    config: {
      'features.functionParameterType': true,
      'features.parameterName': false,
      'darkThemeDecorationStyle.color': '#828bb8',
      'darkThemeDecorationStyle.opacity': 1
    }
  }
];

export const init = pipe(
  usePackages(
    'folke.vscode-monorepo-workspace',
    'salbert.comment-ts',
    'hookyqr.jsdoctagcomplete',
    'bierner.lit-html',
    'unional.vscode-sort-package-json',
    'vaibhavvishal.web-extension',
    'ldd-vs-code.better-package-json',
    'anish.voyager',
    'kisstkondoros.vscode-codemetrics',
    'thisismanta.package-watch',
    'richie5um2.vscode-sort-json',
    'jpoissonnier.vscode-styled-components',
    'silvenon.mdx',
    'ms-vscode.typescript-javascript-grammar',
    'develax.daddy-jest',
    'tlent.jest-snapshot-language-support',
    'rtbenfield.vscode-jest-test-adapter',
    'ms-vscode.vscode-typescript-next',
    'visualstudioexptteam.vscodeintellicode',
    'firefox-devtools.vscode-firefox-debug',
    'asvetliakov.snapshot-tools',
    [
      'dbaeumer.vscode-eslint',
      {
        scope: 'eslint',
        config: {
          alwaysShowStatus: false,
          packageManager: 'yarn',
          'linkTask.enable': true,
          run: 'onSave'
        }
      }
    ],
    [
      'orta.vscode-jest',
      {
        config: {
          autoEnable: false
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
    ],
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
  T.chain(() =>
    configSet('[typescript]', {
      'editor.defaultFormatter': 'esbenp.prettier-vscode'
    })
  ),
  T.chain(() =>
    configSet('typescript', {
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
    })
  )
);
