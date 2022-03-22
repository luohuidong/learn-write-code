export interface SetInterface<T> {
  add: (element: T) => void;
  delete: (element: T) => void;
  has: (element: T) => boolean;
  clear?: () => void;
  size: () => number;
}
