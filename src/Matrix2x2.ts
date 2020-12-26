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
  times(v: number[]): number[] {
    return [this.get(0, 0) * v[0] + this.get(0, 1) * v[1],
      this.get(1, 0) * v[0] + this.get(1, 1) * v[1]];

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
    return this.elements[0][0] * this.elements[1][1] -
      this.elements[1][0] * this.elements[0][1];
  }
}
