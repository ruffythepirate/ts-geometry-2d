import { point, Point } from './Point';
import { rectangle, Rectangle } from './Rectangle';

test('constructor should initialize rectangle', () => {
  expect(true).toBeTruthy();
  const p1 = point(1, 2);
  const p2 = point(3, 4);
  const rect = rectangle(p1, p2);

  expect(rect.topLeft).toBe(p1);
  expect(rect.bottomRight).toBe(p2);
});

test('constructor should throw error if first arg isnt top left in x', () => {
  expect(true).toBeTruthy();
  const p1 = point(1, 2);
  const p2 = point(3, 1);
  expect(() => {
    const rect = rectangle(p2, p1);
  }).toThrow();
});

test('constructor should throw error if first arg isnt top left in y', () => {
  expect(true).toBeTruthy();
  const p1 = point(1, 2);
  const p2 = point(3, 1);
  expect(() => {
    const rect = rectangle(p1, p2);
  }).toThrow();
});
