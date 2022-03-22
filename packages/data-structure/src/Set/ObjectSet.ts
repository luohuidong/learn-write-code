import type { SetInterface } from "./types";

type E = number | string;

export default class ObjectSet implements SetInterface<E> {
  private items: {
    [index: string]: E;
  } = {};

  has(e: E): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, e);
  }

  add(e: E): boolean {
    if (!this.has(e)) {
      this.items[e] = e;
      return true;
    }

    return false;
  }

  delete(e: E): boolean {
    if (!this.has(e)) {
      delete this.items[e];
      return true;
    }
    return false;
  }

  size(): number {
    return Object.keys(this.items).length;
  }

  sizeLegacy(): number {
    let count = 0;

    for (const k in this.items) {
      if (Object.prototype.hasOwnProperty.call(this, k)) {
        count++;
      }
    }

    return count;
  }

  clear(): void {
    this.items = {};
  }

  values(): E[] {
    const items: E[] = [];

    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        items.push(key);
      }
    }

    return items;
  }
}
