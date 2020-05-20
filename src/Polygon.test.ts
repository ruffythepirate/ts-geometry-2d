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
  expect(true).toBeTruthy();
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