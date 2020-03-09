import { usePackages } from '../lib';

export const init = usePackages(
  'serayuzgur.crates',
  'swellaby.vscode-rust-test-adapter',
  'bodil.prettier-toml',
  'belfz.search-crates-io',
  [
    'rust-lang.rust',
    {
      config: {
        cfg_test: false,
        all_features: false,
        clippy_preference: 'on',
        unstable_features: true
      }
    }
  ],
  [
    'matklad.rust-analyzer',
    {
      config: {
        displayInlineHints: false,
        highlightingOn: false,
        featureFlags: {
          'completion.insertion.add-call-parenthesis': true
        }
      }
    }
  ]
);
