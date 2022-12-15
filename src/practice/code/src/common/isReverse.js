/**
 * Created by KongSa on 2022/9/29-4:12 PM.
 */
//浅写一个判断回文字符串 可前后双指针/中心扩散
function isReversion(str) {
	if (!str || str.length === 0) return false;
	if (str.length === 1) return true;
	let slow = 0,
		fast = str.length - 1;
	for (let i = 0; i < str.length; i++) {
		if (str[slow] !== str[fast]) {
			return false;
		}
		slow++;
		fast--;
	}
	return true;
}
