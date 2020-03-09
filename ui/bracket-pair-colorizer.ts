import { usePackage } from '../lib';

export const init = usePackage('coenraads.bracket-pair-colorizer-2', {
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
    scopeLineCSS: [
      'borderStyle : solid',
      'borderWidth : 0.5px',
      'borderColor : {color}',
      'opacity: 0.8'
    ],
    showBracketsInGutter: true,
    showBracketsInRuler: true,
    showVerticalScopeLine: true
  }
});
