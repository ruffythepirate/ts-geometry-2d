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

test('intersects should return intersection point if lines intersect', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  const ls2 = LineSegment.fromValues(-1, 1, 1, 1);

  expect(ls1.intersects(ls2)).toEqual(new Point(0, 1));
});

test('intersects should return undefined if point is only both lines', () => {
  const ls1 = LineSegment.fromValues(0, -2, 0, 0);
  const ls2 = LineSegment.fromValues(-3, 1, -1, 1);

  expect(ls1.intersects(ls2)).not.toBeDefined();
});

test('containsPoint should return true when point is on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);

  expect(ls1.containsPoint(new Point(0, 1))).toBeTruthy();
});

test('containsPoint should return false when point is not on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  const ls2 = LineSegment.fromValues(0, 0, 2, 0);

  expect(ls1.containsPoint(new Point(0, 3))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0, -3))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0.1, 1))).toBeFalsy();
});
