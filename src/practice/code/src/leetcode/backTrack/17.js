/**
 * Created by KongSa on 2022/9/29-1:44 PM.
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
let letterCombinations = function (digits) {
  //注意corner case 这个可能是0 返回[]
  if (!digits || digits.length === 0) {
    return [];
  }
  let res = [];
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  //边界条件
  if (digits.length === 1) {
    return map[Number(digits)].split("");
  }
  //递归函数不需要返回值
  function dfs(curStr, i) {
    //长度相等 就加入进去 执行下一个递归函数
    if (i === digits.length) {
      res.push(curStr);
      return;
    }
    //获取对应的字符
    let letter = map[Number(digits[i])];
    for (let item of letter) {
      //三个字母 分别递归 最后递归出n个递归函数
      dfs(curStr + item, i + 1);
    }
  }
  dfs("", 0);
  return res;
};

console.log(letterCombinations("2"));
