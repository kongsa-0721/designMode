/**
 * Created by KongSa on 2022/9/17-8:12 PM.
 * 经典双指针
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
