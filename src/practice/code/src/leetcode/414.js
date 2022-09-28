/**
 * Created by KongSa on 2022/9/28-5:11 PM.
 * 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。
 */
let thirdMax = function (nums) {
  let one = nums[0],
    two = -Infinity,
    three = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let now = nums[i];
    if (now > one) [one, two, three] = [now, one, two];
    if (now === one) continue;
    if (now > two) [two, three] = [now, two];
    if (now === two) continue;
    if (now > three) three = now;
    if (now === three) continue;
  }
  return three === -Infinity ? one : three;
};
