function bubble (nums, k) {
  const len = nums.length
  for(let i=len-1; i>len-1-k; i--) {
    for(let j=0; j<i; j++) {
      if(nums[j]>nums[j+1]) {
        [nums[j], nums[j+1]]=[nums[j+1], nums[j]]
      }
    }
  }
}

var findKthLargest = function(nums, k) {
  bubble(nums, k)
  return nums[nums.length-k]
}

export default findKthLargest 