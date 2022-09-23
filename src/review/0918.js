/**
 * Created by KongSa on 2022/9/18-10:24 AM.
 */
/*
  addEventListener type 事件类型 listener 事件监听函数 usecapture 冒泡 默认是false
  this 是在运行时 基于函数的执行环境绑定的 在全局范围内就是window 闭包内也是window
  观察是否有显式绑定 指向绑定的对象
  赋值的话 就是拿执行环境的this
  箭头函数不能new的根本原因 没有this指向 没有prototype属性
  new的本质 创建一个新的对象 对象的原型指向构造函数的原型
  改变构造函数的this指向
  执行构造函数 给对象添加属性或者方法
  获取返回值的类型
  xss 跨站脚本攻击 所有的输入都是有害的 嵌入js代码 被执行了 转义 使用市面上通用的转义库 csp内容安全策略 只允许加载指定的脚本 防止xss
  csrf 跨站请求伪造 带着你的cookie去发送请求 cookie设置成http-only samesite设置为strict 只允许同源的发送请求
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
        fn.apply(this, arguments);
      } else {
        t = setTimeout(() => {
          t = null;
        }, timer);
      }
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
    let cur = new Date().getTime();
    if (cur - begin > timer) {
      fn.apply(this, arguments);
      begin = cur;
    }
  };
}
Function.prototype.myCall = function (context, ...args) {
  context = Object(context || window);
  const key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res;
};
function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let res = fn.call(obj, ...args);
  return typeof res === "object" ? res : obj;
}
function flat(arr, depth) {
  return arr.reduce((total, cur) => {
    return Array.isArray(cur) && depth > 0
      ? [...total, ...flat(cur, depth - 1)]
      : [...total, ...[cur]];
  }, []);
}
function flat1(arr, depth) {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      res = res.concat(flat1(item, depth - 1));
    } else {
      res.push(item);
    }
  }
  return res;
}
function flat2(arr, depth) {
  let res = [];
  // 递归改成栈来实现 线性结构
  let stack = [...arr];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
}
console.log(flat2([1, 2, 3, [3, 3, [2, 2, [2, 2, 2, [2, 2, 2]]]]], 4));
function deepClone(origin) {
  let target = Object.create(Object.getPrototypeOf(origin));
  let stack = [{ origin, target }];
  let map = new Map();
  //先放进去 防止一开始就循环依赖
  map.set(origin, target);
  while (stack.length) {
    const { origin, target } = stack.pop();
    for (let item of Object.getOwnPropertyNames(origin)) {
      if (typeof origin[item] === "object" && origin[item] !== null) {
        if (map.has(origin[item])) {
          target[item] = map.get(origin[item]);
        } else {
          target[item] = Object.create(Object.getPrototypeOf(origin[item]));
          stack.push({ origin: origin[item], target: target[item] });
          map.set(origin[item], target[item]);
        }
      } else {
        target[item] = origin[item];
      }
    }
  }
  return target;
}
function all(iterator) {
  let res = [];
  let count = 0;
  return new Promise((resolve, rej) => {
    for (let item of iterator) {
      let pItem = Promise.resolve(item);
      pItem
        .then((a) => {
          res.push(a);
          if (++count === iterator.length) {
            resolve(res);
          }
        })
        .catch((e) => {
          rej(e);
        });
    }
  });
}
function memo(fn, resolver) {
  let map = new Map();
  return function () {
    let cacheKey = resolver
      ? resolver(arguments)
      : [].join.call(arguments, "-");
    let cacheMap = map.get(cacheKey);
    if (!cacheMap) {
      let res = fn.apply(this, arguments);
      map.set(cacheKey, new WeakMap().set(this, res));
      return res;
    }
    if (cacheMap.has(this)) {
      return map.get(this);
    }
    let res = fn.apply(this, arguments);
    cacheMap.set(this, res);
    return res;
  };
}
/**
 * 301 永久重定向 被浏览器缓存 请求url被移除时使用
 * 302 临时重定向 使用get请求重定向 导致之前的post请求数据丢失
 * 303 see other 明确服务器期待客户端进行什么反应
 */
function mapValues(inputObj, callback) {
  return Object.keys(inputObj).reduce(
    (res, key) => ({ ...res, [key]: callback(key, inputObj[key]) }),
    {}
  );
}
obj1 = { a: "kongsa", b: "chundan" };

console.log(
  mapValues(obj1, function (k, v) {
    console.log(k, v);
    return v + " Decorator";
  })
);
