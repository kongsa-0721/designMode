/**
 * Created by KongSa on 2022/9/19-6:46 PM.
 */
// 实现洋葱模式 函数嵌套执行
function compose(...rest) {
  if (rest.length === 0) {
    return (arg) => arg;
  }
  if (rest.length === 1) {
    return rest[0];
  }
  return rest.reduce((a, b) => {
    return (...arg) => a(b(...arg));
  });
}
let a = (...argA) => {
  argA.forEach((e, index, arr) => {
    arr[index] = e + 1;
  });
  return argA;
};
let b = (...argB) => {
  console.log(argB);
  return argB.reduce((a, b) => a + b);
};
console.log(compose(a, b)(1, 1, 1, 1, 1));
/**
 * babel 的解析过程
 * 解析代码 parse
 * 转换代码 transform
 * 重新构建 generate
 *
 * Ast抽象语法树
 * 常见的场景 babel webpack构建 vue模版解析 css预处理器 uglify丑化压缩代码
 */
