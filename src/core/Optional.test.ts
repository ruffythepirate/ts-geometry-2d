import { some, optional, none } from './Optional';
import constants from 'constants';

test('Optional.of should return Some if defined', () => {
  expect(optional(1).isEmpty()).toBeFalsy();
});

test('Optional.of should return None if undefined', () => {
  expect(optional<number>(undefined).isEmpty()).toBeTruthy();
});

test('None.filter should return None', () => {
  expect(none.filter(a => false)).toBe(none);
  expect(none.filter(a => true)).toBe(none);
});

test('Some.filter should return some if filter true else none', () => {
  expect(some(2).filter(a => false)).toBe(none);
  expect(some(2).filter(a => true)).toEqual(some(2));
});

test('Some.foreach should call method and return some again', () => {
  let changedMe = 0;
  const someVal = some(2);
  expect(someVal.foreach(v => changedMe = v)).toEqual(someVal);
  expect(changedMe).toEqual(2);
});

test('None.map should return None', () => {
  const none = optional<number>(undefined);
  expect(none.map(a => 2 * a)).toBe(none);
});

test('None.foreach should do nothing and return itself', () => {
  let changedMe = 0
  const noneVal = optional<number>(undefined);
  expect(noneVal.foreach(a => changedMe = a)).toEqual(none);
  expect(changedMe).toEqual(0)
});

test('None.nonEmpty should return false', () => {
  expect(none.nonEmpty()).toBeFalsy();
});

test('Some.nonEmpty should return true', () => {
  expect(some(2).nonEmpty()).toBeTruthy();
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
