import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';

import { Init, usePackages } from '../lib';

type Field =
  | 'rgb'
  | 'hsl'
  | 'css-color-name'
  | 'hsv'
  | 'lab'
  | 'cmyk'
  | 'hex'
  | 'alpha'
  | 'preview'
  | 'preview-xl'
  | 'preview-square-xl';
type ColorInfoColors =
  | 'css'
  | 'hex'
  | 'hex+alpha'
  | 'rgb'
  | 'hsl'
  | 'css-color-names';
interface ColorInfoLanguage {
  selector: string;
  colors: ColorInfoColors;
}

interface ColorInfoConfig {
  languages?: ColorInfoLanguage[];
  excludedFields?: Field[];
  fields?: Field[];
}

const colorInfoLanguages: [string, ColorInfoColors][] = [
  ['html', 'css'],
  ['css', 'css'],
  ['sass', 'css'],
  ['scss', 'css'],
  ['less', 'css'],
  ['stylus', 'css'],
  ['json', 'css'],
  ['yaml', 'css'],
  ['typescript', 'css'],
  ['javascript', 'css'],
];
const colorInfoConfig: ColorInfoConfig = {
  languages: pipe(
    colorInfoLanguages,
    A.map(([selector, colors]) => ({ selector, colors }))
  ),
};

export const init: Init = usePackages(
  [
    'bierner.color-info',
    {
      config: colorInfoConfig,
      scope: 'colorInfo',
    },
  ],
  [
    'royaction.color-manager',
    {
      config: {
        languages: [
          'css',
          'html',
          'javascript',
          'typescript',
          'json',
          'scss',
          'sass',
          'postcss',
          'yaml',
          'stylus',
        ],
      },
    },
  ],
  'naumovs.color-highlight'
);
