import { Point } from './Point';
import { LineSegment } from './LineSegment';
import { Vector } from './Vector';

const ls = new LineSegment(new Point(0, 0), new Point(1, 0));

test('constructor should create line segment', () => {
  expect(ls.p1).toEqual(new Point(0, 0));
  expect(ls.p2).toEqual(new Point(1, 0));
});

test('closestPoint should find closest point', () => {
  expect(ls.closestPoint(new Point(0.5, -1))).toEqual(new Point(0.5, 0));
  expect(ls.closestPoint(new Point(-1, -1))).toEqual(new Point(0, 0));
  expect(ls.closestPoint(new Point(2, -1))).toEqual(new Point(1, 0));
});

test('asVector should return the vector from p1 to p2', () => {
  const v = ls.asVector();

  expect(v).toEqual(new Vector(1, 0));
});

test('flip should return a new line segment with p1 and p2 flipped', () => {
  const flipped = ls.flip();

  expect(ls.p1).toEqual(flipped.p2);
  expect(ls.p2).toEqual(flipped.p1);
});
