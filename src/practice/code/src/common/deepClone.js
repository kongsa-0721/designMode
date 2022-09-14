/**
 * Created by KongSa on 2022/9/10-7:54 PM.
 */
//基础版本
function deepClone1(origin) {
  let target = {};
  for (let item in origin) {
    if (typeof origin[item] === "object") {
      target[item] = deepClone1(origin[item]);
    } else {
      target[item] = origin[item];
    }
  }
  return target;
}
//不可控的情况下 最好是用深度优先搜索
//解决循环引用问题 递归改写成非递归
function deepClone2(origin) {
  let target = {};
  let map = new Map();
  map.set(origin, target);
  let stack = [{ target, origin }];
  while (stack.length) {
    const { target, origin } = stack.pop();
    for (let item in origin) {
      if (typeof origin[item] === "object") {
        if (map.has(origin[item])) {
          //这里要指向之前存过的地址 否则会测试用例不通过
          target[item] = map.get(origin[item]);
        } else {
          target[item] = {};
          stack.push({ target: target[item], origin: origin[item] });
          map.set(origin[item], target[item]);
        }
      } else {
        target[item] = origin[item];
      }
    }
  }
  return target;
}
//解决原型问题
function deepClone3(origin) {
  //以原型来进行创建
  let target = Object.create(Object.getPrototypeOf(origin));
  let map = new Map();
  map.set(origin, target);
  let stack = [{ target, origin }];
  while (stack.length) {
    const { target, origin } = stack.pop();
    for (let item of Object.getOwnPropertyNames(origin)) {
      //判断是否为null null被认为是空对象指针
      if (typeof origin[item] === "object" && origin[item] !== null) {
        if (map.has(origin[item])) {
          target[item] = map.get(origin[item]);
        } else {
          //用它的原型来创建一个新的对象
          target[item] = Object.create(Object.getPrototypeOf(origin[item]));
          stack.push({ target: target[item], origin: origin[item] });
          map.set(origin[item], target[item]);
        }
      } else {
        target[item] = origin[item];
      }
    }
  }
  return target;
}
//最终版本
function finalClone(origin) {
  //使用我们的新方法来判断类型
  let target = createObj(origin);
  let map = new Map();
  map.set(origin, target);
  let stack = [{ target, origin }];
  while (stack.length) {
    const { target, origin } = stack.pop();
    for (let item of Object.getOwnPropertyNames(origin)) {
      //获取属性 origin 上item的属性
      let descriptor = Object.getOwnPropertyDescriptor(origin, item);
      if (descriptor.hasOwnProperty("value")) {
        if (
          typeof origin[item] === "object" ||
          (typeof origin[item] === "object" && origin[item] !== null)
        ) {
          if (map.has(origin[item])) {
            descriptor.value = map.get(origin[item]);
          } else {
            descriptor.value = createObj(origin[item]);
            stack.push({ target: descriptor.value, origin: origin[item] });
            map.set(origin[item], descriptor.value);
          }
        } else {
          descriptor.value = origin[item];
        }
        Object.defineProperty(target, item, descriptor);
      } else {
        Object.defineProperty(target, item, descriptor);
      }
    }
  }
  return target;
}
function createObj(source) {
  let target;
  let type = typeof source;
  let toStringRes = Object.prototype.toString.call(source);
  let proto = Object.getPrototypeOf(source);
  if (proto === Array.prototype && toStringRes === "[object Array]") {
    target = source.slice();
  } else if (proto === String.prototype && toStringRes === "[object String]") {
    target = new String(source.valueOf());
  } else if (type === "function") {
    target = function (...args) {
      return source.call(this, ...args);
    };
  } else {
    target = Object.create(Object.getPrototypeOf(source));
  }
  return target;
}

export { deepClone1, deepClone2, deepClone3, finalClone };
