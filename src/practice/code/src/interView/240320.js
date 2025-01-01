/**
 * Created by KongSa on 2024/3/20-09:52.
 */
/**
 * 给定一个数组表示股价 数组下标表示是第几天
 * 指标X 任意两天的股价之和 + 这两天间隔的天数
 * 求最大的指标X
 * nums[i] + nums[j] + (j - i)
 */
function price(nums) {
	if (nums.length < 2) {
		return -1;
	}
	let preBest = arr[0];
	let ans = 0;
	for (let i = 1; i < nums.length; i++) {
		ans = Math.max(preBest, nums[i] - i + preBest);
		preBest = Math.max(preBest, nums[i] + i);
	}
	return ans;
}
