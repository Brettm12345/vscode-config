import { usePackage, Init } from '../lib';

export const init: Init = usePackage('alefragnani.bookmarks', {
  keymap: [{ modifier: 'hyper', scope: 'bookmarks' }, ['b', 'toggle']]
});
