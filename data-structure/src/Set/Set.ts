import type { SetInterface } from "./types";

export default class SetE<T> implements SetInterface<T> {
  items = new Set<T>();

  add(e: T): void {
    this.items.add(e);
  }

  delete(e: T): boolean {
    return this.items.delete(e);
  }

  has(e: T): boolean {
    return this.items.has(e);
  }

  clear(): void {
    this.items.clear();
  }

  size(): number {
    return this.items.size;
  }

  values(): IterableIterator<T> {
    return this.items.values();
  }

  /**
   * 并集
   * @param setA
   */
  union(setA: Set<T>): Set<T> {
    return new Set([...this.items, ...setA]);
  }

  /**
   * 交集
   * @param setA
   */
  intersection(setA: Set<T>): Set<T> {
    return new Set<T>([...this.items].filter((x) => setA.has(x)));
  }

  /**
   * 获取相对于 A 的差集
   * @param setA
   */
  difference(setA: Set<T>): Set<T> {
    return new Set<T>([...this.items].filter((x) => !setA.has(x)));
  }

  /**
   * 判断是否为 A 的子集
   * @param setA
   */
  isSubSetOf(setA: Set<T>): boolean {
    if (this.items.size < setA.size) {
      return false;
    }

    return [...this.items].every((item) => setA.has(item));
  }
}
