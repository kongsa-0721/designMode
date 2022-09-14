/**
 * Created by KongSa on 2022/9/4-8:17 PM.
 */
let arr = [1, 2, 3, 6, 2, 3, 1, 3, 3, 4, 2, 4, 3, 4, 2, 1];
/**
 * 切割数组 根据base值拆分数组
 * @param arr 要拆分的数组
 * @param base 基准值
 */
function sliceArr(arr, base) {
  let resArr = [];
  for (let i = 0; i < arr.length; i += base) {
    resArr.push(arr.slice(i, i + base));
  }
  return resArr;
}
console.log(sliceArr(arr, 4));
/**
 * 根据depth拍平数组
 * @param arr
 * @param depth 深度 默认为1
 */
function flatArr(arr, depth = 1) {
  return arr.reduce((total, cur) => {
    return Array.isArray(cur) && depth
      ? [...total, ...flatArr(cur, depth - 1)]
      : [...total, ...[cur]];
  }, []);
}
console.log(flatArr(sliceArr(arr, 4)));
/**
 * 数组去重
 * @param arr
 */
function noRepeat(arr) {
  if (arr.length < 10) {
    return [...new Set(arr)];
  } else {
    let newArr = [];
    for (let item of arr) {
      if (newArr.indexOf(item) === -1) {
        newArr.push(item);
      }
    }
    return newArr;
  }
}
console.log(noRepeat(arr));
/**
 * 斐波那契数列  1 1 2 3 5 8
 * 两种实现方式 循环/递归
 * @param num
 */
function foboniccy(num) {
  if (num < 10) {
    let pre = 1,
      mid = 1;
    let res = 0;
    for (let i = 0; i < num - 2; i++) {
      res = pre + mid;
      mid = pre;
      pre = res;
    }
    return res;
  } else {
    while (num > 2) {
      return foboniccy(num - 2) + foboniccy(num - 1);
    }
    return 1;
  }
}
console.log(foboniccy(6));
