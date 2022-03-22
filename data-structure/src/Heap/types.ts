export enum Compare {
  BIGGER_THAN,
  LESS_THAN,
  EQUALS,
}

export interface CompareFunc<E> {
  (a: E, b: E): Compare;
}
