import BST from "./BST";
import Stack from "../Stack/ArrayStack";

import type Node from "./BSTNode";

interface Callback<T> {
  (key: T): void;
}

export default class BSTNotTraverse<T> extends BST<T> {
  preOrderTraverse(callback: Callback<T>): void {
    if (!this._root) {
      return;
    }

    const stack = new Stack<Node<T>>();
    stack.push(this._root);

    while (!stack.isEmpty()) {
      const current = stack.pop() as Node<T>;
      callback(current.key);

      if (current.right) {
        stack.push(current.right);
      }

      if (current.left) {
        stack.push(current.left);
      }
    }
  }
}
