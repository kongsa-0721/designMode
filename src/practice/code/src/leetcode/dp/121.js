/**
 * Created by KongSa on 2022/10/16-12:27 PM.
 *
 * 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

/**
 * 只能买一次 然后卖了    某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function (prices) {
	if (prices.length < 2) return 0;
	let res = 0,
		minPirce = prices[0];
	for (let i = 1; i < prices.length; i++) {
		res = Math.max(res, prices[i] - minPirce);
		minPirce = Math.min(minPirce, prices[i]);
	}
	return res;
};

let maxTable = function (prices) {
	if (prices.length < 2) return 0;
	let dp = new Array(prices.length).fill(0);
	let minPrice = prices[0];
	for (let i = 1; i < prices.length; i++) {
		if (prices[i] < minPrice) {
			minPrice = prices[i];
		}
		if (prices[i] - minPrice > dp[i]) {
			dp[i] = prices[i] - minPrice;
		} else {
			dp[i] = dp[i - 1];
		}
	}
	return Math.max(...dp);
};
