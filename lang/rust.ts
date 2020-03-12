import { usePackages, Init, initWhenFiles } from '../lib';
import { pipe } from 'fp-ts/lib/pipeable';

export const init: Init = pipe(
  usePackages(
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
  ),
  initWhenFiles('**/*.rs', 'Cargo.toml')
);
