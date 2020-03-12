import { usePackage, Init } from '../lib';

export const init: Init = usePackage('jeff-hykin.better-go-syntax', {
  whenFiles: '**/*.go'
});
