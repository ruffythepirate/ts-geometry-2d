/**
 * Represents a value that might or might not be.
 * The API is inspired from Option in scala. You operate on this type
 * like you would on an array, allowing you to chain possible mappings operations
 * that will happen if a value is defined (of type Some),
 * and will not happen if the value is undefined (of type None).
 */
export abstract class Optional<T extends NonNullable<any>> {
  static of<T>(value: T | undefined): Optional<T> {
    if (value) {
      return new Some(value as NonNullable<T>);
    }
    return None.nil;
  }

  /**
   * Maps the contained value if exists using the given function.
   * @param f
   */
  abstract map<A extends NonNullable<any>>(f: (val: T) => A): Optional<A>;

  /**
   * Maps the contained value with a function that returns Optional<T>.
   * It functions like map, except it also flattens so that you don't
   * get a nested Optional<Optional<T>>
   * @param f
   */
  abstract flatMap<A extends NonNullable<any>>(f: (val: T) => Optional<A>): Optional<A>;

  /**
   * Filters out value if it doesn't fulfill predicate. A Some value
   * then becomes None
   * @param predicate
   */
  abstract filter(predicate: (val: T) => boolean) : Optional<T>;

  /**
   * Performs the operation on the given value, then return the option again.
   * This is unlike the Scala API, where Unit is returned. here it allows
   * for additional chaining of mappings etc.
   * @param f
   */
  abstract foreach(f: (val: T) => void) : Optional<T>;

  /**
   * Gets get value if exists, otherwise throws exception.
   */
  abstract get(): T;

  /**
   * Gets the value if exists, otherwise returns inserted value.
   * @param val
   */
  abstract getOrElse(val: T) : T;

  /**
   * Check if a value exists
   */
  abstract isEmpty(): boolean;

  /**
   * Checks if a value doesn't exist.
   */
  abstract nonEmpty(): boolean;
}

class None extends Optional<NonNullable<any>> {
  static nil = new None();
  map<A extends NonNullable<any>>(f: (val: NonNullable<any>) => A): Optional<A> {
    return None.nil;
  }

  filter(f: (val: NonNullable<any>) => boolean): Optional<NonNullable<any>> {
    return None.nil;
  }

  nonEmpty(): boolean {
    return false;
  }

  flatMap<A extends NonNullable<any>>(f: (val: NonNullable<any>) => Optional<A>): Optional<A> {
    return None.nil;
  }

  get(): NonNullable<any> {
    throw Error('Cannot get value of None');
  }

  getOrElse(val: NonNullable<any>): NonNullable<any> {
    return val;
  }

  isEmpty(): boolean {
    return true;
  }

  foreach(f: (val: NonNullable<any>) => void): Optional<NonNullable<any>> {
    return None.nil;
  }

}

class Some<T extends NonNullable<any>> extends Optional<T> {
  constructor(private value: T) {
    super();
  }
  map<A extends NonNullable<any>>(f: (val: T) => A): Optional<A> {
    return some(f(this.value));
  }

  nonEmpty(): boolean {
    return true;
  }

  filter(f: (val: T) => boolean): Optional<T> {
    return f(this.value) ? this : none;
  }

  foreach(f: (val: T) => void): Optional<T> {
    f(this.value);
    return this;
  }

  flatMap<A extends NonNullable<any>>(f: (val: T) => Optional<A>): Optional<A> {
    return f(this.value);
  }

  get(): T {
    return this.value;
  }

  getOrElse(val: T): T {
    return this.value;
  }

  isEmpty(): boolean {
    return false;
  }
}

/**
 * Returns the value wrapped in Some.
 * @param value
 */
export function some<T extends NonNullable<any>>(value: T) :Some<T> {
  return new Some<T>(value);
}

/**
 * Returns the value wrapped in Optional
 * @param value
 */
export function optional<T>(value: T | undefined): Optional<T> {
  return Optional.of(value);
}

/**
 * Represents undefined.
 */
export const none = None.nil;
