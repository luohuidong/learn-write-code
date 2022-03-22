export default class Node {
  isWord: boolean;
  next: Map<string, Node>;

  constructor(isWord = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}
