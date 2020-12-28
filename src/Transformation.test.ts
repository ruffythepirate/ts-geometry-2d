import { point } from './Point';
import { Transformation } from './Transformation';

test('Transformation should move point', () => {
  const p = point(0, 0);

  const t = Transformation.builder()
  .withTranslation(1, 2)
  .build();

  const res = t.applyToPoint(p);

  expect(res).toEqual(point(1, 2));
});

test('Transformation should rotate and move point', () => {
  const p = point(0, 0);

  const t = Transformation.builder()
  .withTranslation(2, 0)
  .withRotationDegrees(90)
  .build();

  const res = t.applyToPoint(p);

  expect(res.x).toBeCloseTo(0, 2);
  expect(res.y).toBeCloseTo(-2, 2);
});

test('Transformation should scale point', () => {
  const p = point(1, 1);

  const t = Transformation.builder()
    .withScale(2, 3)
    .build();

  const res = t.applyToPoint(p);

  expect(res.x).toBeCloseTo(2, 2);
  expect(res.y).toBeCloseTo(3, 2);
});

test('Transformation should rotate point', () => {
  const p = point(1, 0);

  const t = Transformation.builder()
  .withRotationDegrees(90)
  .build();

  const res = t.applyToPoint(p);

  expect(res.x).toBeCloseTo(0, 2);
  expect(res.y).toBeCloseTo(-1, 2);
});
