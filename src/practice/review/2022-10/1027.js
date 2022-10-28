/**
 * Created by KongSa on 2022/10/27-2:34 PM.
 * 今天好好复习一下哦 1027 明天有个面试
 */

/*
js : DOM BOM ECMAScript

script 属性 async defer
async 异步的加载 不知道什么时候执行 脚本的执行会阻塞dom的加载
defer 异步的加载 等待dom解析完毕执行
type: module js里面可以写import export

typeof 只能做类型等于/不等于的比较

必须是声明方式声明的函数 才可以提升 才可以在词法环境中处理
重名的情况下 函数优先于变量 后面的覆盖前面的
无论函数在哪里调用 都在创建它的那个作用域中取值

作用域链 全局 函数 块级 查找变量的路径
执行上下文 在运行时确定 随时可能改变

事件捕获/冒泡 存在的原因：父子事件的执行顺序
事件委托：避免定义多个事件监听函数

this 是在运行时基于函数的执行环境绑定的 箭头函数没有this arguments prototype

js七种基本数据类型 number string boolean null undefined symbol bigint
symbol bigint 不可以被 new 
instanceof 判断构造函数的prototype是否出现在实例的原型链上

*/

function deepCopy(origin) {
  let target = Object.create(Object.getPrototypeOf(origin));
  let stack = [{ origin, target }];
  let map = new Map();
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

Function.prototype.myCall = function (context, ...args) {
  context = Object(context || window);
  const key = Symbol();
  let fn = this;
  context[key] = fn;
  const res = context[key](...args);
  delete context[key];
  return res;
};

Function.prototype.myBind = function (context, ...args) {
  context = Object(context || window);
  let fn = this;
  const key = Symbol();
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
  result.prototype = Object.create(Object.getPrototypeOf(fn));
  return result;
};

async function asyncPool(iterator, fn, max) {
  let all = [];
  let excuting = [];
  for (let item of iterator) {
    let pItem = Promise.resolve().then(() => fn(item));
    all.push(pItem);
    const e = pItem.then(() => excuting.splice(excuting.indexOf(e), 1));
    excuting.push(e);
    while (excuting.length >= max) {
      await Promise.race(excuting);
    }
  }
  return Promise.all(all);
}

function reTry(fn, times, delay) {
  return new Promise((res, rej) => {
    function func() {
      Promise.resolve(fn())
        .then((result) => {
          res(result);
        })
        .catch((err) => {
          if (times === 0) {
            rej(err);
          } else {
            setTimeout(func, delay);
            times--;
          }
        });
    }
    func();
  });
}
