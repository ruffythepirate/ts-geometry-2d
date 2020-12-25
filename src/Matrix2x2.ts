import { Vector } from './Vector';
import { none, Optional, some } from '@ruffy/ts-optional';

/**
 * Represents a 2x2 matrix.
 */
export class Matrix2x2 {
  constructor(private elements: number[][]) {
  }

  /**
   * Returns a rotation matrix with the given degrees. that rotates
   * Vectors clockwise.
   */
  static rotationDegrees(degrees: number): Matrix2x2 {
    const radians = degrees * Math.PI / 180.0;
    const negativeRadians = - radians; // rotation matrix is counter clockwise.
    const components = [
      Math.cos(negativeRadians),
      -Math.sin(negativeRadians),
      Math.sin(negativeRadians),
      Math.cos(negativeRadians),
    ];
    return Matrix2x2.fromArray(components);
  }

  /**
   * Returns a 2x2 Matrix from an array. The element
   * in the array are given in the following places:
   * [(0,0), (1,0), (0,1), (1,1)]
   */
  static fromArray(a: number[]): Matrix2x2 {
    return new Matrix2x2([[a[0], a[1]], [a[2], a[3]]]);
  }

  static fromVectors(v1: Vector, v2: Vector): Matrix2x2 {
    return new Matrix2x2([[v1.x, v1.y], [v2.x, v2.y]]);
  }

    /**
     * Returns the element in the given position.
     * @param y
     * The y of the element.
     * @param x
     * The x of the element
     */
  get(y: number, x: number) {
    return this.elements[y][x];
  }

  /**
   * Multiplies this matrix with a vector.
   * @param v
   */
  times(v: Vector): Vector {
    return new Vector(this.get(0, 0) * v.x + this.get(0, 1) * v.y,
                      this.get(1, 0) * v.x + this.get(1, 1) * v.y);

  }

  /**
   * Returns an inversed version of this matrix.
   */
  inverse(): Optional<Matrix2x2> {
    const det = this.det();
    if (det === 0) {
      return none;
    }

    const unscaled = new Matrix2x2([[this.get(1, 1), -this.get(1, 0)],
                                  [-this.get(0, 1), this.get(0, 0)]]);

    return some(unscaled.scale(1 / det));
  }

  /**
   * Returns a matrix with the scaled by the given factor.
   * @param factor
   */
  scale(factor: number): Matrix2x2 {
    return new Matrix2x2(this.elements.map(a => a.map(v => v * factor)));
  }

  /**
   * Calculates the determinant of the matrix.
   */
  det(): number {
    return Vector.fromArray(this.elements[0]).cross(Vector.fromArray(this.elements[1]));
  }
}
