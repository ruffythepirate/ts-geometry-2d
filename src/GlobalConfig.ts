/**
 * Configuration object that determines some things regarding how this library
 * operates. Among other things lets you configure the precision when
 * performing checking if lines are parallel etc.
 */
class Config {
  constructor(public precision: number) {
    this.setPrecision(precision);
  }

  public precisionSquared: number = 0;

  setPrecision(precision: number) {
    if (precision < 0) {
      throw Error('Precision must be a positive number!');
    }
    this.precision = precision;
    this.precisionSquared = precision * precision;
  }
}

const config = new Config(1e-3);

export default config;
