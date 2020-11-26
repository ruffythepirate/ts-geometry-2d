import { Point } from './Point';

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
}

/**
 * Function that constructs a rectangle from the two given points.
 */
export function rectangle(topLeft: Point, bottomRight: Point): Rectangle {
  return new Rectangle(topLeft, bottomRight);
}
