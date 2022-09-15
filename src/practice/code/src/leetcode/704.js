/**
 * Created by KongSa on 2022/9/15-1:24 PM.
 * 给定一个n个元素有序的（升序）整型数组nums 和一个目标值target ，写一个函数搜索nums中的 target，如果目标值存在返回下标，否则返回 -1。
 * 二分查找
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
let search = function (nums, target) {
  let slow = 0,
    fast = nums.length - 1;
  while (slow <= fast) {
    let mid = (slow + fast) >> 1;
    if (nums[mid] === target) {
      return mid;
    }
    if (nums[mid] < target) {
      slow = mid + 1;
    }
    if (nums[mid] > target) {
      fast = mid - 1;
    }
  }
  return -1;
};
