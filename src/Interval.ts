/**
 * Enum that defines how to interpret the interval of a line segment.
 * It can either be Closed, meaning that endpoints are included [p1, p2]
 * OpenStart meaning half open, start is excluded (p1, p2]
 * OpenEnd meaning half open, end is excluded [p1, p2)
 * or Open meaning that start and end are excluded (p1, p2).
 */
export enum IntervalType {
  Closed = 1,
  OpenStart = 1 << 1,
  OpenEnd = 1 << 2,
  Open = OpenStart | OpenEnd,
}

/**
 * Represents the interval between two number,
 * The interval can be either open, closed, or half closed, ie.
 * either including or excluding the endpoint values
 */
export class Interval {
  private includeMin: boolean;
  private includeMax: boolean;

    /**
     * Creates a new interval.
     * @param min
     * The minimum endpoint of the interval
     * @param max
     * The maximum endpoint of the interval.
     * @param intervalType
     * The type of interval, default is closed.
     */
  constructor(public min: number, public max: number,
              public intervalType: IntervalType = IntervalType.Closed) {
    if (min === max) {
      this.includeMin = intervalType !== IntervalType.Open;
      this.includeMax = intervalType !== IntervalType.Open;
    } else {
      this.includeMin = (intervalType & IntervalType.OpenStart) === 0;
      this.includeMax = (intervalType & IntervalType.OpenEnd) === 0;
    }
  }

    /**
     * Checks if the given value is contained in the interval or not.
     * @param val
     * Value to check if it is contained.
     */
  contains(val: number) : boolean {
    return (this.includeMin ? this.min <= val : this.min < val)
        && (this.includeMax ? this.max >= val : this.max > val);
  }

}
