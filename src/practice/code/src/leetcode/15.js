/**
 * Created by KongSa on 2022/9/21-8:52 PM.
 * 三个整数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
 * 同时还满足 nums[i] + nums[j] + nums[k] == 0 。jkk
 * 你返回所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function (nums) {
  nums = nums.sort((a, b) => {
    return a - b;
  });
  //边界条件 有可能是000 如果都是>0的 不可能等于0了 直接推出
  if (nums[0] > 0) {
    return [];
  }
  let res = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    //先走一遍再说 走一遍把下次过滤掉就好了
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    //slow 不用从头开始了 会出现重复的
    let slow = i + 1,
      fast = len - 1;
    while (slow < fast) {
      let sum = nums[slow] + nums[i] + nums[fast];
      if (sum === 0) {
        //过滤掉相同的 push进去之后还要接着-1
        while (nums[fast] === nums[fast - 1]) {
          fast--;
        }
        while (nums[slow] === nums[slow + 1]) {
          slow++;
        }
        res.push([nums[slow], nums[i], nums[fast]]);
        slow++;
        fast--;
      } else if (sum < 0) {
        slow++;
      } else {
        fast--;
      }
    }
  }
  return res;
};
console.log(threeSum([0, 0, 0]));
