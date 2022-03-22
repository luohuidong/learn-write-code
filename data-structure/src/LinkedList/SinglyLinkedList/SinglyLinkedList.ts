// 最基础的链表
import _ from "lodash";

import {
  SinglyLinkedListNode,
  SinglyLinkedListDummyHead,
} from "./SinglyLinkedListNode";
import type SinglyLinkedListInferface from "./SinglyLinkedListInterface";

class SinglyLinkedList<T> implements SinglyLinkedListInferface<T> {
  /** 链表节点个数 */
  private _size = 0;
  /** 链表节点个数 */
  get size(): number {
    return this._size;
  }

  /** 虚拟头节点 */
  private _dummyHead = new SinglyLinkedListDummyHead<T>(null);
  /** 头节点 */
  get head(): SinglyLinkedListNode<T> | null {
    return this._dummyHead.next;
  }
  get tail(): SinglyLinkedListNode<T> | null {
    let current = this._dummyHead.next;

    while (current && current.next !== null) {
      current = current.next;
    }

    return current;
  }

  /**
   * 向链表某个索引位置添加新节点, O(n)
   * @param index
   * @param element
   */
  add(index: number, element: T): void {
    if (index < 0 || index > this._size) {
      throw new Error("Add failed. Illegal index");
    }

    type Current = SinglyLinkedListDummyHead<T> | SinglyLinkedListNode<T>;
    let current: Current = this._dummyHead;

    for (let i = 0; i < index; i++) {
      current = current.next as SinglyLinkedListNode<T>;
    }

    current.next = new SinglyLinkedListNode<T>(element, current.next);

    this._size++;
  }

  /**
   * 向链表头部添加新的节点，O(1)
   * @param element
   */
  addFirst(element: T): void {
    this.add(0, element);
  }

  /**
   * 向链表尾部添加新的节点，O(1)
   * @param element
   */
  addLast(element: T): void {
    this.add(this._size, element);
  }

  /**
   * 获取某个索引位置的节点的值
   * @param index
   */
  get(index: number): T {
    if (this.size === 0) {
      throw new Error("LinkedList is empty");
    }

    if (index < 0 || index >= this._size) {
      throw new Error("Illegal index");
    }

    type Node = SinglyLinkedListDummyHead<T> | SinglyLinkedListNode<T>;
    let current = this._dummyHead as Node;

    for (let i = 0; i < index; i++) {
      current = (current as Node).next as Node;
    }

    return (current.next as Node).element as T;
  }

  /** 获取第一个节点的值，O(1) */
  getFirst(): T {
    return this.get(0);
  }

  /** 获取最后一个节点的值，O(1) */
  getLast(): T {
    return this.get(this._size - 1);
  }

  /**
   * 设置某个索引的节点的值，O(n)
   * @param index
   * @param element
   */
  set(index: number, element: T): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Illegal index.");
    }

    type Node = SinglyLinkedListDummyHead<T> | SinglyLinkedListNode<T>;
    let current = this._dummyHead as Node;

    for (let i = 0; i <= index; i++) {
      current = current.next as Node;
    }

    current.element = element;
  }

  /**
   * 查看链表中，是否有对应某个值的节点，O(n)
   * @param element
   */
  contains(element: T): boolean {
    let cur = this._dummyHead.next;

    while (cur != null) {
      if (_.isEqual(cur.element, element)) {
        return true;
      }
      cur = cur.next;
    }

    return false;
  }

  toString(): string {
    let str = "";
    let cur = this._dummyHead.next;

    while (cur != null) {
      str += cur.next ? cur.element + "," : cur.element;
      cur = cur.next;
    }

    return str;
  }

  /**
   * 删除某个索引位置的节点
   * @param index
   */
  remove(index: number): T {
    if (this.size === 0) {
      throw new Error("LinkedList is Empty");
    }
    if (index < 0 || index >= this._size) {
      throw new Error("Index is illegal");
    }
    type PrevNode = SinglyLinkedListDummyHead<T> | SinglyLinkedListNode<T>;
    /** 待删除节点的前一个节点 */
    let prev: PrevNode = this._dummyHead;
    /** 待删除节点 */
    let current = prev.next as SinglyLinkedListNode<T>;

    for (let i = 1; i <= index; i++) {
      prev = current as SinglyLinkedListNode<T>;
      current = current.next as SinglyLinkedListNode<T>;
    }

    prev.next = current.next;
    this._size--;

    return current.element as T;
  }

  removeFirst(): T {
    return this.remove(0);
  }

  removeLast(): T {
    return this.remove(this._size - 1);
  }

  removeElement(val: T): boolean {
    let result = false;
    let prev: SinglyLinkedListNode<T> | SinglyLinkedListDummyHead<T> = this
      ._dummyHead;
    let current = this._dummyHead.next;

    while (current) {
      if (current.element !== val) {
        prev = current;
        current = current.next;
        continue;
      }

      prev.next = current.next;
      this._size--;
      result = true;
      break;
    }

    return result;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }
}

export default SinglyLinkedList;
