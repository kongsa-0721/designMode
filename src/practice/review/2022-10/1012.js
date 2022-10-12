/**
 * Created by KongSa on 2022/10/12-1:35 PM.
 * 刷面经遇到几道算法
 */

//手写快速排序
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let flag = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < flag) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  left = quickSort(left);
  right = quickSort(right);
  return left.concat(flag, right);
}
console.log(quickSort([4, 32, 56, 4, 2, 4, 6, 78, 34, 2, 4]));

//leetcode 3 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
/**
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    slow = 0,
    fast = 0,
    count = 0,
    len = s.length;
  if (!s || len < 1) return s;
  if (len === 1) return 1;
  while (fast < len) {
    while (!map.has(s[fast]) && fast < len) {
      fast++;
      map.set(s[fast]);
    }
    map.delete(s[slow]);
    count = Math.max(count, fast - slow);
    slow++;
  }
  return count;
};

//leetcode 46 去全排列 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let permute = function (nums) {
  if (nums.length === 0 || !nums) return nums;
  let ret = [];
  function backTrack(set) {
    if (set.size === nums.length) {
      ret.push([...set]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (set.has(nums[i])) {
        continue;
      }
      set.add(nums[i]);
      backTrack(set);
      set.delete(nums[i]);
    }
  }
  backTrack(new Set());
  return ret;
};

//leetcode 70 爬楼梯假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
/**
 * @param {number} n
 * @return {number}
 */
let climbStairs = function (n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return climbStairs(n - 1) + climbStairs(n - 2);
};

let climbHack = function (n) {
  let dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 2;
  for (let i = 2; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n - 1];
};

// leetcode 14编写一个函数来查找字符串数组中的最长公共前缀。 如果不存在公共前缀，返回空字符串 ""。
/**
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function (arrs) {
  if (!arrs || arrs.length === 0) return "";
  return arrs.reduce((a, b) => {
    let temp = "";
    let len1 = a.length;
    let len2 = b.length;
    for (let i = 0, j = 0; i < len1 && j < len2; i++, j++) {
      if (a[i] === b[i]) {
        temp = temp + a[i];
      } else {
        break;
      }
    }
    return temp;
  });
};
