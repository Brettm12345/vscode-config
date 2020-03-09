import { usePackage } from "../lib";

export const init = usePackage("hitode909.zentabs", {
  config: {
    maximumOpenedTabs: 20,
    switchWithCurrentTab: true
  }
});
