import LinkedList from "../LinkedList/LinkedList";
import type { StackInterface } from "./types";

export default class LinkedListStack<T> implements StackInterface<T> {
  stack = new LinkedList<T>();

  getSize(): number {
    return this.stack.getSize();
  }

  isEmpty(): boolean {
    return this.stack.isEmpty();
  }

  push(element: T): void {
    this.stack.addLast(element);
  }

  pop(): T | undefined {
    if (this.stack.getSize() === 0) {
      return undefined;
    }
    return this.stack.removeLast();
  }

  peek(): T | undefined {
    if (this.stack.getSize() === 0) {
      return undefined;
    }
    return this.stack.getLast();
  }

  toString(): string {
    return this.stack.toString();
  }
}
