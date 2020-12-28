import { Point, point } from './Point';
import { Vector, vector } from './Vector';
import { line } from './Line';

let p = new Point(1, 2);
beforeEach(() => {
  p = new Point(1, 2);
});

test('constructor should create point', () => {
  expect(p.x).toBe(1);
  expect(p.y).toBe(2);
});

test('minus should create Vector', () => {
  const v1 = p.minus(new Point(-1, -1));
  expect(v1.x).toBe(2);
  expect(v1.y).toBe(3);
});

test('plus should create Point', () => {
  const p1 = p.plus(new Vector(1, 1));
  expect(p1.x).toBe(2);
  expect(p1.y).toBe(3);
});

test('asLine should throw exception if null vector is given', () => {
  expect(() => {
    point(0, 0).asLine(Vector.null);
  }).toThrow();
});

test('asLine define line from vector', () => {
  expect(point(0, 0).asLine(vector(1, 0))).toEqual(line(0, 0, 1, 0));
});

test('rotate should create a new point thats rotated', () => {
  const rotated = point(1, 0).rotate(point(0, 0), 90);
  expect(rotated.x).toBeCloseTo(0, 2);
  expect(rotated.y).toBeCloseTo(-1, 2);
});

test('translate should create new Point', () => {
  const p1 = p.translate(3, 2);
  expect(p1.x).toBe(p.x + 3);
  expect(p1.y).toBe(p.y + 2);
});

test('distanceSquare should return the distance between points squared', () => {
  const p1 = Point.fromValues(0, 0);
  const p2 = Point.fromValues(2, 2);
  expect(p1.distanceSquare(p2)).toBe(8);
  expect(p2.distanceSquare(p1)).toBe(8);
});

test('equals should return true if points are within config.precision in L_inf norm from each other.' , () => {
  expect(point(0, 0).equals(point(0, 0))).toBeTruthy();
  expect(point(0, 0).equals(point(1e-4, 0))).toBeTruthy();
  expect(point(0, 0).equals(point(0, -1e-4))).toBeTruthy();
});

test('equals should return false if points not same' , () => {
  expect(point(0, 0).equals(point(1, 0))).toBeFalsy();
  expect(point(0, 0).equals(point(-4, 0))).toBeFalsy();
  expect(point(0, 0).equals(point(0, -4))).toBeFalsy();
});
