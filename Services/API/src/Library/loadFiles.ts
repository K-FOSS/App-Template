// src/Library/loadFiles.ts
import globby from 'globby';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Imports all files that match the globby path and Object.values the import and returns the array
 * @param globbyPath Globbed Path to the files
 * @returns Array of all exported items from the globbed files
 */
export async function loadFiles<T>(globbyPath: string): Promise<T[]> {
  const files = await globby(
    resolve(fileURLToPath(import.meta.url), '../..', globbyPath),
  );

  let items: T[] = [];
  for (const filePath of files) {
    const importedFile = (await import(filePath)) as { [key: string]: T };

    Object.values(importedFile).map((itm) => items.push(itm));
  }

  return items;
}
