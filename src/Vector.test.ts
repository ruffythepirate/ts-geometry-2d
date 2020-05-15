import { Vector } from './Vector';

let v = new Vector(1, 2);
beforeEach(() => {
  v = new Vector(1, 2);
});
test('constructor should create Vector', () => {

  expect(v.x).toBe(1);
  expect(v.y).toBe(2);
});

test('dot should do dot product with vector', () => {
  const scalar = v.dot(v);

  expect(scalar).toBe(5);
});

test('scale should return new vector by multiplying the vector with the factor', () => {
  const nv = v.scale(2);

  expect(v).not.toEqual(nv);
  expect(nv.x).toBe(2);
  expect(nv.y).toBe(4);
});

test('square should return vector dot itself.', () => {
  expect(v.square()).toBe(v.dot(v));
});

test('norm2 should return euklidean length of vector.', () => {
  expect(v.norm2()).toBe(Math.sqrt(5));
});
