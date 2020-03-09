import { usePackage } from '../lib';

export const init = usePackage('ojkwon.vscode-activedocumentindicator', {
  scope: 'activeDocumentIndicator',
  config: {
    opacity: 85
  }
});
