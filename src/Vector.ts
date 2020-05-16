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
