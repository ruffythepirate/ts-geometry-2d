import { Matrix3x3 } from './Matrix3x3';
import { Point } from './Point';
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
  applyToPoint(p: Point) {
    const v = [p.x, p.y, 1];

    const result = this.m.times(v);

    return Point.fromValues(result[0], result[1]);
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

  withRotationDegrees(degrees: number): TransformationBuilder {
    const rotationMatrix = Matrix3x3.rotationDegrees(degrees);

    return this.createNewBuilder(rotationMatrix);
  }

  withTranslation(x: number, y: number): TransformationBuilder {
    const translationMatrix = Matrix3x3.translation(x, y);

    return this.createNewBuilder(translationMatrix);
  }

  private createNewBuilder(additionalOperation: Matrix3x3): TransformationBuilder {
    const newOperations = [...this.operations];
    newOperations.push(additionalOperation);
    return TransformationBuilder.fromOperations(newOperations);
  }
}