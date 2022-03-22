import type { StackInterface } from "./types";

export default class ObjectStack<E> implements StackInterface<E> {
  private count = 0;
  private items: {
    [index: number]: E;
  } = {};

  push(e: E): void {
    this.items[this.count] = e;
    this.count++;
  }

  getSize(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  pop(): E | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek(): E {
    return this.items[this.count - 1];
  }

  clear(): void {
    this.count = 0;
    this.items = {};
  }
}
