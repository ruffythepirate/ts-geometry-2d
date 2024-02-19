import { Point, point } from './Point';
import { Vector } from './Vector';
import { Optional, none, some } from '@ruffy/ts-optional';
import { Polygon } from './Polygon';

/**
 * A rectangle is defined by two points, the top left point, called topLeft,
 * and the bottom right point called bottomRight.
 */
export class Rectangle {
  constructor(public topLeft: Point, public bottomRight: Point) {
    if (topLeft.x > bottomRight.x || topLeft.y > bottomRight.y) {
      throw Error(`${topLeft} must be top left compared to ${bottomRight}`);
    }
  }

  containsPoint(p: Point): boolean {
    return p.x > this.topLeft.x && p.x < this.bottomRight.x &&
      p.y > this.topLeft.y && p.y < this.bottomRight.y;
  }

  toPolygon(): Polygon {
    const points = [
      this.topLeft,
      point(this.bottomRight.x, this.topLeft.y),
      this.bottomRight,
      point(this.topLeft.x, this.bottomRight.y),
    ];
    return Polygon.fromPoints(points);
  }

  toString(): string {
    return `tl: ${this.topLeft}, br: ${this.bottomRight}`;
  }

  /**
   * Method that gets the vector needed to separate this rectangle from another rectangle.
   * If there is no overlap a null vector is returned.
   */
  separationVector(other: Rectangle, direction: Vector): Vector {
    if (!this.overlap(other)) {
      return Vector.null;
    }
    const multipliers = [
      safeDivide(other.bottomRight.x - this.topLeft.x, direction.x),
      safeDivide(other.bottomRight.y - this.topLeft.y, direction.y),
      safeDivide(other.topLeft.x - this.bottomRight.x, direction.x),
      safeDivide(other.topLeft.y - this.bottomRight.y, direction.y),
    ]
    .filter(a => a.nonEmpty())
    .map(a => a.get())
    .filter(a => a > 0)
    .sort();

    const smallestPositiveMultiplier = multipliers[0];

    return direction.scale(smallestPositiveMultiplier);

    function safeDivide(dividend: number, divisor: number): Optional<number> {
      if (divisor === 0) {
        return none;
      }
      return some(dividend / divisor);
    }
  }

  /**
   * Check if there is an overlap between this and another rectangle.
   */
  overlap(other: Rectangle): boolean {
    if (this.topLeft.x >= other.bottomRight.x || this.bottomRight.x <= other.topLeft.x) {
      return false;
    }
    if (this.topLeft.y >= other.bottomRight.y || this.bottomRight.y <= other.topLeft.y) {
      return false;
    }
    return true;
  }
}

/**
 * Function that constructs a rectangle from the two given points.
 */
export function rectangle(x1:number, y1: number, x2:number, y2:number): Rectangle {
  return new Rectangle(new Point(x1, y1), new Point(x2, y2));
}
