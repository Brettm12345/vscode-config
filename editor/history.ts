import { usePackage, Init } from '../lib';

export const init: Init = usePackage('xyz.local-history', {
  config: {
    absolute: true,
    path: '/home/brett/var/vscode/history'
  }
});
