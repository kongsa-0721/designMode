/**
 * Created by KongSa on 2022/10/1-7:51 PM.
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */
/**
 * @param {number} n
 * @return {string[]}
 */
let generateParenthesis = function (n) {
	if (n == 0) {
		return [];
	}
	if (n === 1) {
		return ["()"];
	}
	let res = [];
	function dfs(left, right, str) {
		if (left === n && right === n) {
			res.push(str);
			return;
		}
		//剪枝
		if (left > n || left < right) {
			return;
		}
		dfs(left + 1, right, str + "(");
		dfs(left, right + 1, str + ")");
	}
	dfs(0, 0, "");
	return res;
};
console.log(generateParenthesis(3));
