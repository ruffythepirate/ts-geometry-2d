import { IntervalType } from './Interval';
import { LineSegment } from './LineSegment';
import { Point, point } from './Point';
import { Vector } from './Vector';
import { Line } from './Line';
import { none, Optional, some } from '@ruffy/ts-optional';
import { Rectangle, rectangle } from './Rectangle';

/**
 * Checks if any of the given line segments in an array intersect any of the other.
 */
export function lineSegmentsIntersectThemselves(lineSegments: LineSegment[]): boolean {
  for (let i = 0; i < lineSegments.length; i += 1) {
    const ls1 = lineSegments[i];
    for (let j = i + 1; j < lineSegments.length; j += 1) {
      const ls2 = lineSegments[j];
      if (ls2.intersectHalfOpen(ls1).nonEmpty()) {
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
    if (lineSegmentsIntersectThemselves(lineSegments)) {
      throw Error('Points in polygon are intersecting themselves, this is not allowed!');
    }

    if (!isClockwise(lineSegments)) {
      this.lineSegments = lineSegments.map(ls => ls.flip());
    }
  }

  /**
   * Creates a Polygon from the given points. The points should preferably be
   * given clockwise for the polygon, but if they are not, the given line segments
   * will be corrected to make sure that they are clockwise oriented. The points are
   * also not allowed to define lines that intersect other lines in the polygon.
   * Ie. giving [0,0], [1,1], [1,0], [0,1] would not be allowed since line segments would
   * intersect in the point [0.5, 0.5].
   * @param points
   * The given points that define the polygon. Lines are defined between points next
   * to each other in the array.
   */
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
   * Creates a polygon based on a maps of characters. 1 means that the polygon should be there,
   * 0 means it should not. This only handles perpendicular lines in the polygon, ie.
   * you can't define diagonal lines using the function. One '1' has 1 in width and height.
   */
  static fromMap(map: string): Polygon {
    const dots = map.split('\n');

    return new Polygon([]);
  }

  /**
   * Verifies whether a point reside inside this polygon or not.
   * If the point is positioned at the periphery,
   * it should be
   * considered as not contained.
   * @param p
   */
  containsPoint(p: Point): boolean {
    if (this.lineSegments.find(ls => ls.containsPoint(p))) {
      return false;
    }
    const intersectedLines = this.lineSegments.reduce((a, ls) => {
      return ls.rightOfPoint(p, IntervalType.Closed)
              && !ls.onLine(p) ? a + 1 : a;
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
   * Returns a transposed version of this polygon with all points transposed.
   */
  transposeByVector(v: Vector): Polygon {
    return this.transpose(v.x, v.y);
  }

  /**
   * Finds the shortest distance, if it exists, that would make the
   * point p hit this polygons perimiter when going in the defined direction.
   */
  distanceToPerimiter(p: Point, direction: Vector): Optional<number> {
    const line = p.asLine(direction);
    const shortestDistanceSquared: Optional<number> =
      this.lineSegments.reduce((a: Optional<number>, ls: LineSegment) => {
        const intersectPoint = ls.intersectForLine(line);
        return intersectPoint
        .filter(ip => ip.minus(p).dot(direction) >= 0) // verify that inters. is in vector direction
        .map(ip => ip.distanceSquare(p))
        .filter(dist => a.getOrElse(dist) >= dist)
        .or(() => a);
      },                       none);
    return shortestDistanceSquared.map(d => Math.sqrt(d));
  }

  /**
   * Returns the first point where the line segment intersect the polygon.
   * This is defined as the point closest to p1 in the line segment.
   * @param ls
   * The line segment to check intersection with.
   */
  private firstIntersection(ls: LineSegment): Optional<Point> {
    const intersections = this.intersect(ls);
    const startPoint = ls.p1;
    const sortedPoints = Array.from(intersections)
    .sort((p1, p2) => startPoint.distanceSquare(p1) - startPoint.distanceSquare(p2));
    return sortedPoints.length > 0 ? some(sortedPoints[0]) : none;
  }

  /**
   * Returns the points where a line intersect this polygon.
   * @param ls
   */
  private intersect(ls : LineSegment) : Set<Point> {
    return this.lineSegments.reduce((a, v) => {
      const p = v.intersect(ls);
      p.foreach(p => a.add(p));
      return a;
    },                              new Set<Point>());
  }

  /**
   * Returns the closest point on the polygon's perimiter to the given point.
   * @param p
   * The point that we want to get the closest point to.
   */
  closestPoint(p: Point): Point {
    let closestDist = Number.MAX_SAFE_INTEGER;
    let closestPoint = new Point(0, 0);
    this.lineSegments.forEach((ls) => {
      const bestPoint = ls.closestPoint(p);
      const dist = p.distanceSquare(bestPoint);
      if (dist < closestDist) {
        closestDist = dist;
        closestPoint = bestPoint;
      }
    });
    return closestPoint;
  }

  /**
   * Gives a readable representation of this polygon.
   */
  toString(): string {
    const points = this.points();
    return `${points}`;
  }

  /**
   * Return the middle point of this polygon. This is given by finding the smallest possible
   * rectangle that encompasses the polygon, and returning the middle of that.
   */
  middle(): Point {
    const bounds = this.bounds();
    return point((bounds.topLeft.x + bounds.bottomRight.x) / 2,
                 (bounds.topLeft.y + bounds.bottomRight.y) / 2);
  }

  /**
   * Returns the first segment that is intersected by the argument segment,
   * and the point where they intersect. Returns none if no
   * intersect exists.
   * @param ls
   */
  private firstIntersectionSegmentAndPoint(ls: LineSegment): Optional<[LineSegment, Point]> {
    const intersections = this.intersectionSegmentAndPoints(ls);
    const startPoint = ls.p1;
    const sortedPoints = Array.from(intersections)
      .sort((p1, p2) => startPoint.distanceSquare(p1[1]) - startPoint.distanceSquare(p2[1]));
    return sortedPoints.length > 0 ? some(sortedPoints[0]) : none;
  }

  /**
   * Returns a set with tuples of all the intersecting points and the
   * corresponding line segment where they intersect.
   * @param ls
   */
  private intersectionSegmentAndPoints(ls: LineSegment): Set<[LineSegment, Point]> {
    return this.lineSegments.reduce((a, v) => {
      const p = v.intersectHalfOpen(ls);
      p.foreach(p => a.add([v, p]));
      return a;
    },                              new Set<[LineSegment, Point]>());
  }

  /**
   * Merges this polygon and the other polygon into one shape. If no overlap is found
   * between the polygons exception is thrown.
   * @param other
   * Polygon to merge this polygon with.
   */
  merge(other: Polygon): Polygon {
    /* tslint:disable */
    const pol1: Polygon = this;
    /* tslint:enable */
    const pol2 = other;
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
      if (points.find(p => p.equals(newPoint)) === undefined) {
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

  /**
   * Identifies if this polygon somehow overlaps the other polygon.
   */
  overlap(otherPolygon: Polygon) : boolean {
    if (this.equals(otherPolygon)) {
      return true;
    }
    if (this.containsAnyPolygonPoint(otherPolygon)
       || otherPolygon.containsAnyPolygonPoint(this)) {
      return true;
    }
    return this.lineSegments.find((ls) => {
      const inter = otherPolygon.lineSegments.find(ls2 => ls.intersect(
        ls2, IntervalType.Closed, IntervalType.Open)
        .nonEmpty());
      return inter !== undefined;
    }) !== undefined;
  }

  /**
   * Checks if this polygon and the other polygon contains the same points.
   * @param other
   * Polygon to compare with.
   */
  equals(other: Polygon): boolean {
    if (this.lineSegments.length !== other.lineSegments.length) {
      return false;
    }

    return this.lineSegments.reduce((a: boolean, v: LineSegment) => a
                                    && other.lineSegments.find(ls => ls.equals(v)) !== undefined
    ,                               true);
  }

  /**
   * Returns the line segment following the given line segment.
   * If inputted line segment is not defined in polygon, error is thrown.
   * @param ls
   */
  private nextLineSegment(ls: LineSegment): LineSegment {
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
  private lineSegmentFrom(p: Point): LineSegment {
    const ls = this.lineSegments.find(ls => ls.p1.x === p.x && ls.p1.y === p.y);
    if (ls) {
      return ls;
    }
    throw Error(`No line segment found starting from ${p.x}, ${p.y}!`);
  }

  /**
   * Returns all line segments as a set, to easier be able to compare two polygons for equality.
   */
  private lineSegmentsAsSet(): Set<LineSegment> {
    return new Set<LineSegment>(this.lineSegments);
  }

  /**
   * Checks if this polygon contains any of the points of the other polygon.
   * @param other
   * Polygon whose points are or are not part of this polygon.
   */
  private containsAnyPolygonPoint(other: Polygon): boolean {
    const contained = other.lineSegments.find(ls => this.containsPoint(ls.p1));
    return contained !== undefined;
  }

  /**
   * Finds the smallest possible vector in the given direction that this
   * polygon can be transposed so that it no longer overlaps the
   * other polygon. If they already don't overlap, a null vector
   * is returned.
   * @param other
   * The other polygon that we should no longer overlap
   * @param direction
   * The direction that this polygon should be moved until it no longer overlaps the
   * other polygon
   */
  separationVector(other: Polygon, direction: Vector): Vector {
    const thisBounds = this.bounds();
    const otherBounds = other.bounds();
    if (!thisBounds.overlap(otherBounds) && ! this.overlap(other)) {
      return Vector.null;
    }

    const separateVector = thisBounds.separateFrom(otherBounds, direction);
    const thisMovedFar = this.transposeByVector(separateVector);
    const distancesFromThisToOther = thisMovedFar.points()
      .map(p => other.distanceToPerimiter(p, direction.reverse()));

    const distancesFromOtherToThis = other.points()
      .map(p => thisMovedFar.distanceToPerimiter(p, direction));

    const allDistances = distancesFromOtherToThis
    .concat(distancesFromThisToOther)
    .filter(distOpt => distOpt.nonEmpty())
    .map(distOpt => distOpt.get())
    .sort();

    const shortestDistance = allDistances[0];

    const transposeVector = separateVector.plus(
      direction
        .reverse()
        .normed()
        .scale(shortestDistance));

    return transposeVector;
  }

  /**
   * Returns the points that constitute this polygon as an array.
   */
  private points(): Point[] {
    return this.lineSegments.map(ls => ls.p1);
  }

  bounds(): Rectangle {
    const points = this.points();
    const coords = points.reduce((a, v) => {
      a[0] = Math.min(v.x, a[0]);
      a[1] = Math.min(v.y, a[1]);
      a[2] = Math.max(v.x, a[2]);
      a[3] = Math.max(v.y, a[3]);
      return a;
    },                           [points[0].x, points[0].y, points[0].x, points[0].y]);

    return rectangle(coords[0], coords[1], coords[2], coords[3]);
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
export function isClockwise(lineSegments: LineSegment[]): Boolean {
  return 0 > lineSegments
      .map(ls => ls.asVector())
      .reduce((sum, v, i, array) => {
        const nextIndex = (i + 1) % array.length;
        return sum + array[i].cross(array[nextIndex]);
      },      0);
}

/**
 * Creates a polygon based on the points that are given as an array of two dimensional
 * arrays with numbers.
 * @param points
 * array of two dimensional arrays with points.
 */
export function polygon(points: number[][]) {
  const p = points.map(num => new Point(num[0], num[1]));
  return Polygon.fromPoints(p);
}
