import { Matrix3x3 } from './Matrix3x3';
import { Vector } from './Vector';
import { none, some } from '@ruffy/ts-optional';

test('constructor should create Matrix', () => {

  const m = new Matrix3x3([[0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
  ]);
  expect(m.get(0, 0)).toBe(0);
  expect(m.get(0, 1)).toBe(1);
  expect(m.get(0, 2)).toBe(2);
  expect(m.get(1, 0)).toBe(3);
  expect(m.get(1, 1)).toBe(4);
  expect(m.get(1, 2)).toBe(5);
  expect(m.get(2, 0)).toBe(6);
  expect(m.get(2, 1)).toBe(7);
  expect(m.get(2, 2)).toBe(8);
});

// test('inverse should return none if inverse is not defined.', () => {
//   const m = new Matrix3x3([[0, 0], [0, 0]]);
//   expect(m.inverse()).toBe(none);
// });

// test('inverse should inverse a matrix.', () => {
//   const m = new Matrix3x3([[1, 2], [3, 4]]);

//   expect(m.inverse()).toEqual(some(new Matrix3x3([[-2, 1.5], [1, -0.5]])));
// });

[
  { ma: [1, 0, 0, 0, 1, 0, 0, 0, 1], d: 1 },
  { ma: [1, 0, 0, 0, -1, 0, 0, 0, 1], d: -1 },
  { ma: [1, 2, 3, 4, 5, 6, 7, 8, 10], d: -3 },
]
.forEach(
  ({ ma, d }) => {
    test('det should return determinant of matrix', () => {
      const m = Matrix3x3.fromArray(ma);

      expect(m.det()).toEqual(d);
    });

  });

test('timesMatrix should multiply matrix with matrix', () => {
  const m = Matrix3x3.fromArray([1, 0 , 0,
    0, 2, 0,
    0, 0, 3]);

  expect(m.timesMatrix(m)).toEqual(
    Matrix3x3.fromArray([1, 0 , 0,
      0, 4, 0,
      0, 0, 9]),
  );
});

test('times should multiply vector with matrix', () => {
  const m = Matrix3x3.fromArray([1, 0 , 0,
    0, 2, 0,
    0, 0, 3]);
  const v = new Vector(1, 1, 1);

  expect(m.times(v)).toEqual(new Vector(1, 2, 3));
});

test('times should multiply vector with matrix', () => {
  const m = Matrix3x3.fromArray([1, 0 , 0,
    0, 2, 0,
    0, 0, 3]);
  const v = new Vector(1, 1, 1);

  expect(m.times(v)).toEqual(new Vector(1, 2, 3));
});
