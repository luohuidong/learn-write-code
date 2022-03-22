import _ from "lodash";

import { DoublyLinkedListNode } from "./DoublyLinkedListNode";
import type { DoublyLinkedListInferface } from "./DoublyLinkedListInterface";

class DoublyLinkedList<T> implements DoublyLinkedListInferface<T> {
  /** 链表节点个数 */
  private size = 0;
  /** 链表头节点 */
  private _head: DoublyLinkedListNode<T> | null = null;
  /** 链表尾节点 */
  private _tail: DoublyLinkedListNode<T> | null = null;

  get head(): DoublyLinkedListNode<T> | null {
    return this._head;
  }

  get tail(): DoublyLinkedListNode<T> | null {
    return this._tail;
  }

  /**
   * 向链表某个索引位置添加新节点, O(n)
   * @param index
   * @param element
   */
  add(index: number, element: T): void {
    if (index < 0 || index > this.size) {
      throw new Error("Add failed. Illegal index");
    }

    if (index === 0) {
      if (this.size === 0) {
        const newNode = new DoublyLinkedListNode<T>(element, null, null);

        this._head = newNode;
        this._tail = newNode;
      } else {
        const head = this._head as DoublyLinkedListNode<T>;
        const newNode = new DoublyLinkedListNode<T>(element, head.prev, head);
        head.prev = newNode;

        this._head = newNode;
      }
    } else if (index === this.size) {
      const tail = this._tail as DoublyLinkedListNode<T>;
      const newNode = new DoublyLinkedListNode<T>(element, tail, tail.next);
      tail.next = newNode;

      this._tail = newNode;
    } else {
      let prevNode: DoublyLinkedListNode<T> = this
        ._head as DoublyLinkedListNode<T>;
      for (let i = 1; i < index; i++) {
        prevNode = prevNode.next as DoublyLinkedListNode<T>;
      }
      const newNode = new DoublyLinkedListNode<T>(
        element,
        prevNode,
        prevNode.next
      );
      prevNode.next = newNode;
    }

    this.size++;
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
    this.add(this.size, element);
  }

  /**
   * 获取某个索引位置的节点的值
   * @param index
   */
  get(index: number): T {
    if (this.size === 0) {
      throw new Error("LinkedList is empty");
    }

    if (index < 0 || index >= this.size) {
      throw new Error("Illegal index");
    }

    let current: DoublyLinkedListNode<T> = this._head as DoublyLinkedListNode<
      T
    >;

    if (index === 0) {
      current = this._head as DoublyLinkedListNode<T>;
    } else if (index === this.size - 1) {
      current = this._tail as DoublyLinkedListNode<T>;
    } else {
      for (let i = 0; i < index; i++) {
        current = current.next as DoublyLinkedListNode<T>;
      }
    }

    return current.element as T;
  }

  /** 获取第一个节点的值，O(1) */
  getFirst(): T {
    return this.get(0);
  }

  /** 获取最后一个节点的值，O(1) */
  getLast(): T {
    return this.get(this.size - 1);
  }

  /**
   * 设置某个索引的节点的值，O(n)
   * @param index
   * @param element
   */
  set(index: number, element: T): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Illegal index.");
    }

    let current = this._head as DoublyLinkedListNode<T>;

    for (let i = 0; i < index; i++) {
      current = current.next as DoublyLinkedListNode<T>;
    }

    current.element = element;
  }

  /**
   * 查看链表中，是否有对应某个值的节点，O(n)
   * @param element
   */
  contains(element: T): boolean {
    let cur = this._head;

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
    let cur = this._head;

    while (cur != null) {
      str += cur.next ? cur.element + "," : cur.element;
      cur = cur.next;
    }

    return str;
  }

  /** 获取链表节点个数 */
  getSize(): number {
    return this.size;
  }

  /**
   * 删除某个索引位置的节点
   * @param index
   */
  remove(index: number): T {
    if (this.size === 0) {
      throw new Error("LinkedList is Empty");
    }

    if (index < 0 || index >= this.size) {
      throw new Error("Index is illegal");
    }

    let delNode: DoublyLinkedListNode<T>;

    if (this.size === 1) {
      delNode = this._head as DoublyLinkedListNode<T>;
      delNode.prev = null;
      delNode.next = null;

      // 如果链表只有一个节点，那么删除节点之后应该清空 head 和 tail
      this._head = null;
      this._tail = null;
    } else {
      if (index === 0) {
        delNode = this._head as DoublyLinkedListNode<T>;
        this._head = delNode.next;
        delNode.next = null;
      } else if (index === this.size - 1) {
        delNode = this._tail as DoublyLinkedListNode<T>;
        const preNode = delNode.prev as DoublyLinkedListNode<T>;
        const nextNode = delNode.next as null;

        preNode.next = nextNode;

        delNode.prev = null;
        delNode.next = null;

        this._tail = preNode;
      } else {
        delNode = this._head as DoublyLinkedListNode<T>;
        for (let i = 0; i < index; i++) {
          delNode = delNode.next as DoublyLinkedListNode<T>;
        }

        (delNode.next as DoublyLinkedListNode<T>).prev = delNode.prev;
        (delNode.prev as DoublyLinkedListNode<T>).next = delNode.next;
        delNode.prev = null;
        delNode.next = null;
      }
    }

    this.size--;

    return delNode.element as T;
  }

  removeFirst(): T {
    return this.remove(0);
  }

  removeLast(): T {
    return this.remove(this.size - 1);
  }

  removeElement(val: T): boolean {
    let result = false;
    let current = this.head;

    while (current) {
      if (current.element !== val) {
        current = current.next;
        continue;
      }

      if (current === this.head) {
        this._head = current.next;
        !this._head && (this._tail = null);
      } else {
        const prev = current.prev as DoublyLinkedListNode<T>;
        const next = current.next;
        prev.next = next;
        current.next = null;
        current.prev = null;
      }
      this.size--;
      result = true;
      break;
    }

    return result;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}

export default DoublyLinkedList;
