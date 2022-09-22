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
  if (nums[0] >= 0) {
    return [];
  }
  let res = [];
};
