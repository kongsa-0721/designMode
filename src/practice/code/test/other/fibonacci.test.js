/**
 * Created by KongSa on 2022/9/15-2:49 PM.
 */
import { fn1, fn2 } from "../../src/BtoD/fibonacci.js";

import * as assert from "assert";
describe("暴力递归改成动态规划", () => {
	it("fn1", () => {
		let res = 13;
		assert.equal(fn1(7), res);
	});
	it("fn2 动态规划填表", () => {
		assert.equal(fn1(3), fn2(3));
		assert.equal(fn1(4), fn2(4));
		assert.equal(fn1(5), fn2(5));
	});
});
