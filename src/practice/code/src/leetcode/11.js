/**
 * Created by KongSa on 2022/9/17-8:12 PM.
 * 经典双指针
 * 给定一个长度为 n 的整数数组height。有n条垂线，第 i 条线的两个端点是i, 0)和i, height[i])。
 * 找出其中的两条线，使得它们与x轴共同构成的容器可以容纳最多的水。
 * 返回容器可以储存的最大水量。
 * @param {number[]} height
 * @return {number}
 */
let maxArea = function (height) {
  let max = 0;
  let left = 0,
    fast = height.length - 1;
  while (left < fast) {
    max = Math.max(max, Math.min(height[slow], slow[fast]) * (fast - slow));
    if (height[fast] > height[slow]) {
      slow++;
    } else {
      fast--;
    }
  }
  return max;
};
