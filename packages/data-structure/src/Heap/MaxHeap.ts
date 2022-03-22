// 使用数组来表示一个完全二叉树，进而实现最大二叉堆

import { defaultCompareFunc } from "./utils";
import { Compare, CompareFunc } from "./types";

interface MaxHeapInterface<E> {
  getSize: () => number;
  isEmpty: () => boolean;
  insert: (e: E) => boolean;
  findMax: () => E | null;
  extractMax: () => E | null;
}

/** 最大堆 */
export default class MaxHeap<E> implements MaxHeapInterface<E> {
  data: E[] = [];
  compareFunc: CompareFunc<E>;

  constructor(compareFunc: CompareFunc<E> = defaultCompareFunc) {
    this.compareFunc = compareFunc;
  }

  getSize(): number {
    return this.data.length;
  }

  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
  private getParentIndex(index: number) {
    if (index === 0) {
      return null;
    }

    return Math.floor((index - 1) / 2);
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
  private getLeftChildIndex(index: number) {
    return index * 2 + 1;
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
  private getRightChildIndex(index: number) {
    return index * 2 + 2;
  }

  /**
   * 交换指定索引的位置
   * @param a
   * @param b
   */
  private swap(a: number, b: number) {
    [this.data[a], this.data[b]] = [this.data[b], this.data[a]];
  }

  /**
   * 上浮 index 索引的元素
   * @param index
   */
  private shiftUp(index: number) {
    if (index < 0 || index > this.data.length) {
      return;
    }

    // 如果父节点比子节点的值小，则进行值的交换
    while (
      index > 0 &&
      this.data[this.getParentIndex(index) as number] < this.data[index]
    ) {
      const parentIndex = this.getParentIndex(index) as number;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  /**
   * 向二叉堆中添加元素
   * @param e
   */
  insert(e: E): boolean {
    if (e === null || e === undefined) {
      return false;
    }
    this.data.push(e);
    this.shiftUp(this.getSize() - 1);
    return true;
  }

  /**
   * 获取二叉堆中的最大值
   */
  findMax(): E | null {
    if (this.data.length === 0) {
      return null;
    }

    return this.data[0];
  }

  /**
   * 元素位置下沉
   * 如果元素比子节点要小，则与最大的子节点进行交换
   * @param index
   */
  private shiftDown(index: number) {
    // 确保节点有左子节点，如果没有左子节点的话，证明已经没有子节点了
    while (this.getLeftChildIndex(index) < this.data.length) {
      // 获取左右子节点的索引
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      // 会被交换值的索引
      let indexWillBeExchange = leftChildIndex;

      // 判断右孩子是否比左孩子大
      if (
        rightChildIndex < this.data.length &&
        this.compareFunc(
          this.data[rightChildIndex],
          this.data[leftChildIndex]
        ) > Compare.BIGGER_THAN
      ) {
        indexWillBeExchange = rightChildIndex;
      }

      if (
        this.compareFunc(this.data[index], this.data[indexWillBeExchange]) ===
        Compare.BIGGER_THAN
      ) {
        const tmp = this.data[index];
        this.data[index] = this.data[indexWillBeExchange];
        this.data[indexWillBeExchange] = tmp;

        index = indexWillBeExchange;
      } else {
        break;
      }
    }
  }

  /** 取出堆中最大元素 */
  extractMax(): E | null {
    const result = this.findMax();

    if (result) {
      // 将数组最后一个元素替换到数组的第一个元素
      this.data[0] = this.data[this.data.length - 1];
      // 删除数组最后一个元素
      this.data.pop();

      this.shiftDown(0);
    }

    return result;
  }
}
