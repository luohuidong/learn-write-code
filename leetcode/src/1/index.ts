export default function twoSum(nums: number[], target: number): number[] {
  const tmpMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const tmpNum = target - nums[i];

    if (tmpMap.has(tmpNum)) {
      return [tmpMap.get(tmpNum), i];
    } else {
      tmpMap.set(nums[i], i);
    }
  }

  return [];
}

twoSum([3, 2, 4], 6);
