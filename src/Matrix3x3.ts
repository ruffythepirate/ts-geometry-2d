import { Vector } from './Vector';
import { none, Optional, some } from '@ruffy/ts-optional';

/**
 * Represents a 3x3 matrix.
 */
export class Matrix3x3 {
  constructor(private elements: number[][]) {
  }

  /**
   * Returns a rotation matrix with the given degrees. that rotates
   * Vectors clockwise.
   */
  static rotationDegrees(degrees: number): Matrix3x3 {
    const radians = degrees * Math.PI / 180.0;
    const negativeRadians = - radians; // rotation matrix is counter clockwise.
    const components = [
      Math.cos(negativeRadians),
      -Math.sin(negativeRadians),
      0,
      Math.sin(negativeRadians),
      Math.cos(negativeRadians),
      0,
      0, 0, 1,
    ];
    return Matrix3x3.fromArray(components);
  }

  /**
   * Returns a 3x3 Matrix from an array. The element
   * in the array are given in the following places:
   * [(0,0), (1,0), (2,0), (0,1), (1,1), (2,1),
   * (0,2), (1,2), (2,2)]
   */
  static fromArray(a: number[]): Matrix3x3 {
    return new Matrix3x3([[a[0], a[1], a[2]],
                         [a[3], a[4], a[5]],
                         [a[6], a[7], a[8]]]);
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
   * Multiplies this matrix with another matrix.
   */
  timesMatrix(m: Matrix3x3): Matrix3x3 {
    const newMatrixArray: number[][] = [] ;
    for (let i = 0; i < 3; i += 1) {
      newMatrixArray[i] = [];
      for (let j = 0; j < 3; j += 1) {
        newMatrixArray[i][j] = 0;
        for (let k = 0; k < 3; k += 1) {
          newMatrixArray[i][k] += this.elements[i][k] *
            m.elements[k][j];
        }
      }
    }
    return new Matrix3x3(newMatrixArray);
  }

  /**
   * Multiplies this matrix with a vector.
   * @param v
   */
  times(v: Vector): Vector {
    const vArray = v.asArray();

    const newArray = this.elements.map(a => a.reduce((a, v, i) => a + v * vArray[i]));

    return Vector.fromArray(newArray);
  }

  /**
   * Returns an inversed version of this matrix.
   */
  inverse(): Optional<Matrix3x3> {
    throw 'not implemented';
  }

  /**
   * Calculates the determinant of the matrix.
   */
  det(): number {
    let sum = 0;
    for (let i = 0; i < 3; i += 1) {
      let posVal = 1;
      let negVal = 1;
      for (let k = 0; k < 3; k += 1) {
        posVal *= this.get(bound(i + k), k);
        negVal *= this.get(bound(i - k), k);
      }
      sum += posVal - negVal;
    }
    return sum;

    function bound(i: number): number {
      let j = i;
      while (j < 0) {
        j += 3;
      }
      while (j > 2) {
        j -= 3;
      }
      return j;
    }
  }
}
