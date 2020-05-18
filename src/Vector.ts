export class Vector {
  constructor(public x: number, public y: number) {
  }

  /**
   * Gives the dot product between the two vectors.
   * @param v2
   */
  dot(v2: Vector) : number {
    return this.x * v2.x + this.y * v2.y;
  }

  /**
   * Returns the scalar value of the cross product between this vector and v2.
   * Normally cross product is performed in three dimensions, but here we assume
   * z value equals 0, and returns then the size of the resulting z dimension.
   * @param v2
   */
  cross(v2: Vector) : number {
    return this.x * v2.y - this.y * v2.x;
  }

  /**
   * Returns a new vector that is this vector multiplied by the given scalar.
   * @param factor
   */
  scale(factor: number) : Vector {
    return new Vector(this.x * factor, this.y * factor);
  }

  /**
   * This vector dot producted with itself.
   */
  square() : number {
    return this.dot(this);
  }

  /**
   * The euclidean length of this vector.
   */
  norm2(): number {
    return Math.sqrt(this.square());
  }
}
