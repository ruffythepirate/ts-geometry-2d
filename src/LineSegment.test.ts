import {Point, point} from './Point';
import {LineSegment, lineSegment} from './LineSegment';
import {line} from './Line';
import {IntervalType} from './Interval';
import {Vector} from './Vector';
import {none, some} from '@ruffy/ts-optional';

const ls = new LineSegment(new Point(0, 0), new Point(1, 0));

test('constructor should create line segment', () => {
  expect(ls.p1).toEqual(new Point(0, 0));
  expect(ls.p2).toEqual(new Point(1, 0));
});

test('closestPoint should find closest point', () => {
  expect(ls.closestPoint(new Point(0.5, -1))).toEqual(new Point(0.5, 0));
  expect(ls.closestPoint(new Point(-1, -1))).toEqual(new Point(0, 0));
  expect(ls.closestPoint(new Point(2, -1))).toEqual(new Point(1, 0));

  let newLs = new LineSegment(new Point(0, 0), new Point(10, 0));
  expect(newLs.closestPoint(new Point(5, -5))).toEqual(new Point(5, 0));
  newLs = new LineSegment(new Point(10, 0), new Point(10, 10));
  expect(newLs.closestPoint(new Point(15, 5))).toEqual(new Point(10, 5));
  newLs = new LineSegment(new Point(10, 10), new Point(0, 10));
  expect(newLs.closestPoint(new Point(5, -5))).toEqual(new Point(5, 10));
});

test('asVector should return the vector from p1 to p2', () => {
  const v = ls.asVector();

  expect(v).toEqual(new Vector(1, 0));
});

test('onLine should return false if point is not on line defined by points', () => {
  expect(ls.onLine(point(-5, 1))).toBeFalsy();
});

test('onLine should return true if point is on line defined by points', () => {
  expect(ls.onLine(point(5, 0))).toBeTruthy();
});

test('onLine should return true if point is on endpoints', () => {
  expect(ls.onLine(point(0, 0))).toBeTruthy();
  expect(ls.onLine(point(1, 0))).toBeTruthy();
});

test('onLineSegment should return false if point is in line but outside interval', () => {
  expect(ls.onLineSegment(point(-1, 0))).toBeFalsy();
});

test('onLineSegment should return true if point is in line and inside interval', () => {
  expect(ls.onLineSegment(point(0.5, 0))).toBeTruthy();
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

test('intersect should return point if intersection happens at endpoints', () => {
  expect(lineSegment(2, 0, 3, 1).intersect(lineSegment(1, 0, 2, 0))).toEqual(some(point(2, 0)));
  expect(lineSegment(0, 1, 1, 0).intersect(lineSegment(1, 0, 2, 0))).toEqual(some(point(1, 0)));
});

test('intersect should return none if point not on both lines', () => {
  const ls1 = LineSegment.fromValues(0, -2, 0, 0);
  const ls2 = LineSegment.fromValues(-3, 1, -1, 1);

  expect(ls1.intersect(ls2)).toBe(none);
});

[
  [[317, 128, 803, 460], [482, 180, 482, 424]],
  [[317, 128, 803, 460], [680, 424, 680, 180]],
].
  forEach((p) => {
    test(`intersect between ${p[0]} and ${p[1]} should exist`, () => {
      const ls1 = LineSegment.fromArray(p[0]);
      const ls2 = LineSegment.fromArray(p[1]);

      expect(ls1.intersect(ls2)).not.toBe(none);
    });
  });

test('rightOfPoint should return false if line segment is not on same height.', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 2))).toBeFalsy();
});

test('rightOfPoint should return false if line segments p1 is just right of point (it is not included in interval)', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 0), IntervalType.OpenStart)).toBeFalsy();
});

test('rightOfPoint should return true if line segment is right of point', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 0.5))).toBeTruthy();
});

test('rightOfPoint should return true if line segment is right of point and parallel', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(-1, 0))).toBeTruthy();
});

test('rightOfPoint should return false if line segment is left of point and parallel', () => {
  const ls = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls.rightOfPoint(Point.fromValues(4, 0))).toBeFalsy();
});

test('rightOfPoint should return true if line segment is horizontal and point is left of end interval',
     () => {
       const ls = LineSegment.fromValues(0, 0, 1, 0);
       expect(ls.rightOfPoint(Point.fromValues(-1, 0))).toBeTruthy();
     });

test('rightOfPoint should return false if line segment is left of point', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 1);
  expect(ls1.rightOfPoint(Point.fromValues(1, 0.5))).toBeFalsy();

  const ls2 = LineSegment.fromValues(0, 1, 0, 0);
  expect(ls2.rightOfPoint(Point.fromValues(1, 0.5))).toBeFalsy();
});

test('rightOfPoint should handle end points', () => {
  const ls1 = LineSegment.fromValues(0, 1, 0, 0);
  expect(ls1.rightOfPoint(Point.fromValues(-1, 0), IntervalType.OpenStart)).toBeTruthy();
  expect(ls1.rightOfPoint(Point.fromValues(-1, 0), IntervalType.OpenEnd)).toBeFalsy();
  expect(ls1.rightOfPoint(Point.fromValues(-1, 0), IntervalType.Open)).toBeFalsy();
  expect(ls1.rightOfPoint(Point.fromValues(-1, 0), IntervalType.Closed)).toBeTruthy();
});

test('translate should create new line segment that is moved', () => {
  const transp = ls.translate(1, 2);
  expect(transp.p1).toEqual(ls.p1.translate(1, 2));
  expect(transp.p2).toEqual(ls.p2.translate(1, 2));
});

test('containsPoint should return true when point is on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);

  expect(ls1.containsPoint(new Point(0, 1))).toBeTruthy();
  expect(ls1.containsPoint(new Point(0, 0))).toBeTruthy();
  expect(ls1.containsPoint(new Point(0, 2))).toBeTruthy();
});

test('containsPoint should return false when point is not on line segment', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  const ls2 = LineSegment.fromValues(0, 0, 2, 0);

  expect(ls1.containsPoint(new Point(0, -1))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0, 3))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0, -3))).toBeFalsy();
  expect(ls2.containsPoint(new Point(2.1, 0))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls2.containsPoint(new Point(3, 0))).toBeFalsy();
  expect(ls1.containsPoint(new Point(0.1, 1))).toBeFalsy();
});

test('containsPoint should handle interval type', () => {
  const ls1 = LineSegment.fromValues(0, 0, 0, 2);
  expect(ls1.containsPoint(point(0, 0), IntervalType.Closed)).toBeTruthy();
  expect(ls1.containsPoint(point(0, 0), IntervalType.OpenStart)).toBeFalsy();
  expect(ls1.containsPoint(point(0, 0), IntervalType.OpenEnd)).toBeTruthy();
  expect(ls1.containsPoint(point(0, 0), IntervalType.Open)).toBeFalsy();
});

test('startFrom should return new Line Segment starting from p', () => {
  const p = Point.fromValues(50, 23);
  const ls2 = ls.startFrom(p);
  expect(ls).not.toEqual(ls2);
  expect(ls2).toEqual(new LineSegment(p, ls.p2));
});

test('equals should return true when lines are equal', () => {
  const ls = lineSegment(0, 0, 1, 0);
  const ls2 = lineSegment(0, 0, 1, 0);
  expect(ls.equals(ls)).toBeTruthy();
  expect(ls.equals(ls2)).toBeTruthy();
});

test('equals should return false when lines are not equal', () => {
  const ls = lineSegment(0, 0, 1, 0);
  const ls2 = lineSegment(1, 0, 0, 0);
  expect(ls.equals(ls.translate(1, 0))).toBeFalsy();
  expect(ls.equals(ls2)).toBeFalsy();
});

test('parallel should return true when lines are parallel', () => {
  expect(lineSegment(0, 0, 1, 0).parallel(lineSegment(0, 1, 1, 1))).toBeTruthy();
  expect(lineSegment(0, 0, 1, 0).parallel(lineSegment(0, 0, 1, 0))).toBeTruthy();
  expect(lineSegment(0, 0, 3, 17.12).parallel(lineSegment(0, 0, 6, 34.24))).toBeTruthy();
});

test('parallel should return false when lines are not parallel', () => {
  expect(lineSegment(0, 0, 1, 0).parallel(lineSegment(0, 1, 1, 2))).toBeFalsy();
});

[
  { ls1: lineSegment(-1, 0, 1, 0), ls2: lineSegment(0, -1, 0, 1), overlap: true },
  { ls1: lineSegment(-1, 2, 1, 2), ls2: lineSegment(0, -1, 0, 1), overlap: false },
  { ls1: lineSegment(0, 0, 1, 0), ls2: lineSegment(.5, 0, 1.5, 0), overlap: true },
  { ls1: lineSegment(0, 0, 1, 0), ls2: lineSegment(1, 0, 2, 0), overlap: true },
  { ls1: lineSegment(0, 0, 1, 0), ls2: lineSegment(1.1, 0, 2, 0), overlap: false },
  { ls1: lineSegment(0, 0, 10, 0), ls2: lineSegment(2, 0, 3, 0), overlap: true },
].forEach(({ ls1, ls2, overlap }) => {
  test(`${ls1} ${ls2} should have overlap=${overlap}`, () => {
    const result = ls1.overlap(ls2);
    expect(result).toBe(overlap);
  });
});

[
  { l: line(0, 0, 1, 0), p: some(point(0, 0)) },
  { l: line(0, 1, 1, 0), p: some(point(0, 1)) },
  { l: line(0, -1, 1, 0), p: some(point(0, -1)) },
  { l: line(0, 2, 1, 0), p: none },
].forEach(({ l, p }) => {
  test(`intersectForLine for line (${l.p.x}, ${l.p.y} ${l.v.x}, ${l.v.y}) is correct`, () => {
    const ls = lineSegment(0, -1, 0, 1);
    expect(ls.intersectForLine(l)).toEqual(p);
  });
});
