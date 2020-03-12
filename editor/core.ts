import { usePackages, Init } from '../lib';

export const init: Init = usePackages(
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
);
