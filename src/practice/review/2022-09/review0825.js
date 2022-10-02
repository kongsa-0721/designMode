/**
 * Created by KongSa on 2022/8/25-2:23 PM.
 * js三部分 ecmaScript DOM BOM
 * script 标签的属性 async defer
 * async异步的下载 下载之后直接执行 执行会阻塞dom的渲染
 * defer 立即下载 但是推迟到dom加载完毕执行
 * type module 可以使用import export esm 可以嵌套cjs 必须是.cjs结尾
 * esm .mjs 结尾的文件 cjs .cjs结尾
 * cjs里面不能嵌套esm
 * 变量 定义 赋值 使用
 * 未赋值的时候就是undefined
 * 事件捕获/冒泡
 * addeventListener 事件 事件触发回调函数 捕获/冒泡 默认是false 冒泡
 */

function debounce(fn, timer, now) {
  let t = null;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    if (now) {
      let first = !t;
      if (first) {
        fn.apply(this.arguments);
      }
      t = setTimeout(() => {
        t = null;
      });
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
    let now = new Date().getTime();
    if (now - begin > timer) {
      fn.apply(this, arguments);
      begin = now;
    }
  };
}
/***
 * this 是在运行时基于函数的执行环境绑定的 在全局就window
 * 在对象内部就指向这个对象
 * 箭头函数里面没有this arguments
 * 箭头函数不能作为构造函数 不能new
 */
function newInstance(left, right) {
  right = right.prototype;
  let leftproto = left.__proto__;
  while (true) {
    if (leftproto === right) {
      return true;
    }
    if (leftproto === null) {
      return false;
    }
    leftproto = leftproto.__proto__;
  }
}
function whichType(obj) {
  if (obj == null) {
    return obj + "";
  }
  return typeof obj === "function" || "object"
    ? Object.prototype.toString.call(obj)
    : typeof obj;
}
Function.prototype.mycall = function (context, ...args) {
  context = context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
};
for (let i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    });
  })(i);
}
function mynew(fn, ...rest) {
  let obj = Object.create(fn.prototype);
  fn.call(obj, ...rest);
  return obj;
}
