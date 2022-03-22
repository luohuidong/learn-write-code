import type { MapIterface } from "./types";

class Node<K, V> {
  key: K | symbol;
  value: V | null;
  next: Node<K, V> | null;

  constructor(key: K | symbol, value: V | null = null, next: Node<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export default class LinkedListMap<K, V> implements MapIterface<K, V> {
  dummyHead = new Node<K, V>(Symbol());
  size = 0;

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * 获取 key 对应的节点
   * @param key
   */
  private getNode(key: K): Node<K, V> | null {
    let current = this.dummyHead.next;

    while (current !== null) {
      if (current.key === key) {
        return current;
      } else {
        current = current.next;
      }
    }

    return null;
  }

  /**
   * 是否包含某个键值
   * @param key
   */
  contains(key: K): boolean {
    return this.getNode(key) !== null;
  }

  /**
   * 获取 key 节点对应的
   * @param key
   */
  get(key: K): V | null {
    const node = this.getNode(key);
    return node ? node.value : null;
  }

  set(key: K, value: V): void {
    const node = this.getNode(key);
    if (node === null) {
      this.dummyHead.next = new Node(key, value, this.dummyHead.next);
      this.size++;
    } else {
      node.value = value;
    }
  }

  remove(key: K): V | null {
    let prev = this.dummyHead;
    while (prev.next !== null) {
      if (prev.next.key === key) {
        break;
      }
      prev = prev.next;
    }

    if (prev.next !== null) {
      const delNode = prev.next;
      prev.next = delNode.next;
      delNode.next = null;
      this.size--;
      return delNode.value;
    }
    return null;
  }
}
