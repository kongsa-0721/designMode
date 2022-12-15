/**
 * Created by KongSa on 2022/9/16-3:18 PM.
 * 带星号的括号
 */

function fn(s) {
	let left = [];
	let cache = [];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "*") {
			cache.push(s[i]);
		}
		if (s[i] === "(") {
			left.push(s[i]);
		}
		if (s[i] === ")") {
			if (!left.length) {
				if (!cache.length) {
					return false;
				}
				cache.pop();
			}
			left.pop();
		}
	}
	return true;
}
export { fn };
