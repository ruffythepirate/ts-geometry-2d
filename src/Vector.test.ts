import { Vector, vector } from './Vector';
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

test('parallel should return true when vector points in same direction', () => {
  const v1 = vector(1, 0);
  const v2 = vector(2, 0);

  expect(v1.parallel(v2)).toBeTruthy();
});

test('parallel should return true when vector points in opposite direction', () => {
  const v1 = vector(1, 0);
  const v2 = vector(-2, 0);

  expect(v1.parallel(v2)).toBeTruthy();
});

test('parallel should return false when vector points in other direction', () => {
  const v1 = vector(1, 0);
  const v2 = vector(2, 1);

  expect(v1.parallel(v2)).toBeFalsy();
  expect(v1.parallel(v2.reverse())).toBeFalsy();
});

const xVector = vector(1, 0);
[
  { v: vector(2, 1), expected: vector(0, 1) },
  { v: vector(2, 3), expected: vector(0, 3) },
  { v: vector(2, -3), expected: vector(0, -3) },
].forEach(({ v, expected }) => {
  test(`perpendicularComponentTo ${xVector} is ${expected} for ${v}`, () => {
    expect(v.perpendicularComponentTo(xVector)).toEqual(expected);
  });
});

[
  { v1: vector(2, 1), v2: vector(0, 1), expected: vector(2, 2) },
  { v1: vector(4, 2), v2: vector(1, -1), expected: vector(5, 1) },
  { v1: vector(2, 1), v2: vector(0, 0), expected: vector(2, 1) },
].forEach(({ v1, v2, expected }) => {
  test(`plus of ${v1} and ${v2} equals ${expected}`, () => {
    expect(v1.plus(v2)).toEqual(expected);
  });
});

[
  { v1: vector(2, 1), v2: vector(0, 1), expected: vector(2, 0) },
  { v1: vector(4, 2), v2: vector(1, -1), expected: vector(3, 3) },
  { v1: vector(2, 1), v2: vector(0, 0), expected: vector(2, 1) },
].forEach(({ v1, v2, expected }) => {
  test(`minus of ${v1} and ${v2} equals ${expected}`, () => {
    expect(v1.minus(v2)).toEqual(expected);
  });
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
