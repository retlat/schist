import {runTest} from './run-test.mjs';
import {listTestFiles} from './finder.mjs';
import {registerTestSuite} from './register-test-suite.mjs';

/**
 * @type {import('../index').SchistInit}
 */
export const schist = config => {
  return {
    run: async () => {
      const files = await listTestFiles(config.path);

      const tests = await registerTestSuite(files);

      const result = await runTest(tests);

      if (result.failedData.length === 0) {
        console.log('ok');
        return;
      }

      for (const datum of result.failedData) {
        console.group(datum.name);
        console.log(`${datum.path}\n`);
        console.log(datum.error);
        console.groupEnd();
      }
    }
  };
};
