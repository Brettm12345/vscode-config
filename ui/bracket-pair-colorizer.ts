import { usePackage, Init } from '../lib';
import { toArray as entries } from 'fp-ts/lib/Record';
import { pipe } from 'fp-ts/lib/pipeable';
import * as A from 'fp-ts/lib/Array';

export const init: Init = usePackage('coenraads.bracket-pair-colorizer-2', {
  config: {
    colors: [
      '#82AAFF',
      '#73daca',
      '#ff98a4',
      '#c3a2ff',
      '#ff757f',
      '#0ec3e3',
      '#f7a4ec',
      '#ffc777',
      '#C3E88D'
    ],
    scopeLineCSS: pipe(
      {
        borderStyle: 'solid',
        borderWidth: '0.5px',
        borderColor: '{color}',
        opacity: 0.8
      },
      entries,
      A.map(([k, v]) => `${k}: ${v}`)
    ),
    showBracketsInGutter: true,
    showBracketsInRuler: true,
    showVerticalScopeLine: true
  }
});
