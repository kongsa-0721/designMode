/**
 * Created by KongSa on 2022/9/4-5:21 PM.
 * 设定一个无序数组 进行快速排序
 * 进行二分查找
 */

let arr = [4, 6, 6, 83, 5, 9, 32, 12, 6, 9, 4, 34, 82, 63, 12];

function quickSort(arg) {
  if (!Array.isArray(arg)) {
    return;
  }
  let left_arr = [],
    right_arr = [],
    base_num = arg[0];
  //注意这里是从1开始
  for (let i = 1; i < arg.length; i++) {
    if (arg[i] >= base_num) {
      right_arr.push(arg[i]);
    } else {
      left_arr.push(arg[i]);
    }
  }
  if (left_arr.length >= 2) {
    left_arr = quickSort(left_arr);
  }
  if (right_arr.length >= 2) {
    right_arr = quickSort(right_arr);
  }
  return left_arr.concat(base_num, right_arr);
}
//判断数组是否相等 内存地址不想等 拼接成字符串
console.log(quickSort(arr).join("") === arr.sort((a, b) => a - b).join(""));
function twice(arg, num) {
  let begin = 0,
    last = arg.length - 1;
  //注意  < =
  while (begin <= last) {
    let mid = Math.floor((begin + last) / 2);
    if (arg[mid] === num) {
      return mid;
    }
    if (arg[mid] > num) {
      last = mid - 1;
    }
    if (arg[mid] < num) {
      begin = mid + 1;
    }
  }
  return -1;
}
console.log(quickSort(arr)[twice(quickSort(arr), 82)] === 82);
export { quickSort, twice };
