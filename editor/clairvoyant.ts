import { usePackage, Init } from '../lib';

export const init: Init = usePackage('wraith13.clairvoyant', {
  config: {
    autoScanMode: 'workspace',
    excludeDirectories: [
      'dist',
      'ts_compiled',
      'out',
      'bin',
      'node_modules',
      'result',
      '.ionide'
    ],
    excludeExtentions: [
      'settings.bkp.json',
      'yarn.lock',
      'package-lock.json',
      '.min.js',
      '.map',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.bmp',
      '.eot',
      '.ttf',
      '.woff',
      '.ico',
      '.obj',
      '.lib',
      '.out',
      '.exe',
      '.dll',
      '.vsix',
      '.zip',
      '.tar',
      '.gz',
      '.pkg',
      '.ipa',
      '.app',
      '.pdf',
      '.doc',
      '.docx',
      '.xls',
      '.xlsx',
      '.wav',
      '.mp3',
      '.mp4',
      '.mov'
    ]
  }
});
