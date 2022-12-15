/**
 * Created by KongSa on 2022/9/15-1:45 PM.
 */
/**
 * 统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。
 * 请注意，你可以假定字符串里不包括任何不可打印的字符。
 * @param {string} s
 * @return {number}
 * bad case "" , "      "
 */
let countSegments = function (s) {
	//第一件事就是判断是否存在 是否空
	if (s.length === 0 || !s) {
		return 0;
	}
	let count = 0;
	s = s + " ";
	for (let i = 0; i < s.length; i++) {
		//注意边界条件
		if (s[i] === " " && s[i - 1] !== " " && i > 0) {
			count++;
		}
	}
	return count;
};
