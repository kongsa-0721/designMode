/**
 * Created by KongSa on 2022/9/15-2:00 PM.
 */
/**
 * 删除有序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function (nums) {
	let slow = 0,
		fast = 1;
	let len = nums.length;
	while (fast < len) {
		//画个图 不想等的时候干什么就很清楚 slow进一步 更新值
		if (nums[slow] !== nums[fast]) {
			slow++;
			nums[slow] = nums[fast];
		}
		//相等就快指针加一
		fast++;
	}
	return slow + 1;
};
