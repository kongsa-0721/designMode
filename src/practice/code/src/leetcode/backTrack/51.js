/**
 * Created by KongSa on 2022/10/4-4:01 PM.
 * 按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。
 * n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 * 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。
 * 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 * 输入：n = 4
 * 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 * 输入：n = 1
 * 输出：[["Q"]]
 * 1 <= n <= 9
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
let solveNQueens = function (n) {
  let res = [];
  let ret = new Array(n).fill([]).map(() => new Array(n).fill("."));
  backTrack(0, ret, res);
  return res;
};
//回溯算法
function backTrack(row, ret, res) {
  if (row === ret.length) {
    //进入这里就说明 行数已经比里面的元素多了 而且都是合法的 我只需要push进去并且退出就好了
    let newArr = [];
    for (let i = 0; i < ret.length; i++) {
      let e = ret[i].toString();
      let reg = /[,]/g;
      newArr[i] = e.replace(reg, "");
    }
    console.log(newArr);
    res.push(newArr);
    return;
  }
  //每一行的每一个数都会进去一次 一行最多一个
  for (let col = 0; col < ret[row].length; col++) {
    //上方 右上方 左上方都没有才能进入下一个函数
    //不涉及到下面 因为我的下面还没有放东西
    if (!isValid(ret, row, col)) {
      continue;
    }
    //先假装放一个 然后看看合不合法
    ret[row][col] = "Q";
    backTrack(row + 1, ret, res);
    //回溯的出口  我还得回去
    ret[row][col] = ".";
  }
}
//检查括号是否合法
function isValid(arr, row, col) {
  //不需要检查行 因为我一行不可能放两个
  let len = arr.length;
  //不需要全部都检查 检查我自己上面没有就好了 列 竖着的
  for (let i = 0; i <= row; i++) {
    if (arr[i][col] === "Q") {
      return false;
    }
  }
  //右上方 下面的还没有 我检查右上方的就可以了
  for (let i = row - 1, j = col + 1; i >= 0 && j < len; i--, j++) {
    if (arr[i][j] === "Q") {
      return false;
    }
  }
  //左上方 只涉及到左上方/右上方
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (arr[i][j] === "Q") {
      return false;
    }
  }
  return true;
}
console.log(solveNQueens(4).length);
