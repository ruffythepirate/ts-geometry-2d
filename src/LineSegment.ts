import { Point } from './Point';
import { Line } from './Line';
import { Vector } from './Vector';
import { Interval } from './Interval';
import { Optional } from '@ruffy/ts-optional';

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
   * Creates a LineSegment from an array of numbers. The array must be at least 4 elements long
   * and these first 4 values will be used as [x1, y1, x2, y2].
   */
  static fromArray(a: number[]) {
    return new LineSegment(new Point(a[0], a[1]), new Point(a[2], a[3]));
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
   * Returns boolean whether this segment is placed to the right of given point.
   * This is defined as if whether a line segment starting at point p, and going
   * to x = infinity, intersect this line segment.
   * If the point is on the line segment, false is returned,
   * @param p
   * Point to check if line segemnt is to the right of
   */
  rightOfPoint(p: Point) : boolean {
    const heightInterval = this.getHeightIntervalIncludingP1ExcludingP2();
    if (! heightInterval.contains(p.y)) {
      return false;
    }
    const [topPoint, bottomPoint] = this.p1.y > this.p2.y ? [this.p1, this.p2] : [this.p2, this.p1];
    return p.minus(topPoint).cross(bottomPoint.minus(topPoint)) >= 0;
  }

  /**
   * Returns new line segment that is like this segment transposed.
   * @param x
   * @param y
   */
  transpose(x: number, y: number): LineSegment {
    return new LineSegment(this.p1.transpose(x, y), this.p2.transpose(x, y));
  }

  private getHeightIntervalIncludingP1ExcludingP2() : Interval {
    if (this.p1.y < this.p2.y) {
      return new Interval(this.p1.y, this.p2.y, true, false);
    }
    return new Interval(this.p2.y, this.p1.y, false, true);

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
  intersect(ls2: LineSegment) : Optional<Point> {
    const l1 = this.asLine();
    const l2 = ls2.asLine();

    const intersect = l1.intersect(l2);

    return intersect.filter(intersect => this.containsPoint(intersect)
      && ls2.containsPoint(intersect));
  }

  /**
   * Returns a new Line Segment where p1 equals the new p instead.
   * @param p
   */
  startFrom(p: Point) : LineSegment {
    return new LineSegment(p, this.p2);
  }

  /**
   * Returns if the given point exists on this line segment or not.
   * @param p
   */
  containsPoint(p: Point): boolean {
    const p1p = p.minus(this.p1);
    const p1p2 = this.p2.minus(this.p1);
    const dotProd = p1p.dot(p1p2);
    const crossProd = p1p.cross(p1p2);
    return dotProd > 0
    && dotProd <= p1p2.square()
    && crossProd * crossProd < 0.001;
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
