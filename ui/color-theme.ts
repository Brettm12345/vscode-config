import { pipe } from 'fp-ts/lib/pipeable';
import * as A from 'fp-ts/lib/Array';

import { usePackage, Init } from '../lib';

interface TextMateRule {
  name: string;
  scope: string[];
  settings: Record<string, string>;
}

interface ColorTheme<A> {
  '[Moonlight II]': A;
  '[Moonlight II Italic]': A;
}

interface TokenColorCustomizations {
  textMateRules: TextMateRule[];
}

const custom = <A extends Record<string, string> | TokenColorCustomizations>(
  a: A
): ColorTheme<A> => ({
  '[Moonlight II Italic]': a,
  '[Moonlight II]': a
});

export const init: Init = usePackage('atomiks.moonlight', {
  scope: 'workbench',
  globalConfig: {
    'editor.tokenColorCustomizations': custom({
      textMateRules: pipe<Array<[string, string[], string]>, TextMateRule[]>(
        [
          [
            'Nix attribute',
            ['entity.other.attribute-name.multipart.nix'],
            '#82aaff'
          ],
          ['Rust core type', ['storage.type.core.rust'], '#ff9966']
        ],
        A.map(([name, scope, foreground]) => ({
          name,
          scope,
          settings: {
            foreground
          }
        }))
      )
    })
  },
  config: {
    colorTheme: 'Moonlight II',
    colorCustomizations: custom({
      'activityBar.background': '#161a2a'
    })
  }
});
