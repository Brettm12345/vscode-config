import { usePackage } from '../lib';

export const init = usePackage('alefragnani.bookmarks', {
  keymap: [{ modifier: 'hyper', scope: 'bookmarks' }, ['b', 'toggle']]
});
