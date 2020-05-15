import { Vector } from './Vector';

export class Point {
  constructor(public x:number, public y:number) {
  }

  minus(p : Point) :Vector {
    return new Vector(this.x - p.x, this.y - p.y);
  }

  plus(v: Vector) : Point {
    return new Point(this.x + v.x, this.y + v.y);
  }
}
