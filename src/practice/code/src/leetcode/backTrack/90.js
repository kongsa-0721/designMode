/**
 * Created by KongSa on 2022/10/16-2:59 PM.
 *
 * 子集 II
 * 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
 * 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
let subsetsWithDup = function (nums) {
	let ret = [];
	let set = new Set();
	//可以先给它排序
	nums = nums.sort((a, b) => a - b);
	function backTrack(arr, index) {
		// 使用set去重 set JSON.stringify
		if (set.has(JSON.stringify(arr))) {
			return;
		} else {
			set.add(JSON.stringify(arr));
			ret.push(arr.slice());
		}
		for (let i = index; i < nums.length; i++) {
			arr.push(nums[i]);
			backTrack(arr, i + 1);
			arr.pop();
		}
	}
	backTrack([], 0);
	return ret;
};
