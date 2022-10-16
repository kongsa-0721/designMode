/**
 * Created by KongSa on 2022/9/29-7:37 PM.
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let rob = function (nums) {
  let cache = new Array(nums.length).fill(-1);
  return dfs(nums, nums.length - 1, cache);
};

function dfs(nums, index, cache) {
  if (index < 0) {
    return 0;
  }
  if (cache[index] !== -1) {
    return cache[index];
  }
  let sum1 = dfs(nums, index - 1, cache);
  let sum2 = dfs(nums, index - 2, cache) + nums[index];
  let res = Math.max(sum1, sum2);
  cache[index] = res;
  return res;
}
let rob1 = function (nums) {
  //两个数的情况 进不去for循环 在这里就判断了好了
  if (nums.length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  let cache = new Array(nums.length).fill(-1);
  cache[0] = nums[0];
  // 2 1 1 2 这个时候前两个最大的是2 nums[1]就要拿 2 手动添加下
  cache[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    cache[i] = Math.max(cache[i - 1], cache[i - 2] + nums[i]);
  }
  return cache[nums.length - 1];
};
console.log(rob1([2, 1, 1, 2]));
