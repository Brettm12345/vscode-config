import { Init, handleModules } from '../lib';

export const init: Init = handleModules([
  import('./bracket-pair-colorizer'),
  import('./error-lens'),
  import('./core'),
  import('./icon-theme'),
  import('./color-theme'),
  import('./pretty-symbols'),
  import('./test-explorer'),
  import('./zentabs')
]);
