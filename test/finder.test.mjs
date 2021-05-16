import {deepStrictEqual} from 'assert';
import {resolve} from 'path';
import {listTestFiles} from '../src/finder.mjs';

/**
 * @type {import('../index').SchistTestSuiteFn}
 */
export const testSuite = test => {
  test({
    name: 'find .test.mjs files from test-data excludes node_modules',
    tags: ['finder']
  }, async () => {
    const p = new URL(import.meta.url).pathname;
    const dir = resolve(p, '..', '..', 'test-data', 'finder');

    const actual = await listTestFiles(
      dir,
      '.test.mjs',
      ['node_modules']
    );

    deepStrictEqual(actual, [
      resolve(dir, 'first', 'index.test.mjs'),
      resolve(dir, 'first', 'second', 'index.test.mjs'),
      resolve(dir, 'index.test.mjs'),
    ]);
  });

  test({
    name: 'prepend "." if ext argument starts without it',
    tags: ['finder']
  }, async () => {
    const p = new URL(import.meta.url).pathname;
    const dir = resolve(p, '..', '..', 'test-data', 'finder');

    const actual = await listTestFiles(
      dir,
      'test.mjs',
      ['node_modules']
    );

    deepStrictEqual(actual, [
      resolve(dir, 'first', 'index.test.mjs'),
      resolve(dir, 'first', 'second', 'index.test.mjs'),
      resolve(dir, 'index.test.mjs'),
    ]);
  });

  test({
    name: 'exclude "first" and "node_modules"',
    tags: ['finder']
  }, async () => {
    const p = new URL(import.meta.url).pathname;
    const dir = resolve(p, '..', '..', 'test-data', 'finder');

    const actual = await listTestFiles(
      dir,
      'test.mjs',
      ['first']
    );

    deepStrictEqual(actual, [
      resolve(dir, 'index.test.mjs'),
    ]);
  });
};
