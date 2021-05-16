export interface SchistConfig {
  path: string;
}

export interface SchistInstance {
  run(): Promise<void>;
}

export interface SchistInit {
  (config: SchistConfig): SchistInstance;
}

export interface SchistTestConfig {
  name: string;
  tags?: string[];
}

export interface SchistTestCase {
  path: string;
  config: SchistTestConfig;
  fn: () => void;
}

export interface SchistTestCollector {
  (config: SchistTestConfig, testFn: () => Promise<void>): void;
}

export interface SchistTestModule {
  testSuite(test: SchistTestCollector): void;
}

export type SchistTestSuiteFn = (test: SchistTestCollector) => void;

export interface SchistTestResult {
  total: number;
  failedData: {
    path: string;
    name: string;
    error: Error['message'];
  }[];
}
