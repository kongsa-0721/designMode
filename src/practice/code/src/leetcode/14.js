/**
 * Created by KongSa on 2022/9/14-7:48 PM.
 * TODO 这个在面试中遇到过 还没写
 */
/**
 * 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) {
    return "";
  }
  let res = strs.reduce((x, y) => {
    let temp = "";
    let len1 = x.length;
    let len2 = y.length;
    for (let i = 0, j = 0; i < len1 && j < len2; i++, j++) {
      if (x[i] === y[i]) {
        temp += x[i];
      } else {
        break;
      }
    }
    return temp;
  });
  return res;
};
