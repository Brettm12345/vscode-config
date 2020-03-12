import { handleModules, Init } from '../lib';

export const init: Init = handleModules([
  import('./grammar'),
  import('./spell')
]);
