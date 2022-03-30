export default class Node<Data> {
  data: Data;
  left: Node<Data> | null;
  right: Node<Data> | null;

  constructor(data: Data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
