import { point } from './Point';
import { Transformation } from './Transformation';
import { Polygon } from './Polygon';
import { vector } from './Vector';

test('Transformation should move point', () => {
  const p = point(2, 0);

  const t = Transformation.builder()
  .withTranslation(1, 2)
  .build();

  const res = t.applyToPoint(p);

  expect(res).toEqual(point(3, 2));
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

test('Transformation should move polygon', () => {
  const pol = Polygon.fromPoints([
    point(0, 0),
    point(1, 0),
    point(1, 1),
    point(0, 1),
  ]);

  const t = Transformation.builder()
  .withTranslation(2, 0)
  .build();

  const res = t.applyToPolygon(pol);

  expect(res.equals(pol.translate(2, 0))).toBeTruthy();
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

test('Transformation should rotate point according to vector', () => {
  const t = Transformation.builder()
  .withVectorRotation(vector(0, -2))
  .build();

  expect(t.applyToPoint(point(1, 0))).toEqual(point(0, -1));
  expect(t.applyToPoint(point(0, 1))).toEqual(point(1, 0));
  expect(t.applyToPoint(point(1, 1))).toEqual(point(1, -1));

});
