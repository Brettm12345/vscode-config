import { usePackages } from '../lib';

export const init = usePackages(
  'wmaurer.change-case',
  'ypresto.vscode-intelli-refactor',
  'travisthieman.better-search',
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
