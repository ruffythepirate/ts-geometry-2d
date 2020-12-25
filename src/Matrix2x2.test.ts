import { Matrix2x2 } from './Matrix2x2';
import { Vector } from './Vector';
import { none, some } from '@ruffy/ts-optional';

test('constructor should create Matrix', () => {

  const m = new Matrix2x2([[0, 1],
      [2, 0]]);
  expect(m.get(0, 0)).toBe(0);
  expect(m.get(0, 1)).toBe(1);
  expect(m.get(1, 0)).toBe(2);
  expect(m.get(1, 1)).toBe(0);
});

test('inverse should return none if inverse is not defined.', () => {
  const m = new Matrix2x2([[0, 0], [0, 0]]);
  expect(m.inverse()).toBe(none);
});

test('inverse should inverse a matrix.', () => {
  const m = new Matrix2x2([[1, 2], [3, 4]]);

  expect(m.inverse()).toEqual(some(new Matrix2x2([[-2, 1.5], [1, -0.5]])));
});

test('det should return determinant of matrix', () => {
  const m = Matrix2x2.fromArray([1, 0, 0, 1]);

  expect(m.det()).toEqual(1);
});

test('scale should multiply each element by factor', () => {
  const m = Matrix2x2.fromArray([1, 0, 0, 1]);

  expect(m.scale(0.5).get(0, 0)).toEqual(0.5);
});

test('times should multiply vector with matrix', () => {
  const m = Matrix2x2.fromArray([2, 0 , 0, 1]);
  const v = new Vector(2, 3);

  expect(m.times(v)).toEqual(new Vector(4, 3));
});
