export default function arrayMoveTo<T>(
  arr: T[],
  from: number,
  to: number
): T[] {
  const tmpArr = [...arr];
  if (from === to) {
    return tmpArr;
  } else if (from > to) {
    tmpArr.splice(to, 0, tmpArr[from]);
    tmpArr.splice(from + 1, 1);
  } else {
    tmpArr.splice(to + 1, 0, tmpArr[from]);
    tmpArr.splice(from, 1);
  }

  return tmpArr;
}
