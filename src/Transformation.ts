import { Matrix3x3 } from './Matrix3x3';
import { Point } from './Point';
import { Polygon } from './Polygon';
/**
 * A transformation can be applied to geometrical shaped to move them according to specific rules.
 *
 * Under the hood the transformation is basically an Matrix, but
 * it works as an adapter that glues together the interface
 * of the geometrical shapes with the matrix classes.
 */
export class Transformation {

  /**
   *
   * @param m
   * The transformation as describe by a matrix.
   */
  constructor(private m: Matrix3x3) {
  }

  /**
   * Returns a builder that can construct a transformation.
   */
  static builder(): TransformationBuilder {
    return new TransformationBuilder();
  }

  /**
   * Applies this transformation to a point.
   */
  applyToPoint(p: Point): Point {
    const a = [p.x, p.y, 1];

    const result = this.m.times(a);

    return Point.fromValues(result[0], result[1]);
  }

  /**
   * Returns a string representation of the matrix that represents this
   * transformation.
   */
  toString(): string {
    return this.m.toString();
  }

  /**
   * Applies this transformation to a polygon.
   */
  applyToPolygon(pol: Polygon): Polygon {
    const points = pol.points();

    const newPoints = points.map(p => [p.x, p.y, 1])
      .map(a => this.m.times(a))
      .map(res => Point.fromValues(res[0], res[1]));

    return Polygon.fromPoints(newPoints);
  }
}

/**
 * Builds a transformation by stringing together an array of
 * transformation matrices. With the first one defined in the
 * builder being the first one that is applied to the geometrical
 * shape etc.
 */
class TransformationBuilder {
  operations: Matrix3x3[];

  constructor() {
    this.operations = [];
  }

  build(): Transformation {
    const transformationMatrix = this.operations.reduce((a, v) => v.timesMatrix(a),
                                                        Matrix3x3.identity());
    return new Transformation(transformationMatrix);
  }

  private static fromOperations(operations: Matrix3x3[]): TransformationBuilder {
    const builder = new TransformationBuilder();
    builder.operations = operations;
    return builder;
  }

  /**
   * Rotates the coordinates the given amount of degrees around origo.
   */
  withRotationDegrees(degrees: number): TransformationBuilder {
    const rotationMatrix = Matrix3x3.rotationDegrees(degrees);

    return this.createNewBuilder(rotationMatrix);
  }

  /**
   * Moves the points the given distance in x and y.
   */
  withTranslation(x: number, y: number): TransformationBuilder {
    const translationMatrix = Matrix3x3.translation(x, y);

    return this.createNewBuilder(translationMatrix);
  }

  /**
   * Adds an arbitrary transformation matrix to the builder.
   */
  withMatrix(m: Matrix3x3): TransformationBuilder {
    return this.createNewBuilder(m);
  }

  /**
   * Scales the coordinate with the given factors. If only xFactor is given, the same factor
   * will be used to scale in y direction.
   * @param xFactor
   * The factor that coordinates should be multiplied in the x-axis
   * @param yFactor
   * The factor that coordintaes should be multiplied in the y-axis
   */
  withScale(xFactor: number, yFactor?: number): TransformationBuilder {
    const yScale = yFactor ? yFactor : xFactor;
    const a = [xFactor, 0, 0, 0, yScale, 0, 0, 0, 1];
    const scaleMatrix = Matrix3x3.fromArray(a);
    return this.createNewBuilder(scaleMatrix);
  }

  private createNewBuilder(additionalOperation: Matrix3x3): TransformationBuilder {
    const newOperations = [...this.operations];
    newOperations.push(additionalOperation);
    return TransformationBuilder.fromOperations(newOperations);
  }
}
