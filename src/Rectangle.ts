import { Point } from './Point';
import { Vector } from './Vector';
import { Optional, none, some } from '@ruffy/ts-optional';
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

  /**
   * Method that gets the vector needed to separate this rectangle from another rectangle.
   * If there is no overlap a null vector is returned.
   */
  separateFrom(other: Rectangle, direction: Vector): Vector {
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
  overlap(other: Rectangle): Boolean {
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
