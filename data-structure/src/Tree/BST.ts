import Node from "./BSTNode";
import { Compare, defaultCompare } from "./utils";
import ArrayQueue from "../Queue/ArrayQueue";

interface Callback<T> {
  (key: T): void;
}

interface BSTInterface<T> {
  /** 向树中插入一个新键 */
  insert: (key: T) => void;

  /** 通过前序遍历方式遍历所有节点 */
  preOrderTraverse: (callback: Callback<T>) => void;
  /** 通过中序遍历方式遍历所有节点 */
  inOrderTraverse: (callback: Callback<T>) => void;
  /** 通过后序遍历方式遍历所有节点 */
  postOrderTraverse: (callback: Callback<T>) => void;
  /** 广度优先遍历 */
  levelOrder: (callback: Callback<T>) => void;

  /** 查找一个键 */
  search: (key: T) => boolean;
  /** 返回树中最小的键 */
  min: () => Node<T> | null;
  /** 返回树中最大的键 */
  max: () => Node<T> | null;

  /** 从树中删除某个键 */
  remove: (key: T) => void;
  /** 删除树中的最小键 */
  removeMin: (key: T) => Node<T> | null;
  /** 删除树中的最大键 */
  removeMax: (key: T) => Node<T> | null;

  /** 二叉搜索树是否为空 */
  isEmpty: () => boolean;
}

interface ICompareFunction<T> {
  (a: T, b: T): number;
}

export default class BST<T> implements BSTInterface<T> {
  protected _root: Node<T> | null = null;
  protected compareFunction: ICompareFunction<T>;
  protected _size = 0;

  constructor(compareFucnton: ICompareFunction<T> = defaultCompare) {
    this.compareFunction = compareFucnton;
  }

  get root(): Node<T> | null {
    return this._root;
  }

  get size(): number {
    return this._size;
  }

  /**
   * 向二分搜索树中添加新的元素，如果元素重复，则数不会发生任何变化
   * @param key
   */
  insert(key: T): void {
    this._root = this._insertNode(this._root, key);
  }

  /**
   * 向以 node 为根的二分搜索树中插入节点 element，递归算法
   * @param node
   * @param element
   */
  private _insertNode(node: Node<T> | null, key: T): Node<T> {
    if (node === null) {
      this._size++;
      return new Node(key);
    }

    const result = this.compareFunction(key, node.key);

    if (result === Compare.LESS_THAN) {
      node.left = this._insertNode(node.left, key);
    } else if (result === Compare.BIGGER_THAN) {
      node.right = this._insertNode(node.right, key);
    }

    return node;
  }

  /**
   * 前序遍历
   * @param callback
   */
  preOrderTraverse(callback: Callback<T>): void {
    this._preOrderTraverseNode(this._root, callback);
  }

  /**
   * 以 node 为根节点进行前序遍历
   * @param node
   * @param callback
   */
  private _preOrderTraverseNode(node: Node<T> | null, callback: Callback<T>) {
    if (node !== null) {
      callback(node.key);
      this._preOrderTraverseNode(node.left, callback);
      this._preOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * 中序遍历
   * @param callback
   */
  inOrderTraverse(callback: Callback<T>): void {
    this._inOrderTraverseNode(this._root, callback);
  }

  /**
   * 以 node 为根节点进行中序遍历
   * @param node
   * @param callback
   */
  private _inOrderTraverseNode(node: Node<T> | null, callback: Callback<T>) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this._inOrderTraverseNode(node.right, callback);
    }
  }

  /**
   * 后序遍历
   * @param callback
   */
  postOrderTraverse(callback: Callback<T>): void {
    this._postOrderTraverseNode(this._root, callback);
  }

  /**
   * 以 node 为根节点进行后序遍历
   * @param node
   * @param callback
   */
  private _postOrderTraverseNode(node: Node<T> | null, callback: Callback<T>) {
    if (node !== null) {
      this._postOrderTraverseNode(node.left, callback);
      this._postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  levelOrder(callback: Callback<T>): void {
    if (!this._root) {
      return;
    }

    const queue = new ArrayQueue<Node<T>>();
    queue.enqueue(this._root);

    while (!queue.isEmpty()) {
      const node = queue.dequeue() as Node<T>;

      callback(node.key);

      if (node.left) {
        queue.enqueue(node.left);
      }

      if (node.right) {
        queue.enqueue(node.right);
      }
    }
  }

  /**
   * 获取二叉树中的最小键
   */
  min(): Node<T> | null {
    return this._min(this._root);
  }

  /**
   * 查找以 node 为根节点的二叉树的最小键
   * @param node
   */
  private _min(node: Node<T> | null): Node<T> | null {
    let currentNode = node;

    while (currentNode !== null && currentNode.left !== null) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  /**
   * 获取二叉树中最大的键
   */
  max(): Node<T> | null {
    return this._max(this._root);
  }

  private _max(node: Node<T> | null): Node<T> | null {
    let currentNode = node;

    while (currentNode !== null && currentNode.right !== null) {
      currentNode = currentNode.right;
    }

    return currentNode;
  }

  /**
   * 查看树中是否包含某个元素
   * @param key
   */
  search(key: T): boolean {
    return this._search(this._root, key);
  }

  /**
   * 查看树中是否包含某个元素（递归方法）
   * @param node
   * @param key
   */
  private _search(node: Node<T> | null, key: T): boolean {
    if (node === null) {
      return false;
    }

    const result = this.compareFunction(key, node.key);

    if (result === Compare.EQUALS) {
      return true;
    } else if (result === Compare.LESS_THAN) {
      return this._search(node.left, key);
    } else {
      return this._search(node.right, key);
    }
  }

  removeMin(): Node<T> | null {
    const min = this.min();

    if (min) {
      this._removeMinNode(this._root as Node<T>);
    }

    return min;
  }

  /**
   * 删除以 node 为根的二叉搜索树中的最小节点
   * 返回删除节点后的新的二分搜索树的根
   * @param node
   */
  private _removeMinNode(node: Node<T>): Node<T> | null {
    if (node.left == null) {
      const rightNode = node.right;
      node.right = null;
      this._size--;
      return rightNode;
    } else {
      node.left = this._removeMinNode(node.left);
      return node;
    }
  }

  removeMax(): Node<T> | null {
    const max = this.max();

    if (max) {
      this._removeMaxNode(this._root as Node<T>);
    }

    return max;
  }

  private _removeMaxNode(node: Node<T>): Node<T> | null {
    if (node.right === null) {
      const leftNode = node.left;
      node.left = null;
      this._size--;
      return leftNode;
    } else {
      node.right = this._removeMaxNode(node.right);
      return node;
    }
  }

  remove(key: T): void {
    this._root = this._removeNode(this._root, key); // 1
  }

  /**
   * 删除一个数的节点
   * 所删除的节点有三种类型：
   * 1. 该节点为叶子节点
   * 1. 该节点只有一个子节点（一个左侧子节点或者一个右侧子节点）
   * 1. 该节点有两个子节点
   * @param node
   * @param key
   */
  private _removeNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    const result = this.compareFunction(key, node.key);

    if (result === Compare.LESS_THAN) {
      // 如果当前
      node.left = this._removeNode(node.left, key);
      return node;
    } else if (result === Compare.BIGGER_THAN) {
      node.right = this._removeNode(node.right, key);
      return node;
    } else {
      this._size--;

      // 第一种情况：处理当前节点为叶子节点的情况：
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // 第二种情况：处理当前节点仅有一个子节点的情况
      if (node.left === null) {
        // 处理当前节点仅有右子节点的情况
        node = node.right;
        return node;
      } else if (node.right === null) {
        // 处理当前节点仅有左子节点的情况
        node = node.left;
        return node;
      }

      // 第三种情况：处理当前节点有两个子节点的情况

      // 找出当前节点的右子树中最小值，用于替换当前节点
      const aux = this._min(node.right) as Node<T>;
      // 将当前节点的 key 替换为右子树中的最小节点的 key
      node.key = aux.key;
      // 由于当最小节点的 key 赋值给当前节点之后，要将原来的最小值删除
      node.right = this._removeMinNode(node.right);
      return node;
    }
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
