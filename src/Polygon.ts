import { LineSegment } from './LineSegment';
import { Point } from './Point';
import { Line } from './Line';
import { none, Optional, some } from '@ruffy/ts-optional';

function lineSegmentsIntersectThemselves(lineSegments: LineSegment[]) {
  for(let i = 0; i < lineSegments.length; i++) {
    const ls1 = lineSegments[i];
    for(let j = i+1; j < lineSegments.length; j++) {
      const ls2 = lineSegments[j];
      if(ls1.intersect(ls2).nonEmpty()) {
        return true;
      }
    }
  }
  return false;
}

/**
 * A polygon is defined by a number of line segments that enclose an area.
 */
export class Polygon {

  private constructor(public lineSegments: LineSegment[]) {
    if(lineSegmentsIntersectThemselves(lineSegments)) {
      throw Error('Points in polygon are intersecting themselves, this is not allowed!');
    }

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
   * Returns the first point where the line segment intersect the polygon.
   * This is defined as the point closest to p1 in the line segment.
   * @param ls
   * The line segment to check intersection with.
   */
  firstIntersection(ls: LineSegment): Optional<Point> {
    const intersections = this.intersect(ls);
    const sortedPoints = Array.from(intersections).sort((p1, p2) => p1.distanceSquare(p2));
    return sortedPoints.length > 0 ? some(sortedPoints[sortedPoints.length - 1]) : none;
  }

  /**
   * Returns the points where a line intersect this polygon.
   * @param ls
   */
  intersect(ls : LineSegment) : Set<Point> {
    return this.lineSegments.reduce((a, v) => {
      const p = v.intersect(ls);
      p.foreach(p => a.add(p));
      return a;
    },                              new Set<Point>());
  }

  /**
   * Returns the first segment that is intersected by the argument segment,
   * and the point where they intersect. Returns none if no
   * intersect exists.
   * @param ls
   */
  firstIntersectionSegmentAndPoint(ls: LineSegment): Optional<[LineSegment, Point]> {
    const intersections = this.intersectionSegmentAndPoints(ls);
    const sortedPoints = Array.from(intersections).sort((p1, p2) => p1[1].distanceSquare(p2[1]));
    return sortedPoints.length > 0 ? some(sortedPoints[sortedPoints.length - 1]) : none;
  }

  /**
   * Returns a set with tuples of all the intersecting points and the
   * corresponding line segment where they intersect.
   * @param ls
   */
  intersectionSegmentAndPoints(ls: LineSegment): Set<[LineSegment, Point]> {
    return this.lineSegments.reduce((a, v) => {
      const p = v.intersect(ls);
      p.foreach(p => a.add([v, p]));
      return a;
    },                              new Set<[LineSegment, Point]>());
  }

  /**
   * Merges this polygon and the other polygon into one shape. If no overlap is found
   * between the polygons exception is thrown.
   * @param otherPolygon
   * Polygon to merge this polygon with.
   */
  merge(otherPolygon: Polygon) : Polygon {
    return mergePolygons(this, otherPolygon);
  }

  /**
   * Returns the line segment following the given line segment.
   * If inputted line segment is not defined in polygon, error is thrown.
   * @param ls
   */
  nextLineSegment(ls: LineSegment): LineSegment {
    const lsIndex = this.lineSegments.indexOf(ls);
    if (lsIndex === -1) {
      throw Error('The line segment given is not from this polygon!');
    }
    const nextIndex = (lsIndex + 1) % this.lineSegments.length;
    return this.lineSegments[nextIndex];
  }

  /**
   * Returns the line segment that starts from point p, throws exception
   * if no such line segment exists.
   * @param p
   */
  lineSegmentFrom(p: Point): LineSegment {
    const ls = this.lineSegments.find(ls => ls.p1.x === p.x && ls.p1.y === p.y);
    if (ls) {
      return ls;
    }
    throw Error(`No line segment found starting from ${p.x}, ${p.y}!`);
  }

  /**
   * Returns all line segments as a set, to easier be able to compare two polygons for equality.
   */
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
      return array[i].intersect(array[nextIndex]);
    }).filter(p => p.nonEmpty()).map(p => p.get());

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

function mergePolygons(pol1 : Polygon, pol2: Polygon): Polygon {
  let currentSegment = pol1.lineSegments.find(ls => !pol2.containsPoint(ls.p1));
  if (currentSegment === undefined) {
    return pol2;
  }
  const otherInitial = pol2.lineSegments.find(ls => !pol1.containsPoint(ls.p1));
  if (otherInitial === undefined) {
    return pol1;
  }

  let circleComplete = false;
  let newPoint: Point;
  const points: Point[] = [];
  points.push(currentSegment.p1);
  let currentPol = pol1;
  let otherPol = pol2;
  while (!circleComplete) {
    [newPoint, currentSegment, currentPol, otherPol] =
      getNextStep(currentSegment, currentPol, otherPol);
    if (points.find(p => p === newPoint) === undefined) {
      points.push(newPoint);
    } else {
      circleComplete = true;
    }
  }
  function getNextStep(currentSegment: LineSegment,
                       thisPolygon: Polygon,
                       otherPolygon: Polygon) : [Point, LineSegment, Polygon, Polygon] {
    const intersectOpt = otherPolygon.firstIntersectionSegmentAndPoint(currentSegment);
    return intersectOpt.map<[Point, LineSegment, Polygon, Polygon]>(intersection =>
      [intersection[1],
        intersection[0].startFrom(intersection[1]),
        otherPolygon,
        thisPolygon],
    ).getOrElse([currentSegment.p2,
      thisPolygon.lineSegmentFrom(currentSegment.p2),
      thisPolygon,
      otherPolygon]);
  }
  return Polygon.fromPoints(points);
}
