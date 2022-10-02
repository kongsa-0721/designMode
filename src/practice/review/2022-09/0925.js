/**
 * Created by KongSa on 2022/9/25-3:42 PM.
    今天浅浅的复习一下面试中遇到的手写代码 
 */

let fnObj = {
  a() {
    console.log(this === global);
  },
  b: () => {
    console.log(Object.keys(this) === 0);
  },
};

let o1 = fnObj.a;
let o2 = fnObj.b;
o1(); //浏览器环境下 指向两个window
o2();

/**
 * new操作符号的流程
 * 创建一个对象 原型指向构造函数的prototype 执行构造函数 改变构造函数的this指向 指向新创建的obj
 * 给obj添加属性和方法 或者返回值 判断返回值的类型 然后返回
 */

function myNew(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  let res = fn.apply(obj, rest);
  return typeof res === "object" ? res : obj;
}

var obj = {
  name: "baidu",
  arr: ["a", "b"],
};

var obj2 = obj;
var arr = obj.arr;
console.log(arr === obj.arr);
obj2.arr = ["a", "b", "c", "d"];
obj2.name = "inke";
//浅拷贝 值也会跟着改变 arr是新分配空间了 所以没跟着改变
console.log(arr);
console.log(obj.name);
console.log(obj === obj2);
console.log(obj.arr === obj2.arr);
console.log(obj.arr === arr);

let mySet = new Set();
mySet.add({}); //对象内存地址不一样 所以可以放很多很多个 size也会增加
console.log(mySet.size);
mySet.add({});
console.log(mySet.size);

let { a, b: y } = { a: 3, b: 4 };
// b没有定义 y是有值的 键值对 键是没有值的 值是存在的
// console.log(a, b.toString(), y);

//模拟setInterval
function Interval() {
  let timer = setTimeout(function () {
    //do something
    console.log("do something");
    clearTimeout(timer);
    Interval();
  }, 2000);
}
Interval();

class Person {
  constructor() {}
}
let p1 = new Person();
console.log(typeof Person);
console.log(typeof p1);

//对象数组totree
function toTree(obj) {
  let target = JSON.parse(JSON.stringify(obj));
  return target.filter((item) => {
    const child = target.filter((ch) => {
      return ch.pid === item.id;
    });
    child.length && (item["children"] = child);
    return item.pid === 0;
  });
}
console.log(
  toTree([
    { id: 1, name: "办公管理", pid: 0 },
    { id: 2, name: "请假申请", pid: 1 },
    { id: 3, name: "出差申请", pid: 1 },
    { id: 4, name: "请假记录", pid: 2 },
    { id: 5, name: "系统设置", pid: 0 },
    { id: 6, name: "权限管理", pid: 5 },
    { id: 7, name: "用户角色", pid: 6 },
    { id: 8, name: "菜单设置", pid: 6 },
  ])
);

//多叉树的遍历
let root = {
  name: "A",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          children: [
            {
              name: "D",
              children: [
                {
                  name: "D1",
                  children: [{ name: "F1 " }, { name: "F2" }],
                },
                { name: "D2" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "B2",
      children: [{ name: "C2" }, { name: "A" }],
    },
  ],
};

function dfsTree(arg, flag) {
  let res = [];
  let stack = [arg];
  while (stack.length) {
    const item = stack.pop();
    if (item["name"] === flag) {
      res.push(item["name"]);
    }
    if (item["children"]) {
      item["children"].map((e) => {
        stack.push(e);
      });
    }
  }
  return res;
}
let dfsRes = [];
function dfsTree1(arg, flag) {
  if (!arg) {
    return;
  }
  if (arg["name"] === flag) {
    dfsRes.push(arg["name"]);
  }
  if (arg["children"] && arg["children"].length > 0) {
    arg["children"].map((e) => {
      return dfsTree1(e, flag);
    });
  }
  return dfsRes;
}

console.log(dfsTree1(root, "A"));

let arr1 = [1, 2, 3, 4, [5, 6, 7, [8, 9]]];
//数组扁平化
function flatArr(arr, depth) {
  return arr.reduce((total, cur) => {
    return Array.isArray(cur) && depth
      ? [...total, ...flatArr(cur, depth - 1)]
      : [...total, ...[cur]];
  }, []);
}
function flatArr1(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      //核心的逻辑就一句话
      res = res.concat(flatArr1(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}
function flatArr2(arr) {
  let res = [];
  while (arr.length) {
    const item = arr.pop();
    if (Array.isArray(item)) {
      res = res.concat(flatArr2(item));
    } else {
      res.push(item);
    }
  }
  return res;
}
console.log(flatArr2(arr1));
