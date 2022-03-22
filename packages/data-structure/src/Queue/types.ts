export interface QueueInterface<T> {
  enqueue: (element: T) => void;
  dequeue: () => T | undefined;
  getFront: () => T | undefined;
  getSize: () => number;
  isEmpty: () => boolean;
}
