import type { MapIterface } from "./types";

class Node<K, V> {
  key: K;
  value: V;
  left: Node<K, V> | null = null;
  right: Node<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

interface CompareFuncInterface<T> {
  (a: T, b: T): number;
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export default class BSTMap<K, V> implements MapIterface<K, V> {
  private _root: Node<K, V> | null = null;
  private _size = 0;
  private _compareFunc: CompareFuncInterface<K>;

  constructor(compareFunc: CompareFuncInterface<K> = defaultCompare) {
    this._compareFunc = compareFunc;
  }

  /** 获取 Map 的节点数 */
  getSize(): number {
    return this._size;
  }

  /** Map 是否为空 */
  isEmpty(): boolean {
    return this._size === 0;
  }

  set(key: K, value: V): void {
    this._root = this._addNode(this._root, key, value);
  }

  /**
   * 向以 node 为根的二叉搜索树插入元素（递归算法）
   * 返回插入新节点后二分搜索树的根
   * @param node
   * @param key
   * @param value
   */
  private _addNode(node: Node<K, V> | null, key: K, value: V) {
    if (node === null) {
      this._size++;
      return new Node(key, value);
    }

    const result = this._compareFunc(key, node.key);

    if (result === Compare.LESS_THAN) {
      node.left = this._addNode(node.left, key, value);
    } else if (result === Compare.BIGGER_THAN) {
      node.right = this._addNode(node.right, key, value);
    } else {
      node.value = value;
    }

    return node;
  }

  /**
   * 以 node 为根节点，查找键为 key 的节点
   * @param node
   * @param key
   */
  private _getNode(node: Node<K, V> | null, key: K): Node<K, V> | null {
    if (node === null) {
      return null;
    }

    if (this._compareFunc(key, node.key) === Compare.EQUALS) {
      return node;
    } else if (this._compareFunc(key, node.key) === Compare.LESS_THAN) {
      return this._getNode(node.left, key);
    } else {
      return this._getNode(node.right, key);
    }
  }

  contains(key: K): boolean {
    return this._getNode(this._root, key) ? true : false;
  }

  get(key: K): V | null {
    const node = this._getNode(this._root, key);
    return node ? node.value : null;
  }

  /**
   * 获取以 node 节点为根的二叉搜索树的最叶子节点
   * @param node
   */
  private _min(node: Node<K, V> | null): Node<K, V> | null {
    if (node === null) {
      return null;
    }

    if (node.left) {
      return this._min(node.left);
    } else {
      return node;
    }
  }

  remove(key: K): V | null {
    const node = this._getNode(this._root, key);

    if (node !== null) {
      this._root = this._remove(this._root, key);
      return node.value;
    }

    return null;
  }

  private _remove(node: Node<K, V> | null, key: K): Node<K, V> | null {
    if (node === null) {
      return null;
    }

    const result = this._compareFunc(key, node.key);

    if (result === Compare.LESS_THAN) {
      node.left = this._remove(node.left, key);
      return node;
    } else if (result === Compare.BIGGER_THAN) {
      node.right = this._remove(node.right, key);
      return node;
    } else {
      this._size--;

      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        const rightNode = node.right;
        node.right === null;
        return rightNode;
      } else if (node.right === null) {
        const leftNode = node.left;
        node.left === null;
        return leftNode;
      }

      const rightMinNode = this._min(node) as Node<K, V>;
      node.key = rightMinNode.key;
      node.right = this._remove(node.right, key);
      return node;
    }
  }
}
