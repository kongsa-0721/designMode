/**
 * Created by KongSa on 2022/9/15-1:50 PM.
 */
/**
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
 * @param {number[]} nums
 * @return {boolean}
 * 哈希表 效率还不错的
 */
let containsDuplicateHack = function (nums) {
  //注意返回值 是一个boolean 判断边界
  if (!nums || nums.length === 0) {
    return false;
  }
  if (nums.length === 1) {
    return false;
  }
  let set = new Set(nums);
  if (set.size !== nums.length) {
    return true;
  }
  return false;
};
//排序做法 但是效率并不好
let containsDuplicate = function (nums) {
  if (!nums || nums.length === 0) {
    return false;
  }
  if (nums.length === 1) {
    return false;
  }
  //通过排序 然后判断
  let arr = nums.sort((a, b) => a - b);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      return true;
    }
  }
  return false;
};
