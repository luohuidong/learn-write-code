import LinkedList from "../LinkedList/LinkedList";
import type { SetInterface } from "./types";

export default class LinkedListSet<T> implements SetInterface<T> {
  list = new LinkedList<T>();

  size(): number {
    return this.list.getSize();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  has(e: T): boolean {
    return this.list.contains(e);
  }

  add(e: T): void {
    if (!this.has(e)) {
      this.list.addLast(e);
    }
  }

  delete(e: T): void {
    this.list.removeElement(e);
  }
}
