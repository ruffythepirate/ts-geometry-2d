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

  containsPoint(p: Point): boolean {
    return false;
  }

  lineSegmentsAsSet(): Set<LineSegment> {
    return new Set<LineSegment>(this.lineSegments);
  }

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
