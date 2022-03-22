export class SinglyLinkedListNode<T> {
  element: T;
  next: SinglyLinkedListNode<T> | null;

  constructor(element: T, next: SinglyLinkedListNode<T> | null) {
    this.element = element;
    this.next = next;
  }
}

export class SinglyLinkedListDummyHead<T> {
  element = null;
  next: SinglyLinkedListNode<T> | null;

  constructor(next: SinglyLinkedListNode<T> | null) {
    this.next = next;
  }
}
