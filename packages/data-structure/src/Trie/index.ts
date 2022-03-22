import Node from "./Node";

interface TrieInterface {
  root: Node;
  size: number;
  getSize: () => number;
  add: (word: string) => void;
  contains: (word: string) => boolean;
}

export default class Trie implements TrieInterface {
  root = new Node();
  size = 0;

  getSize(): number {
    return this.size;
  }

  /**
   * 向 Trie 中添加一个新的单词 word
   * @param word
   */
  add(word: string): void {
    let current = this.root;

    for (const c of word) {
      if (current.next.get(c) === null) {
        current.next.set(c, new Node());
      }
      current = current.next.get(c) as Node;
    }

    if (!current.isWord) {
      current.isWord = true;
      this.size++;
    }
  }

  /**
   * 查询单词 word 是否在 Trie 中
   * @param word
   */
  contains(word: string): boolean {
    let current = this.root;

    for (const c of word) {
      if (current.next.get(c) === null) {
        return false;
      }
      current = current.next.get(c) as Node;
    }

    return current.isWord;
  }

  /**
   * 查询是否在 Trie 中有单词以 prefix 为前缀
   * @param prefix
   */
  isPrefix(prefix: string): boolean {
    let cur = this.root;

    for (const c of prefix) {
      if (cur.next.get(c) === null) {
        return false;
      }

      cur = cur.next.get(c) as Node;
    }

    return true;
  }
}
