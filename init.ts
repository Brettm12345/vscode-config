import { ExtensionContext } from 'vscode';

import { initUsePackage, flattenInit, handleModules } from './lib';

export const init = (ctx: ExtensionContext): Promise<void> =>
  flattenInit([
    initUsePackage(ctx),
    handleModules([
      import('./config'),
      import('./editor'),
      import('./lang'),
      import('./ui'),
      import('./tools'),
      import('./checkers')
    ])
  ])();
