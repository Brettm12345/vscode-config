import { handleModules, Init } from '../lib';

export const init: Init = handleModules([
  import('./core'),
  import('./clairvoyant'),
  import('./history'),
  import('./keymap'),
  import('./terminal'),
  import('./vim')
]);
