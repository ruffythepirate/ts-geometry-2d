import {point} from './Point';
import {rectangle} from './Rectangle';
import {Vector, vector} from './Vector';

test('constructor should initialize rectangle', () => {
  expect(true).toBeTruthy();
  const p1 = point(1, 2);
  const p2 = point(3, 4);
  const rect = rectangle(p1.x, p1.y, p2.x, p2.y);

  expect(rect.topLeft).toEqual(p1);
  expect(rect.bottomRight).toEqual(p2);
});

test('constructor should throw error if first arg isnt top left in x', () => {
  expect(() => {
    rectangle(3, 1, 1, 2);
  }).toThrow();
});

test('constructor should throw error if first arg isnt top left in y', () => {
  expect(true).toBeTruthy();
  expect(() => {
    rectangle(1, 2, 3, 1);
  }).toThrow();
});

test('separationVector should return null vector if there is no overlap', () => {
  expect(rectangle(0, 0, 1, 1).separationVector(rectangle(1, 1, 2, 2), vector(1, 0)))
    .toBe(Vector.null);
});

[
  { direction: vector(1, 0), expected: vector(2, 0) },
  { direction: vector(-1, 0), expected: vector(-2, 0) },
  { direction: vector(0, 1), expected: vector(0, 2) },
  { direction: vector(0, -1), expected: vector(0, -2) },
  { direction: vector(2, 1), expected: vector(2, 1) },
].forEach(({ direction, expected }) => {
  test(`separteFrom should be ${expect} when separateing in direction ${direction}`, () => {
    expect(rectangle(0, 0, 3, 3).separationVector(rectangle(1, 1, 2, 2), direction))
      .toEqual(expected);
  });
});

[
  { r1: rectangle(0, 0, 1, 1), r2: rectangle(-1, -1, 1, 0), overlap: false },
  { r1: rectangle(0, 0, 1, 1), r2: rectangle(-1, -1, 0, 1), overlap: false },
  { r1: rectangle(0, 0, 1, 1), r2: rectangle(-1, -1, 1, 1), overlap: true },
].forEach(({ r1, r2, overlap }) => {
  test(`overlap should be ${overlap} when comparing ${r1}, ${r2}`, () => {
    expect(r1.overlap(r2)).toEqual(overlap);
    expect(r2.overlap(r1)).toEqual(overlap);
  });
});
