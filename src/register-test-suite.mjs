/**
 * @param {string[]} pathArray
 * @return {import('../index').SchistTestCase[]}
 */
export const registerTestSuite = async pathArray => {
  /**
   * @type {import('../index').SchistTestCase[]}
   */
  const testCases = [];

  const registerTest = path => (config, testFn) => {
    testCases.push({
      path: path,
      config: config,
      fn: testFn
    });
  }

  for (const p of pathArray) {
    /**
     * @type {import('../index').SchistTestModule}
     */
    const m = await import(p);

    if (!m.testSuite || typeof m.testSuite !== 'function') {
      throw new Error('Schist expects test modules to export testSuite function');
    }

    m.testSuite(registerTest(p));
  }

  return testCases;
};
