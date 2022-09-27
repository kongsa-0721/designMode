/**
 * Created by KongSa on 2022/8/29-1:21 PM.
 * 整理在图书馆学的知识 从0826--
 */
// @ts-nocheck
let Carray = [[12, 34, 2, 2], 3, 41, 2, 33, [33, 211, 13, 79, 5645]];
/**
 * 数组扁平化 flat
 */
function flat(arr, depth) {
  if (arr.length === 0) {
    return arr;
  }
  return arr.reduce((total, cur) => {
    //cur不是数组的时候 不能用扩展运算符 要放在[]里展开
    return Array.isArray(cur)
      ? [...total, ...flat(cur, depth - 1)]
      : [...total, ...[cur]];
  }, []);
}
let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = Promise.resolve(3);
let p4 = Promise.reject(4);
/**
 * 实现promise.all
 */
function all(iterator) {
  let result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let item of iterator) {
      Promise.resolve(item).then(
        (res) => {
          result.push({
            status: "fullfilled",
            result: res,
          });
          // 设置count标志着完成迭代 返回结果
          if (++count === iterator.length) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}
/**
 * 实现promise.allsettled
 */
function allsettled(iterator) {
  let result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let item of iterator) {
      Promise.resolve(item).then(
        (res) => {
          result.push({
            status: "fullfilled",
            result: res,
          });
          if (++count === iterator.length) {
            resolve(result);
          }
        },
        (err) => {
          result.push({
            status: "reject",
            errResult: err,
          });
          if (++count === iterator.length) {
            resolve(result);
          }
        }
      );
    }
  });
}
/**
 * 实现Promise.race
 */
function race(iterator) {
  return new Promise((resolve, reject) => {
    for (let item of iterator) {
      Promise.resolve(item).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}
let twoArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
/**
 * 递归实现二分查找
 */
function getIndex(arr, num) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (arr[mid] === num) {
      return mid;
    }
    if (arr[mid] > num) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
}
function recurseIndex(arr, num, start, end) {
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === num) {
    return mid;
  }
  if (arr[mid] > num) {
    let newEnd = end - 1;
    return recurseIndex(arr, num, start, newEnd);
  } else if (arr[mid] < num) {
    let newStart = mid + 1;
    return recurseIndex(arr, num, newStart, end);
  } else {
    return -1;
  }
}
let messArray = [23, 123, 43, 6723, 23, 145, 546, 865, 3241, 45678, 87];
let indexArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
/**
 * 将数组以给定好的序列排序
 */
function sortArray(arr, indexArr) {
  for (let i = 0; i < arr.length; i++) {
    while (i !== indexArr[i]) {
      swap(arr, i, indexArr[i]);
      swap(indexArr, i, indexArr[i]);
    }
  }
}
function swap(item, i, j) {
  [item[i], item[j]] = [item[j], item[i]];
}
//模拟 new
function create(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  return typeof res === "object" ? res : ob;
}
let map1 = new Map();
map1.set({ value: "this is key" }, "ppx");
Array.prototype.myForEach = function (callback, thisArg) {
  let arr = this;
  thisArg = thisArg ? Object(thisArg) : window;
  for (let i = 0; i < arr.length; i++) {
    callback.call(thisArg, arr[i], i, arr);
  }
};

//打印函数
function logDetail() {
  //打印扁平化数组的结果
  console.log(flat(Carray, 1));
  //二分查找
  console.log(
    getIndex(twoArray, 3) === recurseIndex(twoArray, 3, 0, twoArray.length - 1)
  );
  //对数组进行原地排序
  sortArray(messArray, indexArray);
  console.log(messArray);
  console.log(indexArray);
  console.log(map1);
  ["my", "foreach", "do"].myForEach((e) => {
    console.log(e);
  });
}

Promise.all([
  //打印Promise.all
  all([p1, p2, p3]).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  ),
  //打印allsettled
  allsettled([p1, p2, p3, p4]).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  ),
  //打印race的结果
  race([p4, p4, p3]).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  ),
]);
export { logDetail };
