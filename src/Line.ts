import { Vector } from './Vector';
import { Point } from './Point';
import { Matrix } from './Matrix';

/**
 * A line is represented by a point and a vector, it is of infinite length.
 */
export class Line {
  constructor(public p: Point, public v: Vector) {
  }

  /**
   * Finds what point on this line is closest to the input point.
   * @param p2
   * Point that we want to find closest point for.
   */
  project(p2: Point) : Point {
    const factor = this.projectFactor(p2);
    return this.p.plus(this.v.scale(factor));
  }

  /**
  * Finds the point where two lines intersect returns undefined if the lines are parallel.:w
   * @param l2
   * Other line we want to check intersection with.
   */
  intersect(l2: Line): Point | undefined {
    const matrix = Matrix.fromVectors(this.v, l2.v);
    const inv = matrix.inverse();

    if (inv === undefined) {
      return undefined;
    }
    const factor =  inv.times(l2.p.minus(this.p)).x;

    return this.p.plus(this.v.scale(factor));
  }

  /**
   * Returns what number you would have to multiply the lines vector with to reach the
   * point returned by project when starting from the line's point.
   * @param p2
   * Point whose projection we get the factor for.
   */
  projectFactor(p2: Point) : number {
    const pp2 = p2.minus(this.p);
    return pp2.dot(this.v) / this.v.square();
  }

  /**
   * Gives the minimum distance squared from p2 to the line.
   * This function exists because it doesn't require any Math.sqrt, and is hence a more efficient
   * way if one want to compare distances between many points.
   * @param p2
   * Point to get minimum distance for.
   */
  projectDistanceSquare(p2: Point) : number {
    const proj = this.project(p2);
    return proj.minus(p2).square();
  }

  /**
   * Gives the minimum distance from p2 to the line.
   * @param p2
   * Point to get minimum distance for.
   */
  projectDistance(p2: Point) : number {
    return Math.sqrt(this.projectDistanceSquare(p2));
  }
}
