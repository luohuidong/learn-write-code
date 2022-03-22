import { defaultCompareFunc } from "./utils";
import { CompareFunc, Compare } from "./types";

interface HeapInterface<E> {
  /** 返回最小值 */
  findMinimun(): E | null;
  /** 向堆中插入一个新的值 */
  insert(value: E): boolean;
  /** 移除最小值（最小堆）*/
  extractMinimun(): E | null;
}

/** 最小堆 */
export default class MinHeap<E> implements HeapInterface<E> {
  heap: E[] = [];
  compareFunc: CompareFunc<E>;

  constructor(compareFunc: CompareFunc<E> = defaultCompareFunc) {
    this.compareFunc = compareFunc;
  }

  /** 获取二叉堆的元素个数 */
  get size(): number {
    return this.heap.length;
  }

  /** 查看二叉堆是否为空 */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /** 获取堆中最小的元素 */
  findMinimun(): E | null {
    return this.isEmpty() ? null : this.heap[0];
  }

  /**
   * 获取给定位置 index 节点的左侧子节点的位置
   * @param index
   */
  private getLeftChildIndex(index: number): number {
    const leftChildIndex = 2 * index + 1;
    return leftChildIndex >= this.heap.length ? leftChildIndex : -1;
  }

  /**
   * 获取给定位置 index 节点的右侧子节点的位置
   * @param index
   */
  private getRightChildIndex(index: number): number {
    const rightChildIndex = 2 * index + 2;
    return rightChildIndex >= this.heap.length ? rightChildIndex : -1;
  }

  /**
   * 获取给定位置 index 节点的父节点位置
   * @param index
   */
  private getParentIndex(index: number): number {
    if (index === 0) {
      return -1;
    }
    return Math.floor((index - 1) / 2);
  }

  /**
   * 调换二叉堆 a, b 索引的值
   * @param a
   * @param b
   */
  private swap(a: number, b: number) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  /**
   * 上移操作
   * 指定节点与父节点进行比较，如果小于父节点，则与父节点交换位置
   * @param index
   */
  private shiftUp(index: number) {
    let parentIndex = this.getParentIndex(index);

    const parentValue = this.heap[parentIndex];
    const value = this.heap[index];

    while (
      index > 0 &&
      this.compareFunc(value, parentValue) === Compare.LESS_THAN
    ) {
      // 当插入值比父节点的值要小的时候，交换两个节点的值
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  /**
   * 向堆中插入一个新的值
   * @param value
   */
  insert(value: E): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
    return true;
  }

  /**
   * 下移操作
   * @param index
   */
  private siftDown(index: number): void {
    let element = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    const size = this.size;

    // 判断索引为 element 的值是否比 index 的左子节点的值要小
    if (
      left < size &&
      this.compareFunc(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left;
    }

    // 判断索引为 element 的值是否比 index 的右子节点的值要小
    // 如果 element 为 left，则是左右子节点的值进行比较
    if (
      right < size &&
      this.compareFunc(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right;
    }

    if (index !== element) {
      this.swap(index, element);
      this.siftDown(element);
    }
  }

  /** 移除堆中的最小值 */
  extractMinimun(): E | null {
    if (this.isEmpty()) {
      return null;
    }

    if (this.size === 1) {
      return this.heap.shift() as E;
    }

    const removeValue = this.heap.shift() as E;
    this.siftDown(0);

    return removeValue;
  }
}
