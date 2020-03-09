import { usePackage } from '../lib';

export const init = usePackage('xyz.local-history', {
  config: {
    absolute: true,
    path: '/home/brett/var/vscode/history'
  }
});
