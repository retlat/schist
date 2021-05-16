/**
 * @param {import('../index').SchistTestCase[]} testCases
 * @return {import('../index').SchistTestResult}
 */
export const runTest = async testCases => {
  /**
   * @type {import('../index').SchistTestResult}
   */
  const result = {
    total: testCases.length,
    failedData: []
  };

  for (const testCase of testCases) {
    try {
      await testCase.fn();
    } catch (e) {
      result.failedData.push({
        path: testCase.path,
        name: testCase.config.name,
        error: e.message
      });
    }
  }

  return result;
};
