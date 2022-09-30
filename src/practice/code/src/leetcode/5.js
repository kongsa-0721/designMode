/**
 * Created by KongSa on 2022/9/29-4:18 PM.
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 */
/**
 * @param {string} s
 * @return {string}
 */
let longestPalindrome = function (s) {
  let len = s.length;
  let max = "";
  for (let i = 0; i < len; i++) {
    getMax(i, i);
    getMax(i, i + 1);
  }
  function getMax(slow, fast) {
    while (slow >= 0 && fast < len && s[slow] === s[fast]) {
      slow--;
      fast++;
    }
    if (fast - slow - 1 > max.length) {
      max = s.slice(slow + 1, fast);
    }
  }
  return max;
};
//打表
let palindrome = function (s) {
  if (!s || s.length === 0) {
    return;
  }
  if (s.length === 1) {
    return s;
  }
  let len = s.length;
  let ans = new Array(len).fill(1).map(() => new Array(len).fill(false));
  let max = "";
  for (let i = 0; i < len; i++) {
    ans[i][i] = true;
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      //写不下去了呀 dp好难
    }
  }
  return max;
};

console.log(palindrome("asdf"));
//构建dp数组 充满false
// for (let i = 0; i < len; i++) {
//   ans[i] = [];
// }
// for (let i = 0; i < len; i++) {
//   for (let j = 0; j < len; j++) {
//     ans[i][j] = "";
//   }
// }
