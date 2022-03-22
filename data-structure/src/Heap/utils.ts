import { Compare } from "./types";

export function defaultCompareFunc<E>(a: E, b: E): Compare {
  if (a > b) {
    return Compare.BIGGER_THAN;
  } else if (a < b) {
    return Compare.LESS_THAN;
  } else {
    return Compare.EQUALS;
  }
}
