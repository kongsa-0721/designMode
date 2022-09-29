/**
 * Created by KongSa on 2022/9/28-8:52 PM.
 */
import * as assert from "assert";
import { findDuplicate } from "../../src/leetcode/287.js";

it("findDuplicate", () => {
  let res = 2;
  assert.equal(findDuplicate([1, 3, 4, 2, 2]), res);
});
