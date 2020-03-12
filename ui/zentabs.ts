import { usePackage, Init } from '../lib';

export const init: Init = usePackage('hitode909.zentabs', {
  config: {
    maximumOpenedTabs: 20,
    switchWithCurrentTab: true
  }
});
