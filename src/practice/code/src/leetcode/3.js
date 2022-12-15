/**
 * Created by KongSa on 2022/9/14-6:26 PM.
 */
/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	if (!s || s.length < 1) {
		return 0;
	}
	if (s.length === 1) {
		return 1;
	}
	//第一种方法 使用数组模拟一个滑动窗口 有重复的就出栈 没重复的入栈 判断长度
	let arr = [];
	let max = 0;
	for (let i = 0; i < s.length; i++) {
		if (arr.indexOf(s[i]) === -1) {
			arr.push(s[i]);
			max = Math.max(max, arr.length);
		} else {
			arr.shift();
			i--;
		}
	}
	return max;
};
/**
 * 使用map set其实也一样 不存在去重 因为如果有重复的 我压根不会push进去
 * @param {string} s
 * @return {number}
 */
function useMap(s) {
	let map = new Map();
	let slow = 0,
		fast = 0;
	let len = s.length;
	let count = 0;
	//注意边界条件 这里没有等于 如果等于 死循环
	while (fast < len) {
		while (!map.has(s[fast]) && fast < len) {
			map.set(s[fast]);
			fast++;
		}
		map.delete(s[slow]);
		count = Math.max(fast - slow, count);
		//先计数 最后在++
		slow++;
	}
	return count;
}
