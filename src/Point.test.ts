import { Point } from './Point';
import { Vector } from './Vector';

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

test('transpose should create new Point', () => {
  const p1 = p.transpose(3, 2);
  expect(p1.x).toBe(p.x + 3);
  expect(p1.y).toBe(p.y + 2);
});

test('distanceSquare should return the distance between points squared', () => {
  const p1 = Point.fromValues(0, 0);
  const p2 = Point.fromValues(2, 2);
  expect(p1.distanceSquare(p2)).toBe(8);
  expect(p2.distanceSquare(p1)).toBe(8);
});
