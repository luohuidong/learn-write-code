type callbackFunc<T> = (key: string, value: T) => boolean;

interface MapInterface<T> {
  set: (key: string, value: T) => boolean;
  remove: (key: string) => boolean;
  hasKey: (key: string) => boolean;
  get: (key: string) => T | undefined;
  clear: () => void;
  size: () => number;
  isEmpty: () => boolean;
  keys: () => string[];
  values: () => T[];
  keyValues: () => [string, T][];
  forEach: (cb: callbackFunc<T>) => void;
}

export default class Map<T> implements MapInterface<T> {
  table: {
    [index: string]: T;
  } = {};

  clear(): void {
    this.table = {};
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  hasKey(key: string): boolean {
    if (this.table[key]) {
      return true;
    } else {
      return false;
    }
  }

  set(key: string, value: T): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    this.table[key] = value;
    return true;
  }

  remove(key: string): boolean {
    if (this.hasKey(key)) {
      delete this.table[key];
      return true;
    }
    return false;
  }

  get(key: string): T | undefined {
    return this.table[key];
  }

  keys(): string[] {
    return Object.keys(this.table);
  }

  values(): T[] {
    return Object.values(this.table);
  }

  keyValues(): [string, T][] {
    const result: [string, T][] = [];
    Object.keys(this.table).forEach((key) => {
      result.push([key, this.table[key]]);
    });
    return result;
  }

  forEach(cb: callbackFunc<T>): void {
    const kvs = this.keyValues();

    for (let i = 0; i < kvs.length; i++) {
      const result = cb(kvs[i][0], kvs[i][1]);

      if (result) {
        break;
      }
    }
  }
}
