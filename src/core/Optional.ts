export abstract class Optional<T extends NonNullable<any>> {
  static of<T>(value: T | undefined): Optional<T> {
    if (value) {
      return new Some(value as NonNullable<T>);
    }
    return None.nil;
  }

  abstract map<A extends NonNullable<any>>(f: (val: T) => A): Optional<A>;

  abstract flatMap<A extends NonNullable<any>>(f: (val: T) => Optional<A>): Optional<A>;

  abstract get(): T;

  abstract getOrElse(val: T) : T;

  abstract isEmpty(): boolean;
}

class None extends Optional<NonNullable<any>> {
  static nil = new None();
  map<A extends NonNullable<any>>(f: (val: NonNullable<any>) => A): Optional<A> {
    return None.nil;
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

}

class Some<T extends NonNullable<any>> extends Optional<T> {
  constructor(private value: T) {
    super();
  }
  map<A extends NonNullable<any>>(f: (val: T) => A): Optional<A> {
    return some(f(this.value));
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

export const none = None.nil;
