/**
 * Represents a 2x2 matrix.
 */
import { Vector } from './Vector';

export class Matrix {
  constructor(private elements: number[][]) {
  }

  static fromArray(a: number[]): Matrix {
    return new Matrix([[a[0], a[1]], [a[2], a[3]]]);
  }

  static fromVectors(v1: Vector, v2: Vector): Matrix {
    return new Matrix([[v1.x, v1.y], [v2.x, v2.y]]);
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
  inverse(): Matrix | undefined  {
    const det = this.det();
    if (det === 0) {
      return undefined;
    }

    const unscaled = new Matrix([[this.get(1, 1), -this.get(1, 0)],
                                  [-this.get(0, 1), this.get(0, 0)]]);

    return unscaled.scale(1 / det);
  }

  /**
   * Returns a matrix with the scaled by the given factor.
   * @param factor
   */
  scale(factor: number): Matrix {
    return new Matrix(this.elements.map(a => a.map(v => v * factor)));
  }

  /**
   * Calculates the determinant of the matrix.
   */
  det(): number {
    return Vector.fromArray(this.elements[0]).cross(Vector.fromArray(this.elements[1]));
  }
}