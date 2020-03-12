import { usePackage, Init } from '../lib';

export const init: Init = usePackage('xadillax.viml', {
  whenFiles: ['**/*.vim', 'vimrc', '**/*.nvim']
});
