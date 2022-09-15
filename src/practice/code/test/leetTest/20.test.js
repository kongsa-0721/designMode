/**
 * Created by KongSa on 2022/9/15-2:28 PM.
 */
import { isValid } from "../../src/leetcode/20.js";
import * as assert from "assert";

describe("20 有效的括号", () => {
  it("括号边界", () => {
    let res = false;
    assert.equal(res, isValid("(])"));
  });
});
