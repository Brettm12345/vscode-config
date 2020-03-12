import { usePackage, configSet, Init } from '../lib';

export const init: Init = usePackage('pkief.material-icon-theme', {
  config: {
    activeIconPack: 'react',
    'folders.color': '#7c85b3',
    'folders.theme': 'specific',
    'languages.associations': {
      dhall: 'yaml'
    },
    'files.associations': {
      '.envrc': 'tune',
      'jest.teardown.ts': 'jest'
    }
  },
  init: configSet('workbench', { iconTheme: 'material-icon-theme' })
});
