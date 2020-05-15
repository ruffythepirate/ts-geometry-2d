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
