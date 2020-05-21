import { Vector } from './Vector';

export class Point {
  constructor(public x:number, public y:number) {
  }

  static fromValues(x: number, y: number) {
    return new Point(x, y);
  }

  /**
   * Returns the vector going from the inputted point p, to this point.
   * @param p
   */
  minus(p : Point) :Vector {
    return new Vector(this.x - p.x, this.y - p.y);
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
   * Returns new point that is transposed by x, y.
   * Same function as plus, but here taking number instead of vector.
   * @param x
   * @param y
   */
  transpose(x: number, y: number) {
    return new Point(this.x + x, this.y + y);
  }
}
