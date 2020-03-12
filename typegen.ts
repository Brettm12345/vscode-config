import { unsafeCoerce } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import * as FS from 'fs';
import { compile } from 'json-schema-to-typescript';
import * as P from 'path';
import { toError } from 'fp-ts/lib/Either';
import { setTimeout } from 'timers';

const extensionPath = P.join(__dirname, 'tmp-extensions');
const globalTypes = P.join(__dirname, 'global.d.ts');

const main = async () => {
  FS.writeFileSync(globalTypes, 'export interface Extensions {\n  ');
  await Promise.all(
    FS.readdirSync(extensionPath).map(async dir =>
      pipe(
        require(P.join(extensionPath, dir, 'package.json'))?.contributes
          ?.configuration,
        O.fromNullable,
        O.map(async a =>
          pipe(
            TE.tryCatch(
              () =>
                compile(
                  Object.assign(unsafeCoerce(a), { title: 'Configuration' }),
                  'Configuration'
                ),
              toError
            ),
            TE.map((typegen: string) => {
              const name = dir.replace(/-[^-]+$/, '');
              const path = P.join(__dirname, '@types', name);
              console.log(typegen);
              console.log('Generating types:', path);
              FS.mkdirSync(path, { recursive: true });
              FS.writeFileSync(P.join(path, 'index.d.ts'), typegen);
              FS.appendFileSync(
                globalTypes,
                `  '${name}': import('./@types/${name}').Configuration;\n`
              );
            })
          )()
        )
      )
    )
  );
};

main().then(() => {
  setTimeout(() => FS.appendFileSync(globalTypes, '\n}'), 2000);
});
