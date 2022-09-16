/**
 * Created by KongSa on 2022/9/15-2:47 PM.
 * 简单的斐波那契
 * 自顶向下的动态规划 记忆化搜素
 */

function fn1(n) {
  if (n < 3) {
    return 1;
  }
  return fn1(n - 1) + fn1(n - 2);
}
function fn2(n) {
  let dp = Array(n);
  dp[0] = 1;
  dp[1] = 1;
  //填表
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
}
export { fn1, fn2 };
