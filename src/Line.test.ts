import { Line, line } from './Line';
import { Vector, vector } from './Vector';
import { Point, point } from './Point';
import { none, some } from '@ruffy/ts-optional';

let l = new Line(new Point(0, 0), new Vector(1, 0));

beforeEach(() => {
  l = new Line(new Point(0, 0), new Vector(1, 0));
});

test('constructor should create Line', () => {
  expect(l.p).toEqual(new Point(0, 0));
  expect(l.v).toEqual(new Vector(1, 0));
});

test('project should project point to line', () => {
  expect(l.project(new Point(0.5, -1))).toEqual(new Point(0.5, 0));
});

test('projectFactor should get factor for v to reach projection from p', () => {
  expect(l.projectFactor(new Point(0.5, -1))).toEqual(0.5);
});

test('projectDistanceSquare should get square of projection distance', () => {
  expect(l.projectDistanceSquare(new Point(0.5, -2))).toBe(4);
});

test('projectDistance should get projection distance', () => {
  expect(l.projectDistance(new Point(0.5, -2))).toBe(2);
});

test('line should throw exception if null vector', () => {
  expect(() => {
    line(0, 0, 0, 0);
  }).toThrow();
});

test('line should define line', () => {
  expect(line(0, 0, 1, 0)).toEqual(new Line(point(0, 0), vector(1, 0)));
});

test('intersect should return none if lines are parallel', () => {
  expect(l.intersect(new Line(new Point(0, 1), new Vector(1, 0)))).toBe(none);
});

test('intersect should return intersecting point', () => {
  const l2 = new Line(new Point(1, 1), new Vector(0, 1));

  expect(l.intersect(l2)).toEqual(some(new Point(1, 0)));
});
