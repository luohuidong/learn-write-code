export default class Node<K> {
  key: K;
  left: Node<K> | null;
  right: Node<K> | null;
  height: number;

  constructor(key: K) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
