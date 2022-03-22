export interface MapIterface<K, V> {
  remove(key: K): V | null;
  contains(key: K): boolean;
  get(key: K): V | null;
  set(key: K, value: V): void;
  getSize(): number;
  isEmpty(): boolean;
}
