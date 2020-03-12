import { usePackage, Init } from '../lib';

export const init: Init = usePackage('ojkwon.vscode-activedocumentindicator', {
  scope: 'activeDocumentIndicator',
  config: {
    opacity: 85
  }
});
