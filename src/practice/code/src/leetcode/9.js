/**
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 这个题要求不转化为字符串来进行操作 有点麻烦的 应该是取余
 *  @param {number} x
 *  @return {boolean}
 */
function isPalindromeHack(x) {
  const str = x + "";
  //基础款 根据长度来选择进入不同的分支
  if (str.length % 2 === 0) {
    //其实值需要这部分代码就可以了 i<3.5 可以取到3
    for (let i = 0; i < str.length / 2; i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < Math.ceil(str.length / 2); i++) {
      if (str[i] !== str[str.length - i - 1]) {
        return false;
      }
    }
    return true;
  }
}
function isPalindrome(x) {
  const str = x + "";
  const len = str.length;
  let slow = 0,
    fast = len - 1;
  while (slow < fast) {
    if (str[slow] !== str[fast]) {
      return false;
    }
    slow++;
    fast--;
  }
  return true;
}
