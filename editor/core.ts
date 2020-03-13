import { usePackages, Init, andThenSet } from '../lib';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
    [
      'wmaurer.change-case',
      {
        keymap: [
          { scope: 'extension.changeCase', modifier: 'hyper' },
          ['c', 'commands']
        ]
      }
    ],
    'ypresto.vscode-intelli-refactor',
    // 'phyllisstein.collapse-then-reveal',
    'travisthieman.better-search',
    'voldikss.vscode-browser-completion',
    'yukai.map-replace-js',
    'bladnman.auto-align',
    'tyriar.sort-lines',
    'editorconfig.editorconfig',
    [
      'formulahendry.auto-close-tag',
      {
        config: {
          activationOnLanguage: [
            'xml',
            'php',
            'javascript',
            'javascriptreact',
            'typescriptreact',
            'plaintext',
            'markdown',
            'vue',
            'HTML (Eex)'
          ]
        }
      }
    ]
  ),
  andThenSet('search', {
    smartCase: true
  }),
  andThenSet(
    'editor.gotoLocation',
    pipe(
      [
        'Declarations',
        'Definitions',
        'Implementations',
        'References',
        'TypeDefinitions'
      ],
      A.reduce({}, (acc, key) => ({
        ...acc,
        [`multiple${key}`]: 'gotoAndPeek'
      }))
    )
  ),
  andThenSet('editor', {
    tabCompletion: 'onlySnippets'
  }),
  andThenSet('editor.suggest', {
    filterGraceful: true
  }),
  andThenSet('editor.parameterHints', {
    cycle: true
  })
);
