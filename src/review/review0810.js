/**
 * Created by KongSa on 2022/8/10-10:25 AM.
 * 复习学过的知识
 * js三部分组成 ecmaScript DOM BOM
 * srcipt 标签的属性 aysnc defer type-module
 * package.json type-module 进入 esm esm里可以嵌套cjs 可以使用import export
 * 或者使用.mjs结尾的文件 嵌套cjs必须是.cjs结尾的文件 cjs不能嵌套esm
 * 变量 ：定义 赋值 使用 未赋值的时候就是undefined
 * 事件捕获/冒泡 冒泡：向离屏幕远的地方冒泡 捕获 丛window开始捕获body
 * addEventListener 事件 事件回调函数 捕获/冒泡
 * 第三个参数默认是false 就是冒泡
 */

function debounce(fn, timer, now) {
  let t = null;
  return function () {
    if (t) {
      //清除这个定时器 重新定时
      clearTimeout(t);
    }
    if (now) {
      let first = !t;
      if (first) {
        fn.apply(this, arguments);
      }
      t = setTimeout(() => {
        //把t设置为null 时间过了 就是第一次点击了 直接执行
        t = null;
      }, timer);
    } else {
      t = setTimeout(() => {
        fn.apply(this, arguments);
      }, timer);
    }
  };
}

function throttle(fn, timer) {
  let begin = 0;
  return function () {
    //获取时间戳 大于这个timer才执行
    let cur = new Date().getTime();
    if (cur - begin > timer) {
      fn.apply(this, arguments);
      begin = cur;
    }
  };
}
/**
 * this是在运行时基于函数的执行环境绑定的 在全局就是window
 * 在对象内部就指向这个对象
 * 箭头函数里面没有this arguments
 * 箭头函数不能作为构造函数 不能new
 * */

function newInstance(left, right) {
  left = left.__proto__;
  let rightValue = right.prototype;
  while (true) {
    //原型链的终点是null 用右侧的prototype跟左侧的__proto__进行比较
    if (left === rightValue) {
      return true;
    }
    if (left === null) {
      return false;
    }
    left = left.__proto__;
  }
}

function whichType(obj) {
  if (obj === null) {
    return obj + "";
  }
  return (typeof obj === "function") | "object"
    ? Object.prototype.toString.call(obj)
    : typeof obj;
}

function deepCopy(obj, newObj) {
  for (let item in obj) {
    if (item instanceof Array) {
      newObj[item] = [];
      deepCopy(item, newObj[item]);
    }
    if (item instanceof Object) {
      newObj[item] = {};
      deepCopy(item, newObj[item]);
    }
    newObj[item] = obj[item];
  }
}

Function.prototype.myCall = function (context, ...rest) {
  context = context || window;
  context.fn = this;
  let res = context.fn(...rest);
  delete context.fn;
  return res;
};
Function.prototype.myApply = function (context, args = []) {
  context = -context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
};
Function.prototype.myBind = function (context, ...args) {
  const _this = this;
  return function () {
    return _this.apply(context, [...args, ...arguments]);
  };
};

for (let i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    });
  })(i);
}
function myNew(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  fn.call(obj, ...rest);
  return obj;
}
