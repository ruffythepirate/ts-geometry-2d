import { Point, point } from './Point';
import { vector, Vector } from './Vector';
import { Polygon, polygon, lineSegmentsIntersectThemselves, isClockwise } from './Polygon';
import { LineSegment } from './LineSegment';
import { none, some } from '@ruffy/ts-optional';
import { rectangle } from './Rectangle';

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

test('containsPoint should return false if point is one border of Polygon.', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(point(0, 0))).toBeFalsy();
  expect(pol.containsPoint(point(1, 0))).toBeFalsy();
  expect(pol.containsPoint(point(0, 1))).toBeFalsy();
  expect(pol.containsPoint(point(1, 1))).toBeFalsy();
  expect(pol.containsPoint(point(0, 0.5))).toBeFalsy();
  expect(pol.containsPoint(point(0.5, 0))).toBeFalsy();
  expect(pol.containsPoint(point(1, 0.5))).toBeFalsy();
  expect(pol.containsPoint(point(0.5, 1))).toBeFalsy();
});

test('containsPoint should return false if point is outside', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(1.5, 0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, -0.5))).toBeFalsy();
  expect(pol.containsPoint(Point.fromValues(0.5, 1.5))).toBeFalsy();
});

test('containsPoint should handle triangle', () => {
  const POINTS: Point[] = [new Point(0.153, 0.048), new Point(0.17, 0.7), new Point(0.692, 0.308)];
  const TRIANGLE: Polygon = Polygon.fromPoints(POINTS);
  expect(TRIANGLE.containsPoint(new Point(0.2, 0.307))).toBeTruthy();
  expect(TRIANGLE.containsPoint(new Point(0.2, 0.308))).toBeTruthy();
  expect(TRIANGLE.containsPoint(new Point(0.2, 0.309))).toBeTruthy();
});

test('containsPoint should return false if point is tangent to line', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.containsPoint(Point.fromValues(-0.5, 1))).toBeFalsy();
});

test('toString should return string', () => {
  const pol = polygon([[0, 0], [1, 0], [1, 1], [0, 1]]);
  expect(pol.toString()).toBeDefined();
});

test('equals should return true when points are the same', () => {
  const pol = polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
  expect(pol.equals(pol)).toBeTruthy();
  const otherPol = pol.translate(0, 0);
  expect(pol.equals(otherPol)).toBeTruthy();
});

test('equals should return true when points are the same', () => {
  const pol = polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
  const pol2 = polygon([[0, 1], [1, 1], [1, 0], [0, 0]]);
  const pol3 = polygon([[1, 1], [1, 0], [0, 0], [0, 1]]);
  expect(pol.equals(pol2)).toBeTruthy();
  expect(pol.equals(pol3)).toBeTruthy();
});

test('equals should return false when points are not the same', () => {
  const pol = polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
  const pol2 = polygon([[0, 0], [0, 1], [1, 1], [1, 0], [0.5, -1]]);
  expect(pol.translate(0.5, 0).equals(pol)).toBeFalsy();
  expect(pol.equals(pol2)).toBeFalsy();
});

test('bounds should return bounds that encompasses polygon', () => {
  const pol = polygon([[1, 0], [2, 1], [1, 2], [0, 1]]);

  expect(pol.bounds()).toEqual(rectangle(0, 0, 2, 2));
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

  expect(newPol.equals(expectedPolygon)).toBeTruthy();
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
  const pol2 = pol1.translate(2, 0);

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
  const pol2 = pol1.translate(1, 0);

  expect(pol1.merge(pol2).lineSegments.length).toBe(8);
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

test('separationVector should return given polygon if no overlap found.', () => {
  const pol2 = pol.translate(3, 0);

  expect(pol.separationVector(pol2, vector(1, 0))).toEqual(Vector.null);
});

[
  { direction: vector(1, 0), expectedMove: vector(1, 0) },
  { direction: vector(2, 0), expectedMove: vector(1, 0) },
].forEach(({ direction, expectedMove }) => {
  test(`separationVector should move polygon in direction ${direction}`, () => {
    expect(pol.separationVector(pol, direction)).toEqual(
      expectedMove);
  });
});

[
  { direction: vector(1, 0), expectedMove: vector(2, 0) },
].forEach(({ direction, expectedMove }) => {
  test(`separationVector should manage complicated shapes in direction ${direction}.`, () => {
    const pol1 = rectangle(0, 0, 2, 2).toPolygon();
    const pol2 = polygon([[1, 0], [2, 1], [1, 2], [0, 1]]);

    const result = pol2.separationVector(pol1, direction);
    expect(result).toEqual(expectedMove);
  });
});

test('bounds should return outer bounds', () => {
  const pol = polygon([[1, 0], [2, 1], [1, 2], [0, 1]]);

  expect(pol.bounds()).toEqual(rectangle(0, 0, 2, 2));
  expect(rectangle(0, 0, 2, 2).toPolygon().bounds()).toEqual(rectangle(0, 0, 2, 2));
});

[
  { p: point(0, 0), v: vector(1, 0), expected: some(0) },
  { p: point(1, 0), v: vector(1, 0), expected: some(1) },
  { p: point(-5, 0), v: vector(1, 0), expected: some(5) },
  { p: point(0, -5), v: vector(0, 1), expected: some(5) },
  { p: point(0, 5), v: vector(0, 1), expected: none },
].forEach(({ p, v, expected }) => {
  test(`distanceToPerimiter should give ${expected} when going from ${p} in direction ${v}.`,
       () => {
         const pol = rectangle(0, 0, 2, 2).toPolygon();

         const result = pol.distanceToPerimiter(p, v);

         expect(result).toEqual(expected);
       });
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

test('overlap should be true for self', () => {
  const poly = polygon(
    [
      [0, 0],
      [20, 0],
      [20, 20],
      [0, 20],
    ]);
  expect(poly.overlap(poly)).toBeTruthy();
});

test('overlap should return true when polygons contain each other', () => {
  const pol1 = polygon(
    [
      [0, 0],
      [20, 0],
      [20, 20],
      [0, 20],
    ]);

  const pol2 = polygon([
      [1, 1],
      [2, 1],
      [2, 2],
      [1, 2],
  ]);
  expect(pol1.overlap(pol2)).toBeTruthy();
  expect(pol2.overlap(pol1)).toBeTruthy();
});

test('overlap should return true when polygon lines intersect', () => {
  const pol1 = polygon(
    [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ]);
  let pol2 = pol1.translate(-1, 0);

  expect(pol1.overlap(pol2)).toBeTruthy();
  expect(pol2.overlap(pol1)).toBeTruthy();

  pol2 = polygon(
    [
      [-1, 0],
      [4, 0],
      [4, 1],
      [-1, 1],
    ]);
  expect(pol1.overlap(pol2)).toBeTruthy();
});

test('overlap should return false when polygons are adjacent', () => {
  const pol1 = polygon(
    [
      [0, 0],
      [2, 0],
      [2, 2],
      [0, 2],
    ]);
  const pol2 = pol1.translate(-2, 0);
  expect(pol1.overlap(pol2)).toBeFalsy();
});

test('translate keeps orientation of lines', () => {
  const pol = polygon([[0, 0], [0, 1], [1, 1], [1, 0]]);
  const newPol = pol.translate(0, 0);
  expect(pol.equals(newPol)).toBeTruthy();
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

test('isClockwise should be false when not clockwise', () => {
  const points = [[0, 0], [1, 0], [1, 1], [0, 1]].map(p => point(p[0], p[1]));
  const lineSegments = points.reduce((a: LineSegment[], v, i) => {
    const nextIndex = (i + 1) % points.length;
    const ls = new LineSegment(points[i], points[nextIndex]);
    a.push(ls);
    return a;
  },                                 []);

  expect(isClockwise(lineSegments)).toBeFalsy();
});

test('isClockwise should be true when clockwise', () => {
  const points = [[0, 0], [0, 1], [1, 1], [1, 0]].map(p => point(p[0], p[1]));
  const lineSegments = points.reduce((a: LineSegment[], v, i) => {
    const nextIndex = (i + 1) % points.length;
    const ls = new LineSegment(points[i], points[nextIndex]);
    a.push(ls);
    return a;
  },                                 []);

  expect(isClockwise(lineSegments)).toBeTruthy();
});

function equalLineSegment(x1: number, y1: number, x2: number, y2: number) {
  return (lineSegment: LineSegment) => lineSegment.p1.x === x1
    && lineSegment.p1.y === y1
        && lineSegment.p2.x === x2
        && lineSegment.p2.y === y2;
}
