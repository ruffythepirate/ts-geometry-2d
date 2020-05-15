import { Vector } from './Vector';
import { Point } from './Point';

export class Line {
  constructor(public p: Point, public v: Vector) {
  }

  project(p2: Point) : Point {
    const factor = this.projectFactor(p2);
    return this.p.plus(this.v.scale(factor));
  }

  projectFactor(p2: Point) : number {
    const pp2 = p2.minus(this.p);
    return pp2.dot(this.v) / this.v.square();
  }

  projectDistanceSquare(p2: Point) : number {
    const proj = this.project(p2);
    return proj.minus(p2).square();
  }

  projectDistance(p2: Point) : number {
    return Math.sqrt(this.projectDistanceSquare(p2));
  }
}
