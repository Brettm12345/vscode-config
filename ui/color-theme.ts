import { usePackage } from '../lib';

export const init = usePackage('atomiks.moonlight', {
  scope: 'workbench',
  config: {
    colorTheme: 'Moonlight II',
    colorCustomizations: {
      '[Moonlight II Italic]': {
        'activityBar.background': '#161a2a'
      },
      '[Moonlight II]': {
        'activityBar.background': '#161a2a'
      }
    }
  }
});
