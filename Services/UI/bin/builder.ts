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

async function build(dev: boolean = true) {
  const packageManager = new NodePackageManager(new NodeFS());
  // @ts-ignore
  const defaultConfig = await packageManager.require(
    '@parcel/config-default',
    __filename,
  );

  await fs.copyFile(
    'extras/hmr-runtime.js',
    'node_modules/@parcel/runtime-browser-hmr/lib/loaders/hmr-runtime.js',
  );

  await remove(resolve('./dist/public'));

  console.log('Creating Parcel', resolve('.'));
  const parcel = new Parcel({
    disableCache: false,
    mode: dev ? 'development' : 'production',
    minify: !dev,
    sourceMaps: false,
    scopeHoist: false,
    publicUrl: undefined,
    distDir: undefined,
    hot: dev,
    serve: {
      https: false,
      port: 8123,
      host: '0.0.0.0',
      publicUrl: undefined,
    },
    autoinstall: true,

    entries: [resolve('Web/Client.tsx')],
    defaultConfig,
    packageManager,
    rootDir: resolve('.'),
    patchConsole: true,
    targets: ['public'],

    logLevel: undefined,
    profile: undefined,
    env: { NODE_ENV: dev ? 'development' : 'production' },
  });

  console.log('Starting to watch code.');
  if (dev) await parcel.watch();
  else await parcel.run();
  // console.log(NodePackageManager, Test);
}

build();
