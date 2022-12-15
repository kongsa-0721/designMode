/**
 * Created by KongSa on 2022/9/13-8:57 PM.
 */
//暴力递归 超时 499979 本地测试都要好久 跑不通
function isPrime(n) {
	for (var j = 2; j < n; j++) {
		if (n % j === 0) {
			return false;
		}
	}
	return true;
}
var countPrimes = function (n) {
	if (n < 2) {
		return 0;
	}
	let count = 0;
	for (let i = 2; i < n; i++) {
		isPrime(i) && count++;
	}
	return count;
};
//使用奇数 偶数直接过掉(一定不是素数) 这个也是对的 但是会超时
function odd(n) {
	if (n < 2) {
		return 0;
	}
	let count = 0;
	for (let i = 1; i < n; i += 2) {
		isPrime(i) && count++;
	}
	return count;
}
//使用埃氏筛
function ai(n) {
	if (n < 2) {
		return 0;
	}
	let primeArr = Array(n).fill(true);
	let count = 0;
	//从2开始 从 1/0开始会出bug
	for (let i = 2; i < n; i++) {
		if (primeArr[i]) {
			count++;
			for (let j = i * 2; j < n; j += i) {
				primeArr[j] = false;
			}
		}
	}
	return count;
}
export { countPrimes, odd, ai };
