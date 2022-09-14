/**
 * Created by KongSa on 2022/9/13-8:58 PM.
 */
import { countPrimes, odd, ai } from "../../src/leetcode/204.js";
import * as assert from "assert";

describe("204 区间内质数问题", () => {
  it("基础方法 暴力搜素与奇数过滤", () => {
    //这两个方法都严重超时
    // let res = countPrimes(499979);
    // assert.equal(res, 1);
    assert.equal(countPrimes(10), odd(10));
    assert.equal(countPrimes(77832), odd(77832));
    assert.equal(countPrimes(10000), odd(10000));
    assert.equal(countPrimes(17770), odd(17770));
  });
  it("埃氏筛", () => {
    assert.equal(countPrimes(170), ai(170));
  });
});
