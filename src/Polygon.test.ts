import { Point } from './Point';

import { Polygon } from './Polygon';
import { LineSegment } from './LineSegment';

const pol = createPolygon([[0, 0], [0, 1], [1, 1], [1, 0]]);

test('constructor should initialize polygon', () => {
  expect(pol.lineSegments.length).toBe(4);
});

test('constructor should guarantee that line segments are clockwise oriented', () => {
  const pol = createPolygon([[0, 0], [1, 0], [1, 1], [0, 1]]);

  expect(pol.lineSegments.find(
      equalLineSegment(0, 0, 0, 1)),
  ).toBeDefined();
});

test('containsPoints should return true if point is inside Polygon.', () => {
  const pol = createPolygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(0.5, 0.5))).toBeTruthy();
});

test('containsPoint should return false if point is outside', () => {
  const pol = createPolygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(1.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, -0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, 1.5))).toBeFalsy();
});

test('containsPoint should return false if point is tangent to line', () => {
  const pol = createPolygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 1))).toBeFalsy();
});

test('swell should return a new bigger polygon.', () => {
  const newPol = pol.swell(1);

  const expectedPolygon = createPolygon(
    [
            [-1, -1],
            [-1, 2],
            [2, 2],
            [2, -1],
    ]);

  expect(newPol.lineSegmentsAsSet()).toEqual(expectedPolygon.lineSegmentsAsSet());
});

test('merge should throw error if no overlap', () => {
  const pol1 = createPolygon(
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ],
  );
  const pol2 = pol1.transpose(2, 0);

  expect(() => pol1.merge(pol2)).toThrow;
});

test('merge should return containing polygon if one contains the other.', () => {
  const swelled = pol.swell(5);

  expect(pol.merge(swelled)).toBe(swelled);
  expect(swelled.merge(pol)).toBe(swelled);
});

test('merge should merge two diamond polygons', () => {
  const pol1 = createPolygon(
    [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ],
  );
  const pol2 = pol1.transpose(1, 0);

  expect(pol1.merge(pol2).lineSegments.length).toBe(8);
});

test('nextLineSegment should throw error if line segment not in polygon', () => {
  expect(() => pol.nextLineSegment(LineSegment.fromValues(0, 0, 4, 4))).toThrow();
});

test('nextLineSegment should return the next line segment in order', () => {
  expect(pol.nextLineSegment(pol.lineSegments[0])).toBe(pol.lineSegments[1]);
  expect(pol.nextLineSegment(pol.lineSegments[1])).toBe(pol.lineSegments[2]);
  expect(pol.nextLineSegment(pol.lineSegments[2])).toBe(pol.lineSegments[3]);
  expect(pol.nextLineSegment(pol.lineSegments[3])).toBe(pol.lineSegments[0]);
});

test('intersectSegmentAndPoints should return empty set if not intersection', () => {
  expect(pol.intersectSegmentAndPoints(LineSegment.fromValues(-1, -1, -1, 0))).toEqual(new Set());
  expect(pol.intersectSegmentAndPoints(LineSegment.fromValues(-1, -1, -2, -1))).toEqual(new Set());
});

test('intersectSegmentAndPoints should return all intersecting points', () => {
  expect(pol.intersectSegmentAndPoints(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(new Set([[pol.lineSegments[0], Point.fromValues(0, 0.5)],
                       [pol.lineSegments[2], Point.fromValues(1, 0.5)]]));
});

test('intersects should return empty set if not intersection', () => {
  expect(pol.intersects(LineSegment.fromValues(-1, -1, -1, 0))).toEqual(new Set());
  expect(pol.intersects(LineSegment.fromValues(-1, -1, -2, -1))).toEqual(new Set());
});

test('intersects should return all intersecting points', () => {
  expect(pol.intersects(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(new Set([Point.fromValues(0, 0.5),
      Point.fromValues(1, 0.5)]));
});

test('firstIntersectSegmentAndPoint should return undefined if no intersects', () => {
  const ls = LineSegment.fromValues(-1, -1, -2, -1);
  expect(pol.firstIntersectSegmentAndPoint(ls))
    .not.toBeDefined();
});

test('firstIntersectSegmentAndPoint should return closest point to p1 when multiple intercepts',
     () => {
       expect(pol.firstIntersectSegmentAndPoint(LineSegment
                                             .fromValues(-1, 0.5, 2, 0.5)))
    .toEqual([pol.lineSegments[0], Point.fromValues(0, 0.5)]);
     });

test('lineSegmentFromPoint should return line segment ends at point p', () => {
  pol.lineSegments.forEach(ls => expect(pol.lineSegmentFrom(ls.p1)).toBe(ls));
});

test('lineSegmentFromPoint should throw error if no line segment exists.', () => {
  expect(() => pol.lineSegmentFrom(Point.fromValues(-1, -1))).toThrow();
});

test('firstIntersect should return undefined if no intersects', () => {
  const ls = LineSegment.fromValues(-1, -1, -2, -1);
  expect(pol.firstIntersect(ls))
    .not.toBeDefined();
});

test('firstIntersect should return closest point to p1 when multiple intercepts', () => {
  expect(pol.firstIntersect(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(Point.fromValues(0, 0.5));
});

function equalLineSegment(x1: number, y1: number, x2: number, y2: number) {
  return (lineSegment: LineSegment) => lineSegment.p1.x === x1
    && lineSegment.p1.y === y1
        && lineSegment.p2.x === x2
        && lineSegment.p2.y === y2;
}

function createPolygon(points: number[][]) {
  const p = points.map(num => new Point(num[0], num[1]));
  return Polygon.fromPoints(p);
}