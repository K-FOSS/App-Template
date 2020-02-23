// bin/builder.ts
// @ts-nocheck
import { resolve } from 'path';
import { NodePackageManager } from '@parcel/package-manager';
import { NodeFS } from '@parcel/fs';
import { fileURLToPath } from 'url';
import Parcel from '@parcel/core';

async function test() {
  const packageManager = new NodePackageManager(new NodeFS());
  // @ts-ignore
  const defaultConfig = await packageManager.require(
    '@parcel/config-default',
    // @ts-ignore
    __filename,
  );

  console.log(Parcel);
  const parcel = new Parcel({
    entries: [resolve('UI/Client.tsx')],
    defaultConfig,
    packageManager,
    rootDir: resolve('./'),
    patchConsole: false,
    cacheDir: undefined,
    minify: false,
    sourceMaps: false,
    scopeHoist: true,
    hot: false,
    serve: false,
    targets: ['public'],
    autoinstall: true,
    logLevel: undefined,
    profile: undefined,
  });

  await parcel.run();

  // console.log(NodePackageManager, Test);
}

test();

export {};
