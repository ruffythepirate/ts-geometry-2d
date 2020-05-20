/**
 * Represents the interval between two number,
 * The interval can be either open, closed, or half closed, ie.
 * either including or excluding the endpoint values
 */
export class Interval {
    /**
     * Creates a new interval.
     * @param min
     * The minimum endpoint of the interval
     * @param max
     * The maximum endpoint of the interval.
     * @param includeMin
     * If the min value is included in the interval.
     * @param includeMax
     * If the max value is included in the interval.
     */
  constructor(public min: number, public max: number,
              private includeMin: boolean = true, private includeMax: boolean = true) {
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