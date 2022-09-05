/**
 * Created by KongSa on 2022/9/5-1:50 PM.
 */
import * as assert from "assert";
import { twice, quickSort } from "../src/twiceFen.js";

let arr = [4, 6, 6, 83, 5, 9, 32, 12, 6, 9, 4, 34, 82, 63, 12];

describe("twiceFen文件", function () {
  it("快排算法", function () {
    assert.equal(quickSort(arr).join(""), arr.sort((a, b) => a - b).join(""));
  });
  it("二分法查下标", function () {
    assert.equal(quickSort(arr)[twice(quickSort(arr), 82)], 82);
  });
  it("不存在的元素下标", function () {
    assert.equal(twice(quickSort(arr), 9999), -1);
  });
});
