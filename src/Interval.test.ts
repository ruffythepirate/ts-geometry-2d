import { Interval, IntervalType } from './Interval';

test('constructor should create interval', () => {
  const int = new Interval(0, 1);

  expect(int.min).toBe(0);
  expect(int.max).toBe(1);
});

test('contains should return false when value not contained', () => {
  const int = new Interval(0, 1);

  expect(int.contains(-1)).toBeFalsy();
});

test('contains should return true when value is contained', () => {
  const int = new Interval(0, 1);

  expect(int.contains(0.5)).toBeTruthy();
});

test('contains should handle closed interval properly.', () => {
  const int = new Interval(0, 1, IntervalType.Closed);

  expect(int.contains(1)).toBeTruthy();
  expect(int.contains(0)).toBeTruthy();
});

test('contains should handle open interval properly', () => {
  const int = new Interval(0, 1, IntervalType.Open);

  expect(int.contains(1)).toBeFalsy();
  expect(int.contains(0)).toBeFalsy();
});

test('contains should handle half-open interval properly', () => {
  const int1 = new Interval(0, 1, IntervalType.OpenEnd);
  const int2 = new Interval(0, 1, IntervalType.OpenStart);

  expect(int1.contains(0)).toBeTruthy();
  expect(int1.contains(1)).toBeFalsy();
  expect(int2.contains(0)).toBeFalsy();
  expect(int2.contains(1)).toBeTruthy();
});

test('contains should handle if interval is only one value', () => {
  const int1 = new Interval(1, 1, IntervalType.OpenEnd);
  const int2 = new Interval(1, 1, IntervalType.Open);

  expect(int1.contains(1)).toBeTruthy();
  expect(int2.contains(1)).toBeFalsy();
});
