import { Init, handleModules } from '../lib';

export const init: Init = handleModules([
  import('./bookmarks'),
  import('./codesnap'),
  import('./color'),
  import('./diff'),
  import('./git'),
  import('./docker'),
  import('./projects'),
  // import('./sync'),
  import('./todo')
]);
