/**
 * Created by KongSa on 2022/10/4-9:01 PM.
 * 子集
 * 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let subsets = function (nums) {
  let res = [];
  function backTrack(index, arr) {
    res.push(arr.slice());
    for (let i = index; i < nums.length; i++) {
      arr.push(nums[i]);
      //注意这里是i+1 而不是index index就会全部遍历一遍
      backTrack(i + 1, arr);
      arr.pop();
    }
  }
  backTrack(0, []);
  return res;
};
