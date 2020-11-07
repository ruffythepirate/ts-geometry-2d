import GlobalConfig from './GlobalConfig';

afterEach(() => {
  GlobalConfig.setPrecision(1e-3);
});

test('default precision is 1e-3', () => {
  expect(GlobalConfig.precision).toBe(1e-3);
});

test('precision can be set', () => {
  GlobalConfig.setPrecision(1e-1);

  expect(GlobalConfig.precision).toBe(1e-1);
  expect(GlobalConfig.precisionSquared).toBeCloseTo(1e-2, 5);
});
