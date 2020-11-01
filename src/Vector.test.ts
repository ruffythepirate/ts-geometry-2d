import { Vector } from './Vector';
import { Point } from './Point';

let v = new Vector(1, 2);
beforeEach(() => {
  v = new Vector(1, 2);
});

test('constructor should create Vector', () => {

  expect(v.x).toBe(1);
  expect(v.y).toBe(2);
});

test('dot should do dot product with vector', () => {
  const scalar = v.dot(v);

  expect(scalar).toBe(5);
});

test('scale should return new vector by multiplying the vector with the factor', () => {
  const nv = v.scale(2);

  expect(v).not.toEqual(nv);
  expect(nv.x).toBe(2);
  expect(nv.y).toBe(4);
});

test('isNullVector should return false for non null vector', () => {
  const v = new Vector(1, 0);

  expect(v.isNullVector()).toBeFalsy();
});

test('isNullVector should return true for null vector', () => {
  const v = new Vector(0, 0);

  expect(v.isNullVector()).toBeTruthy();
});

test('square should return vector dot itself.', () => {
  expect(v.square()).toBe(v.dot(v));
});

test('norm2 should return euklidean length of vector.', () => {
  expect(v.norm2()).toBe(Math.sqrt(5));
});

test('cross should return the size of the cross product', () => {
  const v2 = new Vector(2, 1);

  expect(v.cross(v2)).toBe(-3);
});

test('clockwisePerpendeicular should return the clockwise perpendicular vector', () => {
  const res = v.clockwisePerpendicular();

  expect(res.x).toBe(v.y);
  expect(res.y).toBe(-v.x);
});

test('reverse should return the reversed vector.', () => {
  const res = v.reverse();
  expect(res.x).toBe(-v.x);
  expect(res.y).toBe(-v.y);
});

test('normed should throw error if norm2 = 0', () => {
  expect(() => {
    new Vector(0, 0).normed();
  }).toThrow();
});

test('normed should return normalized version of vector', () => {
  expect(new Vector(2, 0).normed()).toEqual(new Vector(1, 0));
});

test('asPoint should return vector as point', () => {
  expect(v.asPoint()).toEqual(new Point(v.x, v.y));
});
