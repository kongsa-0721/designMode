/**
 * Created by KongSa on 2022/9/15-3:10 PM.
 *
 * 有排成一行的N个位置 1～N N一定大于等于2
 * 机器人来到1位置 下一步只能向右来到2
 * 机器人来带N位置 下一步只能向左来到N-1
 * 机器人来到中间位置 可以向左走 可以向右走
 * 机器人必须走K步 最终能来到p位置的方法有多少种
 * 四个参数 N 范围 M 机器人的起始位置 K 走K步 P 最后到P
 * @param {number} N  范围 在1—N上面来回走
 * @param {number} M  开始的位置
 * @param {number} K  我可以走的步数
 * @param {number} P  我要去的位置
 * @return {number}
 */
//range 区间 start 开始位置 rest 剩余的步数 aim 要去的位置
function process(start, rest, aim, range) {
  if (rest === 0) {
    return start === aim ? 1 : 0;
  }
  if (start === 1) {
    return process(2, rest - 1, aim, range);
  }
  if (start === range) {
    return process(range - 1, rest - 1, aim, range);
  }
  let res1 = process(start + 1, rest - 1, aim, range);
  let res2 = process(start - 1, rest - 1, aim, range);
  return res1 + res2;
}
//主函数
function main(N, M, K, P) {
  return process(M, K, P, N);
}
//缓存函数
function processCache(start, rest, aim, range, dp) {
  //之前已经算过了
  if (dp[start][rest] !== -1) {
    return dp[start][rest];
  }
  //之前还没算过 填表
  let ans = 0;
  if (rest === 0) {
    ans = start === aim ? 1 : 0;
  } else if (start === 1) {
    ans = processCache(2, rest - 1, aim, range, dp);
  } else if (start === range) {
    ans = processCache(range - 1, rest - 1, aim, range, dp);
  } else {
    ans =
      processCache(start + 1, rest - 1, aim, range, dp) +
      processCache(start - 1, rest - 1, aim, range, dp);
  }
  dp[start][rest] = ans;
  return ans;
}
function main1(N, M, K, P) {
  let dp = Array(N);
  for (let i = 0; i <= K; i++) {
    dp[i] = Array(K + 1).fill(-1);
  }
  return processCache(M, K, P, N, dp);
}
console.log(main(4, 2, 4, 4));
console.log(main1(4, 2, 4, 4));
