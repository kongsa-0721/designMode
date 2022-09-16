/**
 * Created by KongSa on 2022/9/16-8:59 PM.
 * 剑指offer 04
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
let findNumberIn2DArray = function (matrix, target) {
  if (!matrix || !matrix.length) {
    return false;
  }
  let x = matrix.length - 1,
    y = 0;
  //构造一个下标 从左下角开始 while定义好了推出条件
  while (x >= 0 && y < matrix[0].length) {
    if (matrix[x][y] === target) {
      return true;
    } else if (matrix[x][y] > target) {
      x--;
    } else {
      y++;
    }
  }
  return false;
};
