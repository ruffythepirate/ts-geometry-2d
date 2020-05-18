import { Point } from './Point';

import { Polygon } from './Polygon';
import { LineSegment } from './LineSegment';

test('constructor should initialize polygon', () => {
  const pol = createPolygon([[0, 0], [0, 1], [1, 1], [1, 0]]);

  expect(pol.lineSegments.length).toBe(4);
});

test('constructor should guarantee that line segments are clockwise oriented', () => {
  const pol = createPolygon([[0, 0], [1, 0], [1, 1], [0, 1]]);

  expect(pol.lineSegments.find(
      equalLineSegment(0, 0, 0, 1)),
  ).toBeDefined();
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