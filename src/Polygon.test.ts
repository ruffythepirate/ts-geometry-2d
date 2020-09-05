import { Point, point } from './Point';

import { Polygon, polygon, lineSegmentsIntersectThemselves } from './Polygon';
import { LineSegment } from './LineSegment';
import { none, some } from '@ruffy/ts-optional';

let pol: Polygon = polygon([]);

beforeEach(() => {
  pol = polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
});

test('constructor should initialize polygon', () => {
  expect(pol.lineSegments.length).toBe(4);
});

test('constructor should guarantee that line segments are clockwise oriented', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);

  expect(pol.lineSegments.find(
      equalLineSegment(0, 0, 0, 1)),
  ).toBeDefined();
});

test('constructor should throw exception if polygon intersects itself', () => {
  expect(() => {
    const pol = polygon([[0, 0], [1, 1], [1, 0], [0, 1]]);
  }).toThrow();
});

test('containsPoints should return true if point is inside Polygon.', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(0.5, 0.5))).toBeTruthy();
});

test('containsPoint should return false if point is outside', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(1.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, -0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, 1.5))).toBeFalsy();
});

test('containsPoint should return false if point is tangent to line', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 1))).toBeFalsy();
});

test('swell should return a new bigger polygon.', () => {
  const newPol = pol.swell(1);

  const expectedPolygon = polygon(
    [
            [-1, -1],
            [-1, 2],
            [2, 2],
            [2, -1],
    ]);

  expect(newPol.lineSegmentsAsSet()).toEqual(expectedPolygon.lineSegmentsAsSet());
});

test('merge should throw error if no overlap', () => {
  const pol1 = polygon(
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
  const pol1 = polygon(
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

test('intersectionSegmentAndPoints should return empty set if not intersection', () => {
  expect(pol.intersectionSegmentAndPoints(
    LineSegment.fromValues(-1, -1, -1, 0))).toEqual(new Set());
  expect(pol.intersectionSegmentAndPoints(
    LineSegment.fromValues(-1, -1, -2, -1))).toEqual(new Set());
});

test('intersectionSegmentAndPoints should return all intersecting points', () => {
  expect(pol.intersectionSegmentAndPoints(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(new Set([[pol.lineSegments[0], Point.fromValues(0, 0.5)],
                       [pol.lineSegments[2], Point.fromValues(1, 0.5)]]));
});

test('intersect should return empty set if not intersection', () => {
  expect(pol.intersect(LineSegment.fromValues(-1, -1, -1, 0))).toEqual(new Set());
  expect(pol.intersect(LineSegment.fromValues(-1, -1, -2, -1))).toEqual(new Set());
});

test('intersect should return all intersecting points', () => {
  expect(pol.intersect(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(new Set([Point.fromValues(0, 0.5),
      Point.fromValues(1, 0.5)]));
});

test('intersect should return two intersecting points', () => {
  const pol1 = polygon(
    [
      [482, 180],
      [482, 424],
      [680, 424],
      [680, 180],
    ]);
  const diagonal = LineSegment.fromValues(317, 180, 803, 424);

  expect(pol1.intersect(diagonal).size).toEqual(2);
});

test('closestPoint should return closest point on perimiter.', () => {
  const pol1 = polygon(
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ]);

  expect(pol1.closestPoint(new Point(-5, 5))).toEqual(new Point(0, 5));
  expect(pol1.closestPoint(new Point(15, 5))).toEqual(new Point(10, 5));
  expect(pol1.closestPoint(new Point(5, 15))).toEqual(new Point(5, 10));
  expect(pol1.closestPoint(new Point(5, -5))).toEqual(new Point(5, 0));
});

test('middle should find middle of polygon', () => {
  expect(polygon(
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ]).middle())
    .toEqual(new Point(5, 5));

  expect(polygon(
    [
      [0, 100],
      [100, 50],
      [10, 50],
      [10, 10],
    ]).middle())
    .toEqual(new Point(50, 55));
});

test('firstIntersectionSegmentAndPoint should return none if no intersect', () => {
  const ls = LineSegment.fromValues(-1, -1, -2, -1);
  expect(pol.firstIntersectionSegmentAndPoint(ls))
    .toEqual(none);
});

test('firstIntersectionSegmentAndPoint should return closest point to p1 when multiple intercepts',
     () => {
       expect(pol.firstIntersectionSegmentAndPoint(LineSegment
                                             .fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(some([pol.lineSegments[0], Point.fromValues(0, 0.5)]));
     });

test('lineSegmentFromPoint should return line segment ends at point p', () => {
  pol.lineSegments.forEach(ls => expect(pol.lineSegmentFrom(ls.p1)).toBe(ls));
});

test('lineSegmentFromPoint should throw error if no line segment exists.', () => {
  expect(() => pol.lineSegmentFrom(Point.fromValues(-1, -1))).toThrow();
});

test('firstIntersection should return none if no intersect', () => {
  const ls = LineSegment.fromValues(-1, -1, -2, -1);
  expect(pol.firstIntersection(ls))
    .toBe(none);
});

test('firstIntersection should return closest point to p1 when multiple intercepts', () => {
  expect(pol.firstIntersection(LineSegment.fromValues(-1, 0.5, 2, 0.5)))
    .toEqual(some(Point.fromValues(0, 0.5)));
});

test('overlap should return false when polygons are separate', () => {
  expect(polygon(
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ]).overlap(
    polygon([
      [3, 0],
      [4, 0],
      [4, 1],
      [3, 1],
    ]))).toBeFalsy();
});

test('overlap should return true when polygons overlap', () => {
  expect(polygon(
    [
      [0, 0],
      [20, 0],
      [20, 20],
      [0, 20],
    ]).overlap(
    polygon([
      [1, 1],
      [2, 1],
      [2, 2],
      [1, 2],
    ]))).toBeTruthy();
});

test('lineSegmentsIntersectThemselves should return false for simple square', () => {
  const points = [[0, 0], [0, 1], [1, 1], [1, 0]].map(p => point(p[0], p[1]));
  const lineSegments = points.reduce((a: LineSegment[], v, i) => {
    const nextIndex = (i + 1) % points.length;
    const ls = new LineSegment(points[i], points[nextIndex]);
    a.push(ls);
    return a;
  },                                 []);

  expect(lineSegmentsIntersectThemselves(lineSegments)).toBeFalsy();
});

function equalLineSegment(x1: number, y1: number, x2: number, y2: number) {
  return (lineSegment: LineSegment) => lineSegment.p1.x === x1
    && lineSegment.p1.y === y1
        && lineSegment.p2.x === x2
        && lineSegment.p2.y === y2;
}
