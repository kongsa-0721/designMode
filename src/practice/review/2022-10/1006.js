/**
 * Created by KongSa on 2022/10/6-9:20 AM.
 * 今天开始 这里只写熟悉js题 与 代码/算法
 */

function fn() {
  console.log("this is fn1");
}
fn();
function fn() {
  console.log("this is fn2");
}
fn();
//打印两个fn2 证明js代码是一段一段执行的

let ul = document.getElementById("ul");
let list = document.getElementsByClassName("list");
ul.addEventListener("click", (e) => {
  console.log([...list].indexOf(e.target));
});

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
    let cur = new Date().getTime();
    if (cur - begin > time) {
      fn.apply(this, arguments);
      begin = cur;
    }
  };
}

// const fnn = (a, b) => {
//   console.log(this);
//   console.log(arguments);
// };
// console.log(fnn.prototype);
// fnn();
// function app() {}
// console.log(app.prototype);

function instance(left, right) {
  if (!left || typeof left !== "object") {
    return false;
  }
  if (right.prototype == null) {
    throw new Error();
  }
  if (Object.getPrototypeOf(left) === right.prototype) {
    return true;
  } else {
    return instance(Object.getPrototypeOf(left), right);
  }
}

function deepCopy(origin) {
  let target = Object.create(origin.prototype);
  let stack = [{ origin, target }];
  let map = new Map();
  map.set(origin, target);
  for (let item of Object.getOwnPropertyNames(origin)) {
    const { origin, target } = stack.pop();
    if (typeof origin === "object" && origin != null) {
      if (map.has(origin[item])) {
        target[item] = map.get(origin[item]);
      } else {
        target[item] = Object.create(origin[item].prototype);
        map.set(origin[item], target[item]);
        stack.push({ origin: origin[item], target: target[item] });
      }
    } else {
      target[item] = origin[item];
    }
  }
  return target;
}

Function.prototype.myCall = function (context, ...args) {
  context = Object(context || window);
  const key = Symbol();
  context[key] = this;
  const res = context[key](...args);
  delete context[key];
  return res;
};

Function.prototype.Bind = function (context, ...args) {
  context = Object(context || window);
  let fn = this;
  const key = Symbol();
  const result = function () {
    if (this instanceof fn) {
      this[key] = fn;
      this[key](...args);
      delete this[key];
    } else {
      context[key] = fn;
      context[key](...args);
      delete context[key];
    }
  };
  result.prototype = Object.create(fn.prototype);
  return result;
};

function myNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return typeof res === "object" || "function" ? res : obj;
}

function curry(fn) {
  return function curried(...args) {
    if (fn.length === args.length) {
      fn.apply(this, args);
    } else {
      return function (...brgs) {};
      return curried.apply(this, [...args, ...brgs]);
    }
  };
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return (args) => args;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => {
    return function (...args) {
      return a(b(...args));
    };
  });
}

function A() {
  if (this instanceof A) {
    throw new Error();
  }
}

async function pool(iterator, fn, max) {
  let res = [];
  let excuting = [];
  for (let item of iterator) {
    const pItem = Promise.resolve().then(() => fn(item));
    res.push(pItem);
    const e = pItem.then(() => excuting.splice(excuting.indexOf(e), 1));
    excuting.push(e);
    if (excuting.length >= max) {
      await Promise.race(excuting);
    }
  }
  return Promise.all(res);
}
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

function dfsTree(root, flag) {
  let stack = [];
  let res = [];
  stack.push(root);
  while (stack.length) {
    const item = stack.pop();
    if (item["name"] == flag) {
      res.push(item["name"]);
    } else {
      item["children"] &&
        item["children"].forEach((e) => {
          stack.push(e);
        });
    }
  }
  return res;
}
