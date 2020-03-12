import { usePackage, Init } from '../lib';

export const init: Init = usePackage('ms-azuretools.vscode-docker', {
  whenFiles: ['**/Dockerfile', '**/docker-compose.*']
});
