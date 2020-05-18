import { Point } from './Point';
import { Line } from './Line';
import { Vector } from './Vector';

/**
 * A LineSegment is defined by two points, it represents the line between these points.
 */
export class LineSegment {
  constructor(public p1: Point, public p2:Point) {
  }

  static fromValues(x1: number, y1: number, x2: number, y2: number) {
    return new LineSegment(new Point(x1, y1), new Point(x2, y2));
  }

  /**
   * Gets the closest point on the line segment to the given point.
   * @param p2
   * Point to get closest point for.
   */
  closestPoint(p2: Point): Point {
    const l = new Line(this.p1, this.p2.minus(this.p1));
    const factor = l.projectFactor(p2);
    if (factor >= 1) {
      return this.p2;
    }  if (factor <= 0) {
      return this.p1;
    }
    return l.project(p2);
  }

  /**
   * Returns the vector defined by going from point p1 to point p2
   */
  asVector(): Vector {
    return this.p2.minus(this.p1);
  }

  /**
   * Returns the point where the given line segments intersect, if such point exists.
   * @param ls2
   */
  intersects(ls2: LineSegment) : Point | undefined {
    const l1 = this.asLine();
    const l2 = ls2.asLine();

    const intersect = l1.intersects(l2);

    if (intersect === undefined) {
      return undefined;
    }

    if (! this.containsPoint(intersect as Point) || !ls2.containsPoint(intersect as Point)) {
      return undefined;
    }

    return intersect;
  }

  /**
   * Returns if the given point exists on this line segment or not.
   * @param p
   */
  containsPoint(p: Point): Boolean {
    const p1p = p.minus(this.p1);
    const p1p2 = this.p2.minus(this.p1);
    return p1p.square() <= p1p2.square() && p1p.cross(p1p2) === 0;
  }

  asLine() : Line {
    return new Line(this.p1, this.p2.minus(this.p1));
  }

  /**
   * Returns a new Line Segment where p1 and p2 have changed places.
   */
  flip(): LineSegment {
    return new LineSegment(this.p2, this.p1);
  }
}
