import { usePackage } from '../lib';

export const init = usePackage('siegebell.prettify-symbols-mode', {
  scope: 'prettifySymbolsMode',
  config: {
    adjustCursorMovement: true,
    prettyCursor: 'boxed',
    revealOn: 'cursor',
    substitutions: [
      {
        language: 'purescript',
        substitutions: [
          {
            post: '\\b',
            pre: '\\b',
            pretty: '¬',
            ugly: 'not\\s?'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '√',
            ugly: 'sqrt\\s?'
          },
          {
            post: '[^=<>]|$',
            pre: '[^=<>]|^',
            pretty: '»',
            ugly: '>>'
          },
          {
            post: '[^=<>]|$',
            pre: '[^=<>]|^',
            pretty: '«',
            ugly: '<<'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '⟼',
            ugly: 'return\\s?'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '¬',
            ugly: 'not\\s?'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '∀',
            style: {
              color: '#c597f9'
            },
            ugly: 'forall'
          },
          {
            post: '\\s*(?:\\w|_).*?\\s*->',
            pretty: 'λ ',
            style: {
              color: '#82aaff'
            },
            ugly: '\\\\'
          }
        ]
      },
      {
        language: 'haskell',
        substitutions: [
          {
            post: '\\b',
            pre: '\\b',
            pretty: '¬',
            ugly: 'not\\s?'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '√',
            ugly: 'sqrt\\s?'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '⊥',
            ugly: 'undefined'
          },
          {
            post: '[^=<>]|$',
            pre: '[^=<>]|^',
            pretty: '»',
            ugly: '>>'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '⟼',
            ugly: 'return'
          },
          {
            post: '[^=<>]|$',
            pre: '[^=<>]|^',
            pretty: '«',
            ugly: '<<'
          },
          {
            post: '\\b',
            pre: '\\b',
            pretty: '∀',
            style: {
              color: '#c597f9'
            },
            ugly: 'forall'
          },
          {
            post: '\\s',
            pre: '\\s',
            pretty: '∘',
            style: {
              color: '#86e1fc'
            },
            ugly: '\\.'
          },
          {
            post: '\\s*(?:\\w|_).*?\\s*->',
            pretty: 'λ ',
            style: {
              color: '#82aaff'
            },
            ugly: '\\\\'
          }
        ]
      }
    ]
  }
});
