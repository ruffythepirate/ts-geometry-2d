import { Point } from './Point';
import GlobalConfig from './GlobalConfig';

export class Vector {
  constructor(public x: number, public y: number) {
  }

  static fromArray(a: number[]) {
    return new Vector(a[0], a[1]);
  }

  static null = new Vector(0, 0);

  /**
   * Gives the dot product between the two vectors.
   * @param v2
   */
  dot(v2: Vector) : number {
    return this.x * v2.x + this.y * v2.y;
  }

  /**
   * Returns a point with the same x and y as this vector.
   */
  asPoint() : Point {
    return new Point(this.x, this.y);
  }

  /**
   * Return true if this vector is pointing in the same direction
   * as the other vector.
   */
  parallel(other: Vector): boolean {
    return Math.abs(this.cross(other)) <= GlobalConfig.precisionSquared;
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
   * Returns the perpendicular component vector of this vector compared to another vector.
   */
  perpendicularComponentTo(other: Vector): Vector {
    if (other.isNullVector()) {
      return this;
    }
    const projectedOnto = this.projectOnto(other);
    return this.minus(projectedOnto);
  }

  /**
   * Returns this vector projected onto the other vector.
   */
  projectOnto(other: Vector): Vector {
    if (other.isNullVector()) {
      return this;
    }
    const otherNormed = other.normed();
    const factor = this.dot(otherNormed);
    return otherNormed.scale(factor);
  }

  /**
   * Returns this vector in string form.
   */
  toString(): String {
    return `[${this.x}, ${this.y}]`;
  }

  /**
   * Returns the clockwise perpendicular vector to this one.
   * A perpendicular vector can be found by defining a vector where
   * the dot product equals 0. Now, there will be two perpendicular vectors,
   * one that is defined clockwise, and one that is found counter clockwise.
   */
  clockwisePerpendicular(): Vector {
    return new Vector(this.y, - this.x);
  }

  /**
   * Returns a vector pointing in the opposite direction of this vector.
   */
  reverse(): Vector {
    return new Vector(-this.x, -this.y);
  }

  /**
   * Returns a vector that is normalized to have norm2 = 1, pointing in the same
   * direction as this vector.
   */
  normed() : Vector {
    const norm2 = this.norm2();
    if (norm2 === 0) {
      throw Error('Can not norm a vector of size 0!');
    }
    return new Vector(this.x / norm2, this.y / norm2);
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
   * Returns whether this vector is the null vector (x and y components are null) or not.
   */
  isNullVector(): boolean {
    return this.x === 0 && this.y === 0;
  }

  /**
   * The euclidean length of this vector.
   */
  norm2(): number {
    return Math.sqrt(this.square());
  }

  /**
   * Returns the vector that is this vector plus another one.
   */
  plus(other: Vector): Vector {
    return vector(this.x + other.x, this.y + other.y);
  }

  /**
   * Returns this vector minus the other vector.
   */
  minus(other: Vector): Vector {
    return this.plus(other.reverse());
  }
}

/**
  * Creates a vector
  */
export function vector(x: number, y: number) {
  return new Vector(x, y);
}
