/**
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请你在该数组中找出 和为目标值 target的那 两个 整数，并返回它们的数组下标。
 */
function twoSum(nums: number[], target: number): number[] {
  const mymap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mymap.has(target - nums[i])) {
      return [mymap.get(target - nums[i]), i];
    }
    mymap.set(nums[i], i);
  }
  return [];
}
