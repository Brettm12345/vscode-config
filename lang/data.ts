import { usePackages, Init } from '../lib';

export const init: Init = usePackages(
  'bungcip.better-toml',
  'redhat.vscode-yaml',
  'dandric.vscode-jq',
  'mikestead.dotenv',
  'quicktype.quicktype',
  'rubymaniac.vscode-direnv',
  'syler.ignore',
  'luggage66.awk',
  'dotiful.dotfiles-syntax-highlighting',
  'prisma.vscode-graphql',
  'sidneys1.gitconfig',
  'davidwang.ini-for-vscode'
);
