/**
 * Created by KongSa on 2022/9/30-3:34 PM.
 * 今天是9月的最后一天 还是以复习+算法为主 下个月可能要很少复习了 进击那些高难度的面经
 */

/**
 * 执行上下文 在执行的时候确定 可从中访问变量 this啥的 随时可能改变
 * 作用域链 搜索变量的路径 块级 函数 全局
 * 暂时性死区 在执行前调用的瞬间 let const
 * 函数存在提升 类不能提升 var可以提升 值是undefined
 * this 在运行时基于函数的执行环境创建的
 * new 创建一个对象 原型指向构造函数的prototype
 * 执行构造函数 改变构造函数的this指向 指向创建的对象 给对象添加属性或者方法
 * 获取返回值 判断返回值的类型
 */

function myNew(fn, ...rest) {
  let obj = Object.create(Object.getPrototypeOf(fn));
  const res = fn.call(obj, ...rest);
  return typeof res === "object" || "function" ? res : ob;
}
Function.prototype.myCall = function (context, ...rest) {
  context = Object(context || window);
  const key = Symbol();
  context[key] = this;
  const res = context[key](...rest);
  delete context[key];
  return res;
};
function debounce(fn, time, now) {
  let t = null;
  return function () {
    if (t) {
      clearTimeout(t);
    }
    if (now) {
      let first = !t;
      if (first) {
        fn.apply(this, arguments);
      }
      t = setTimeout(() => {
        t = null;
      }, time);
    } else {
      t = setTimeout(() => {
        fn.apply(this, arguments);
      }, time);
    }
  };
}
function throttle(fn, time) {
  let begin = 0;
  return function () {
    let now = new Date().getTime();
    if (now - begin > time) {
      fn.apply(this, arguments);
      begin = now;
    }
  };
}
//禁止被new
function not() {
  if (this instanceof not) {
    throw new Error("not is not allow to new");
  }
  return function a() {
    console.log("this is a function");
  };
}
not();
// let a = new not();
// instanceof
function instance(left, right) {
  if (typeof left !== "object" || !left) {
    return false;
  }
  if (!right.prototype) {
    throw new Error(right + "has no prototype");
  }
  if (Object.getPrototypeOf(left) === right.prototype) {
    return true;
  } else {
    return instance(Object.getPrototypeOf(left), right);
  }
}

let a = [1, 1];
// console.log(instance(a, Object.prototype));
//检测数据类型
function getType(target) {
  if (target == null) {
    return target + "";
  }
  return typeof target !== "object" || "function"
    ? Object.prototype.toString.call(target)
    : typeof target;
}
//深拷贝
function deepCopy(origin) {
  let target = Object.create(Object.getPrototypeOf(origin));
  let stack = [{ target, origin }];
  let map = new Map();
  while (stack.length) {
    const { origin, target } = stack.pop();
    for (let item of Object.getOwnPropertyNames(origin)) {
      if (typeof item === "object" && origin !== null) {
        if (map.has(origin[item])) {
          target[item] = map.get(origin[item]);
        } else {
          target[item] = Object.create(Object.getPrototypeOf(origin[item]));
          map.set(origin[item], target[item]);
          stack.push({ origin: origin[item], target: target[item] });
        }
      } else {
        target[item] = origin[item];
      }
    }
  }
  return target;
}
let obj = { a: 2, b: 3 };

let obj1 = deepCopy(obj);
obj.a = "preObj";
console.log(obj, obj1);
console.log(Object.getOwnPropertyNames(obj));

Function.prototype.myBind = function (context, ...args) {
  context = Object(context || window);
  const key = Symbol();
  const fn = this;
  function result(...brgs) {
    if (this instanceof fn) {
      this[key] = fn;
      this[key](...args, ...brgs);
      delete this[key];
    } else {
      context[key] = fn;
      context[key](...args, ...brgs);
      delete context[key];
    }
  }
  result.prototype = Object.create(fn.prototype);
  return result;
};
function ppx(a) {
  console.log(this);
  console.log(arguments);
}
const fn1 = ppx.myBind(obj, 11);
const o1 = new fn1("aaa");
console.log(o1);
//compose
function compose(...func) {
  if (func.length == 0) {
    return (arg) => arg;
  }
  if (func.length === 1) {
    return func[0];
  }
  return func.reduce((a, b) => {
    return function (...args) {
      a(b(...args));
    };
  });
}

//柯里化
function curry(func) {
  return function curried(...args) {
    if (args.length === func.length) {
      return func.apply(this, args);
    } else {
      return function (...brgs) {
        curried.apply(this, args.concat(brgs));
      };
    }
  };
}
/**
 * 实现一个promise
 */
class Commit {
  static PENDING = "is_pending";
  static FULLFILLED = "is_fullfilled";
  static REJECT = "is_reject";

  constructor(fn) {
    this.result = null;
    this.status = Commit.PENDING;
    this.fullStack = [];
    this.failStack = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  resolve(res) {
    setTimeout(() => {
      if (this.status === Commit.PENDING) {
        this.status = Commit.FULLFILLED;
        this.result = res;
        this.fullStack.forEach((e) => e(this.result));
      }
    });
  }
  reject(res) {
    setTimeout(() => {
      if (this.status === Commit.PENDING) {
        this.status = Commit.REJECT;
        this.result = res;
        this.failStack.forEach((e) => e(this.result));
      }
    });
  }
  then(onRes, onRej) {
    return new Commit((res, rej) => {
      if (this.status === Commit.PENDING) {
        this.fullStack.push(onRes);
        this.failStack.push(onRej);
      }
      if (this.status === Commit.FULLFILLED) {
        onRes(this.result);
      }
      if (this.status === Commit.REJECT) {
        onRej(this.result);
      }
    });
  }
  static all(iterator) {
    return new Promise((res, rej) => {
      let result = [];
      let count = 0;
      for (let item of iterator) {
        Promise.resolve(item)
          .then((e) => {
            result.push(e);
            if (++count === iterator.length) {
              res(result);
            }
          })
          .catch((e) => rej(e));
      }
    });
  }
  static race(iterator) {
    return new Promise((res, rej) => {
      for (let item of iterator) {
        Promise.resolve(item)
          .then((e) => res(e))
          .catch((e) => rej(e));
      }
    });
  }
}
//异步并发

async function pool(arr, fn, max) {
  let ret = [];
  let excuting = [];
  for (let item of arr) {
    const pItem = Promise.resolve().then(() => fn(item));
    ret.push(pItem);
    const e = pItem.then(() => {
      excuting.splice(excuting.indexOf(e), 1);
    });
    excuting.push(e);
    if (excuting.length >= max) {
      await Promise.race(excuting);
    }
  }
  return Promise.all(ret);
}

function retry(fn, delay, times) {
  return new Promise((res, rej) => {
    function func() {
      Promise.resolve(fn())
        .then((e) => res(e))
        .catch((e) => {
          if (times === 0) {
            rej(e);
          } else {
            times--;
            setTimeout(() => {
              func();
            }, delay);
          }
        });
    }
    func();
  });
}
