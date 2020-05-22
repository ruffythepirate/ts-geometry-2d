import { some, optional, none } from './Optional';

test('Optional.of should return Some if defined', () => {
  expect(optional(1).isEmpty()).toBeFalsy();
});

test('Optional.of should return None if undefined', () => {
  expect(optional<number>(undefined).isEmpty()).toBeTruthy();
});

test('None.map should return None', () => {
  const none = optional<number>(undefined);
  expect(none.map(a => 2 * a)).toBe(none);
});

test('None.flatMap should return None', () => {
  expect(none.flatMap(a => optional(4)));
});

test('None.get should throw Error', () => {
  expect(none.get).toThrow();
});

test('None.getOrElse should return else value', () => {
  expect(none.getOrElse(4)).toBe(4);
});

test('Some.get should return value', () => {
  expect(some(4).get()).toEqual(4);
});

test('Some.getOrElse should return value', () => {
  expect(some(4).getOrElse(8)).toEqual(4);
});

test('Some.flatMap should return Optional', () => {
  expect(some(2).flatMap(a => some(4))).toEqual(some(4));
  expect(some(2).flatMap(a => none)).toEqual(none);
});

test('Some.map should return Some with mapped value', () => {
  const val = some(2);
  expect(val.map(a => 2 * a)).toEqual(some(4));
});
