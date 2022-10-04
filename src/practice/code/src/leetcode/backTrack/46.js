/**
 * Created by KongSa on 2022/10/4-3:44 PM.
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function (nums) {
  //corner case 直接退出就可以了 上来的第一件事就是处理corner case
  if (!nums || nums.length === 0) {
    return;
  }
  //设置一个结果数组 一个过程数组
  let ret = [];
  let trackSet = new Set();
  //调用回溯函数 填充数组 过程数组只需要进进出出就好了
  backtrack(nums, trackSet);
  function backtrack(nums, set) {
    //这里就push进去 然后退出 不继续了添加了 可能会超时
    if (set.size === nums.length) {
      ret.push([...set]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      //已经有这个数了 就跳过这次循环 不添加也不删除
      if (set.has(nums[i])) {
        continue;
      }
      //添加进去 然后执行函数 继续push 最后出来的时候删除
      set.add(nums[i]);
      backtrack(nums, set);
      set.delete(nums[i]);
    }
  }
  return ret;
};
