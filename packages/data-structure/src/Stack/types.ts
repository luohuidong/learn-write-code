export interface StackInterface<T> {
  push: (element: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  getSize: () => number;
  isEmpty: () => boolean;
  clear: () => void;
}
