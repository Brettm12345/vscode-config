import { usePackages, Init } from '../lib';

export const init: Init = usePackages(
  'mads-hartmann.bash-ide-vscode',
  'foxundermoon.shell-format',
  'ryu1kn.edit-with-shell',
  'jeff-hykin.better-shellscript-syntax',
  'rogalmic.bash-debug',
  'bmalehorn.vscode-fish',
  'timonwong.shellcheck',
  'hangxingliu.vscode-awk-hint'
);
