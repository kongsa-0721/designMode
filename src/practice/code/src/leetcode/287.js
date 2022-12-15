/**
 * Created by KongSa on 2022/9/28-8:31 PM.
 * 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 * 假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
 * 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
let findDuplicate = function (nums) {
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === i + 1) {
			continue;
		}
		if (nums[i] === nums[nums[i] - 1]) {
			return nums[i];
		}
		//这个顺序不能乱 否则出错
		[nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
		// [nums[i], nums[nums[i] - 1]] = [nums[nums[i] - 1], nums[i]];
	}
};
export { findDuplicate };
