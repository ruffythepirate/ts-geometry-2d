import {Point} from './Point'
import {LineSegment} from './LineSegment'


const ls = new LineSegment(new Point(0,0), new Point(1,0))

test('constructor should create line segment', () => {
  expect(ls.p1).toEqual(new Point(0,0))
  expect(ls.p2).toEqual(new Point(1,0))
})

test('closestPoint should find closest point', () => {
  expect(ls.closestPoint(new Point(0.5, -1))).toEqual(new Point(0.5, 0))
  expect(ls.closestPoint(new Point(-1, -1))).toEqual(new Point(0, 0))
  expect(ls.closestPoint(new Point(2, -1))).toEqual(new Point(1, 0))
})
