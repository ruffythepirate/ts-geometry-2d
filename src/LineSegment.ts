import { Point } from './Point';
import { Line } from './Line';

/**
 * A LineSegment is defined by two points, it represents the line between these points.
 */
export class LineSegment {
  constructor(public p1: Point, public p2:Point) {
  }

  /**
   * Gets the closest point on the line segment to the given point.
   * @param p2
   * Point to get closest point for.
   */
  closestPoint(p2: Point) {
    const l = new Line(this.p1, this.p2.minus(this.p1));
    const factor = l.projectFactor(p2);
    if (factor >= 1) {
      return this.p2;
    }  if (factor <= 0) {
      return this.p1;
    }
    return l.project(p2);
  }
}
