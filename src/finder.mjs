import {readdir} from 'fs/promises';
import {join} from 'path';

/**
 * @param {string} path
 * @param {string} ext
 * @param {string[]} excludeDirs
 * @return {Promise<string[]>}
 */
const findRecursively = async (path, ext, excludeDirs) => {
  const files = [];

  const entries = await readdir(path, {withFileTypes: true});
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) {
        continue;
      }

      const fs = await listTestFiles(join(path, entry.name), ext, excludeDirs);
      files.push(...fs);
      continue;
    }

    if (entry.name.endsWith(ext)) {
      files.push(join(path, entry.name));
    }
  }

  return files;
};

/**
 * @param {string} path
 * @param {string} ext
 * @param {string[]} excludeDirs
 * @return {Promise<string[]>}
 */
export const listTestFiles = async (
  path,
  ext = '.test.mjs',
  excludeDirs = ['node_modules']
) => {
  return await findRecursively(
    path,
    ext.startsWith('.') ? ext : `.${ext}`,
    excludeDirs
  );
};
