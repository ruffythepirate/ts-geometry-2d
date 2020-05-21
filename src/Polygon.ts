import { LineSegment } from './LineSegment';
import { Point } from './Point';
import { Line } from './Line';

/**
 * A polygon is defined by a number of line segments that enclose an area.
 */
export class Polygon {

  private constructor(public lineSegments: LineSegment[]) {
    if (!isClockwise(lineSegments)) {
      this.lineSegments = lineSegments.map(ls => ls.flip());
    }
  }

  static fromPoints(points: Point[]) {
    const lineSegments = points.reduce((a: LineSegment[], v, i) => {
      const nextIndex = (i + 1) % points.length;
      const ls = new LineSegment(points[i], points[nextIndex]);
      a.push(ls);
      return a;
    },
                                       []);
    return new Polygon(lineSegments);
  }

  /**
   * Verifies whether a point reside inside this polygon or not.
   * If the point is positioned at the periphery,
   * it should be
   * considered as not contained.
   * @param p
   */
  containsPoint(p: Point): boolean {
    const intersectedLines = this.lineSegments.reduce((a, v) => {
      return v.rightOfPoint(p) ? a + 1 : a;
    },                                                0);
    return intersectedLines % 2 === 1;
  }

  /**
   * Returns a new polygon that is like this polygon with all points transposed.
   * @param x
   * @param y
   */
  transpose(x: number, y: number) {
    return new Polygon(this.lineSegments.map(ls => ls.transpose(x, y)));
  }

  /**
   * Returns the first point where the line segment intersects the polygon.
   * This is defined as the point closest to p1 in the line segment.
   * @param ls
   * The line segment to check intersection with.
   */
  firstIntersect(ls: LineSegment): Point | undefined {
    const intersections = this.intersects(ls);
    const sortedPoints = Array.from(intersections).sort((p1, p2) => p1.distanceSquare(p2));
    return sortedPoints.length > 0 ? sortedPoints[sortedPoints.length - 1] : undefined;
  }

  /**
   * Returns the points where a line intersects a polygon.
   * @param ls
   */
  intersects(ls : LineSegment) : Set<Point> {
    return this.lineSegments.reduce((a, v) => {
      const p = v.intersects(ls);
      if (p !== undefined) {
        a.add(p);
      }
      return a;
    },                              new Set<Point>());
  }

  /**
   * Merges this polygon and the other polygon into one shape. If no overlap is found
   * between the polygons exception is thrown.
   * @param otherPolygon
   * Polygon to merge this polygon with.
   */
  merge(otherPolygon: Polygon) : Polygon {
    const initialSegment = this.lineSegments.find(ls => !otherPolygon.containsPoint(ls.p1));
    if (initialSegment === undefined) {
      return otherPolygon;
    }
    const otherInitial = otherPolygon.lineSegments.find(ls => !this.containsPoint(ls.p1));
    if (otherInitial === undefined) {
      return this;
    }

    // if( this.lineSegments.find(ls => otherPolygon.intersects(ls)))
    throw new Error('No overlap found between polygons.');
    // find point outside of other polygon.

    // walk along the line segments, add start point for each,
    // if intersection found, add intersection
    // point. Continue on other shape. Walk until initial point is hit.
  }

  lineSegmentsAsSet(): Set<LineSegment> {
    return new Set<LineSegment>(this.lineSegments);
  }

  /**
   * Returns a Polygon that is expanded by 'size' units compared to this one.
   * @param size
   * number of units the polygon should expand.
   */
  swell(size: number) : Polygon {
    const lines = this.lineSegments.map((ls) => {
      const segmentVector = ls.asVector();
      const growVector = segmentVector.
       clockwisePerpendicular()
           .reverse()
           .normed()
           .scale(size);
      return new Line(ls.p1.plus(growVector), segmentVector);
    });
    const newPoints = lines.map((v, i, array) => {
      const nextIndex = (i + 1) % array.length;
      return array[i].intersects(array[nextIndex]) as Point;
    });

    return Polygon.fromPoints(newPoints);
  }
}

/**
 * This function is based on the idea that the cross product between v1 and v2 is
 * norm(v1) * norm(v2) * sin(alpha) where
 * alpha is the angle between the vectors. By going through each line segment as a vector and
 * taking the cross product,
 * we see if sin(alpha) is mostly positive or negative. Positive here meaning the vectors
 * are turning right, negative meaning they are turning left.
 * @param lineSegments
 * Array of line segments to check, note that they have to define a polygon by defining a
 * closed shape (ie. the last line must end where the first line starts.).
 */
function isClockwise(lineSegments: LineSegment[]): Boolean {
  return 0 > lineSegments
      .map(ls => ls.asVector())
      .reduce((sum, v, i, array) => {
        const nextIndex = (i + 1) % array.length;
        return sum + array[i].cross(array[nextIndex]);
      },      0);
}
