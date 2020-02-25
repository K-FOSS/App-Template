// bin/builder.ts
// @ts-ignore
import Parcel from '@parcel/core';
// @ts-ignore
import { NodeFS } from '@parcel/fs';
// @ts-ignore
import { NodePackageManager } from '@parcel/package-manager';
import { promises as fs } from 'fs';
import { resolve } from 'path';

async function remove(path: string): Promise<void> {
  const dirItems = await fs.readdir(path);

  await Promise.all(
    dirItems.map(async (dirItem) => {
      const filePath = resolve(path, dirItem);

      const info = await fs.stat(filePath);
      if (info.isFile()) return fs.unlink(filePath);
      else return fs.rmdir(filePath, { recursive: true });
    }),
  );
}

async function build() {
  const packageManager = new NodePackageManager(new NodeFS());
  // @ts-ignore
  const defaultConfig = await packageManager.require(
    '@parcel/config-default',
    // @ts-ignore
    __filename,
  );

  await remove(resolve('./dist/public'));

  console.log('Creating Parcel', resolve('.'));
  const parcel = new Parcel({
    disableCache: true,
    cacheDir: undefined,
    mode: 'development',
    sourceMaps: false,
    entries: [resolve('Web/Client.tsx')],
    defaultConfig,
    packageManager,
    rootDir: resolve('./Web'),
    patchConsole: false,
    minify: false,
    scopeHoist: false,
    hot: false,
    serve: false,
    autoinstall: true,
    logLevel: undefined,
    profile: undefined,
    env: { NODE_ENV: 'development' },
  });

  console.log('Starting to watch code.');

  await parcel.watch();

  // console.log(NodePackageManager, Test);
}

build();
