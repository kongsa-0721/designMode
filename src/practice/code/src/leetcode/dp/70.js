/**
 * Created by KongSa on 2022/10/16-1:20 PM.
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function (n) {
  let dp = [];
  dp[0] = 1;
  dp[1] = 2;
  for (let i = 2; i < n; i++) {
    // 递归转动态规划
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  //从 0开始  返回n-1 就好了
  return dp[n - 1];
};
