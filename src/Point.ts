import { Vector } from './Vector';
import { Line } from './Line';
import GlobalConfig from './GlobalConfig';
import { Matrix2x2 } from './Matrix2x2';

/**
 * Represents a single point with x, y coordinates.
 */
export class Point {
  constructor(public x:number, public y:number) {
  }

  static fromValues(x: number, y: number) {
    return point(x, y);
  }

  /**
   * Returns the vector going from the inputted point p, to this point.
   * @param p
   */
  minus(p : Point) :Vector {
    return new Vector(this.x - p.x, this.y - p.y);
  }

  /**
   * Defines a line by using this point and a vector.
   */
  asLine(v: Vector): Line {
    return new Line(this, v);
  }

  /**
   * Returns the coordinates of this point as a vector.
   */
  asVector(): Vector {
    return new Vector(this.x, this.y);
  }

  /**
   * Returns the point reached when starting at this point and then moving according to vector.
   * @param v
   */
  plus(v: Vector) : Point {
    return new Point(this.x + v.x, this.y + v.y);
  }

  /**
   * Returns the distance between this point and p2 squared
   * @param p2
   */
  distanceSquare(p2: Point): number {
    return p2.minus(this).square();
  }

  /**
   * Returns new point that is moved by x, y.
   * Same function as plus, but here taking number instead of vector.
   * @param x
   * @param y
   */
  translate(x: number, y: number) {
    return new Point(this.x + x, this.y + y);
  }

  /**
   * Rotates this point around a pivotPoint by a certain number of degrees.
   * @param pivotPoint
   * The point around which this point should rotate
   * @param degrees
   * The number of degrees that the point should rotate (a circle covers 360 degrees,
   * negative values are ok)
   */
  rotate(pivotPoint: Point, degrees: number): Point {
    const rotationMatrix = Matrix2x2.rotationDegrees(degrees);

    const rotated = rotationMatrix.times([this.x, this.y]);
    return new Point(rotated[0], rotated[1]);
  }

  /**
   * Returns true if this point and the other have the same coordinates within
   * GlobalConfig.precision error.
   * @param other
   * The other point to compare with.
   */
  equals(other: Point): boolean {
    return Math.abs(this.x - other.x) < GlobalConfig.precision
    && Math.abs(this.y - other.y) < GlobalConfig.precision;
  }

  /**
   * Gives a readable string representing this point.
   */
  toString(): string {
    return `[${this.x}, ${this.y}]`;
  }
}

/**
 * Creates a point.
 */
export function point(x: number, y: number): Point {
  return new Point(x, y);
}
