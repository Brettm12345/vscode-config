import * as up from 'vscode-use-package';
import { Endomorphism, flow, tupled } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task } from 'fp-ts/lib/Task';

import { flattenTasks } from './fp';
import { replaceAll } from './strings';

export const meh = 'ctrl+shift+alt';
export const hyper = 'ctrl+shift+alt+meta';

export const handleKey: Endomorphism<string> = replaceAll(
  ['hyper', hyper],
  ['meh', meh]
);

/**
 * [Key, Command]
 */
export type Keybinding = [string, string];

export interface CommonArgs extends Omit<up.Keybinding, 'key' | 'command'> {
  scope?: string;
  modifier?: string;
}

export const handleKeybinding: (
  c: CommonArgs
) => (k: Keybinding) => up.Keybinding = ({
  modifier,
  scope,
  ...common
} = {}) => ([key, command]) => ({
  key: modifier ? `${handleKey(modifier)}+${handleKey(key)}` : handleKey(key),
  command: scope ? `${scope}.${command}` : command,
  ...common
});

const keymapSet = (keymap: up.Keybinding[]): Task<void> => () =>
  up.keymapSet(keymap);

export const handleKeymap = (common: CommonArgs) =>
  flow(map(handleKeybinding(common)), keymapSet);

export const globalKeymap = (...keymap: Keybinding[]): Task<void> =>
  pipe(keymap, handleKeymap({}));

export const keymap = (
  common: CommonArgs,
  ...keymap: Keybinding[]
): Task<void> => pipe(keymap, map(handleKeybinding(common)), keymapSet);

export const keymaps = flow(map(tupled(keymap)), flattenTasks);
