import { usePackage, Init } from '../lib';

export const init: Init = usePackage('jock.svg', { whenFiles: '**/*.svg' });
