import { usePackage, Init } from '../lib';

export const init: Init = usePackage('tootone.org-mode', {
  whenFiles: '**/*.org'
});
