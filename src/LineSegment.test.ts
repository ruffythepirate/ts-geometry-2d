import { Point } from './Point';
import { LineSegment } from './LineSegment';
import { Vector } from './Vector';
import { none, some } from './core/Optional';

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

test('intersect should return intersection point if lines intersect', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  const ls2 = LineSegment.fromValues(-1, 1, 1, 1);

  expect(ls1.intersect(ls2)).toEqual(some(new Point(0, 1)));
});

test('intersect should return none if point is only both lines', () => {
  const ls1 = LineSegment.fromValues(0, -2, 0, 0);
  const ls2 = LineSegment.fromValues(-3, 1, -1, 1);

  expect(ls1.intersect(ls2)).toBe(none);
});

test('rightOfPoint should return false if line segment is not on same height.', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 2))).toBeFalsy();
});

test('rightOfPoint should return true if line segment is right of point', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 0.5))).toBeTruthy();
});

test('rightOfPoint should return true if line segment is horizontal and point is left of end interval', () => {
  const ls = LineSegment.fromValues(0, 0, 1, 0);
  expect(ls.rightOfPoint(Point.fromValues(-1, 0))).toBeTruthy();
});

test('rightOfPoint should return false if line segment is left of point', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls1.rightOfPoint(Point.fromValues(1, 0.5))).toBeFalsy();

  const ls2 = LineSegment.fromValues(0, 1, 0, 0);
  expect(ls2.rightOfPoint(Point.fromValues(1, 0.5))).toBeFalsy();
});

test('transpose should create new line segment that is moved', () => {
  const transp = ls.transpose(1, 2);
  expect(transp.p1).toEqual(ls.p1.transpose(1, 2));
  expect(transp.p2).toEqual(ls.p2.transpose(1, 2));
});

test('containsPoint should return true when point is on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);

  expect(ls1.containsPoint(new Point(0, 1))).toBeTruthy();
});

test('containsPoint should return false when point is not on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  const ls2 = LineSegment.fromValues(0, 0, 2, 0);

  expect(ls1.containsPoint(new Point(0, -1))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0, 3))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0, -3))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0.1, 1))).toBeFalsy();
});

test('startFrom should return new Line Segment starting from p', () => {
  const p = Point.fromValues(50, 23);
  const ls2 = ls.startFrom(p);
  expect(ls).not.toEqual(ls2);
  expect(ls2).toEqual(new LineSegment(p, ls.p2));
});
