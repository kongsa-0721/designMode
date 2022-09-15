/**
 * Created by KongSa on 2022/9/15-2:17 PM.
 */
/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * @param {string} s
 * @return {boolean}
 */
let isValid = function (s) {
  let map = new Map();
  map.set("}", "{");
  map.set("]", "[");
  map.set(")", "(");
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    //没内容 肯定要push进去
    if (stack.length === 0) {
      stack.push(s[i]);
      continue;
    }
    //这里是对比右括号闭合的
    if (s[i] === "{" || s[i] === "[" || s[i] === "(") {
      stack.push(s[i]);
      continue;
    }
    //注意边界 如果对比不通过也要push进去
    if (map.get(s[i]) === stack[stack.length - 1]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.length === 0 ? true : false;
};
export { isValid };
