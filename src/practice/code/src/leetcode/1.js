/**
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请你在该数组中找出 和为目标值 target的那 两个 整数，并返回它们的数组下标。
 */
function twoSum(nums, target) {
  const mymap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (mymap.has(target - nums[i])) {
      return [mymap.get(target - nums[i]), i];
    }
    mymap.set(nums[i], i);
  }
  return [];
}
// for of 不能保证他的顺序 所以不能用for of
// 但是我们可以用lastIndexof
let twoSumHack = function (nums, target) {
  const map = new Map();
  for (let item of nums) {
    const flag = target - item;
    if (map.has(flag)) {
      //改成lastIndexof 返回最后一个数的下标 就可以了 因为之前的数可能已经被set进去了 返回最后一个就不会冲突
      return [nums.indexOf(item), map.get(flag)];
    }
    map.set(item, nums.indexOf(item));
  }
  return [];
};
