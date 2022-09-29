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
