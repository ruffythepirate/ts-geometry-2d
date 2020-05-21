import { Matrix } from './Matrix';
import { Vector } from './Vector';

test('constructor should create Matrix', () => {

  const m = new Matrix([[0, 1],
      [2, 0]]);
  expect(m.get(0, 0)).toBe(0);
  expect(m.get(0, 1)).toBe(1);
  expect(m.get(1, 0)).toBe(2);
  expect(m.get(1, 1)).toBe(0);
});

test('inverse should return undefined if inverse is not defined.', () => {
  const m = new Matrix([[0, 0], [0, 0]]);
  expect(m.inverse()).toBe(undefined);
});

test('inverse should inverse a matrix.', () => {
  const m = new Matrix([[1, 2], [3, 4]]);

  expect(m.inverse()).toEqual(new Matrix([[-2, 1.5], [1, -0.5]]));
});

test('det should return determinant of matrix', () => {
  const m = Matrix.fromArray([1, 0, 0, 1]);

  expect(m.det()).toEqual(1);
});

test('scale should multiply each element by factor', () => {
  const m = Matrix.fromArray([1, 0, 0, 1]);

  expect(m.scale(0.5).get(0, 0)).toEqual(0.5);
});

test('times should multiply vector with matrix', () => {
  const m = Matrix.fromArray([2, 0 , 0, 1]);
  const v = new Vector(2, 3);

  expect(m.times(v)).toEqual(new Vector(4, 3));
});