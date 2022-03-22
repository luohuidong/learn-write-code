// 取中间的数与目标值做比较
// 中间值与目标值相等，直接返回结果
// 中间值小于目标值，取 [index, length - 1] 的数组部分，继续二分搜索
// 中间值大于目标值，取 [0, index] 的数组部分，继续二分搜索

export default function binarySearch(array: number[], value: number): boolean {
  const startIndex = 0;
  const endIndex = array.length - 1;

  if (startIndex > endIndex) {
    return false;
  }

  const middle = Math.floor((startIndex + endIndex) / 2);

  if (array[middle] === value) {
    return true;
  } else if (array[middle] > value) {
    return binarySearch(array.slice(startIndex, middle), value);
  } else {
    return binarySearch(array.slice(middle, endIndex), value);
  }
}
