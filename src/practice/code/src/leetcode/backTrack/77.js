/**
 * Created by KongSa on 2022/10/16-3:24 PM.
 *
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 你可以按 任何顺序 返回答案。
 */
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
let combine = function (n, k) {
	let ret = [];
	let excuting = new Array(n);
	for (let i = 0; i < excuting.length; i++) {
		excuting[i] = i + 1;
	}
	function backTrack(arr, index) {
		if (arr.length === k) {
			ret.push(arr.slice());
		}
		for (let i = index; i < excuting.length; i++) {
			arr.push(excuting[i]);
			backTrack(arr, i + 1);
			arr.pop();
		}
	}
	backTrack([], 0);
	return ret;
};
