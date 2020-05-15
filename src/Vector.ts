export class Vector {
  constructor(public x: number, public y: number) {
  }

  dot(v2: Vector) : number {
    return this.x * v2.x + this.y*v2.y
  }

  scale(factor: number) : Vector {
    return new Vector(this.x * factor, this.y* factor);
  }
}
