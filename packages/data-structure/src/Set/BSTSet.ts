import BST from "../Tree/BST";
import type { SetInterface } from "./types";

export default class BSTSet<T> implements SetInterface<T> {
  bst = new BST<T>();

  size(): number {
    return this.bst.size;
  }

  isEmpty(): boolean {
    return this.bst.isEmpty();
  }

  add(e: T): void {
    this.bst.insert(e);
  }

  has(e: T): boolean {
    return this.bst.search(e);
  }

  delete(e: T): void {
    this.bst.remove(e);
  }
}
