/**
 * Created by KongSa on 2022/9/10-8:04 PM.
 */
import * as assert from "assert";
import {
  deepClone1,
  deepClone2,
  deepClone3,
  finalClone,
} from "../../src/common/deepClone.js";

describe("deep clone differnet version", () => {
  it("clone a basic object", () => {
    let o1 = {
      a: "kongsa",
      b: {
        name: "chundan",
      },
    };
    let o2 = deepClone1(o1);
    assert.equal(JSON.stringify(o1), JSON.stringify(o2));
    //o1 o2 不相等 因为指向了新的内存地址
    assert.notEqual(o1, o2);
    assert.notEqual(o1.b, o2.b);
  });

  it("clone a circular reference success", () => {
    let o1 = {
      a: "kongsa",
      b: {
        name: "chundan",
      },
    };
    o1.c = o1;
    let o2 = deepClone2(o1);
    assert.equal(o2.c, o2);
    assert.notEqual(o1, o2);
    assert.notEqual(o1.b, o2.b);
  });
  it("clone a object with prototype", () => {
    function Cls() {
      this.a = 1;
    }
    Cls.prototype.b = "kongsa";
    let o1 = new Cls();
    let o2 = deepClone3(o1);
    //这两个都指向一个原型 都是kongsa
    assert.equal(o2.b, o1.b);
    assert.equal(o2.a, o1.a);
    //o2本身没有这个b属性 这个b属性在原型上 他要去原型上面找
    assert.equal(o2.hasOwnProperty("b"), false);
  });
  it("cloen a object with descriptor", () => {
    let o1 = {};
    Object.defineProperty(o1, "kongsa", {
      enumerable: false,
      value: 1,
      configurable: false,
      writable: false,
    });
    let o2 = finalClone(o1);
    let count = 0;
    for (let item in o2) {
      count++;
    }
    assert.equal(count, 0);
    assert.notEqual(o1, o2);
    assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  });
});
// describe("error in test", () => {
//   it("warning clone a circular reference", () => {
//     let o1 = {
//       a: "kongsa",
//       b: {
//         name: "chundan",
//       },
//     };
//     //在对象里面循环引用会语法错误 不能在声明之前调用 我们在后面加上 c属性
//     o1.c = o1;
//     let o2 = deepClone1(o1);
//     //这里会爆栈
//     assert.equal(JSON.stringify(o1), JSON.stringify(o2));
//   });
// });
describe("final version clone rest type", () => {
  it("clone a Array", () => {
    let o1 = [];
    o1.length = 3;
    let o2 = finalClone(o1);
    assert.notEqual(o1, o2);
    assert.equal(JSON.stringify(o1), JSON.stringify(o1));
  });
  //暂时不通过 属性名字不对 要copy attributes Object.getOwnPropertyNames(a)
  it("clone a String", () => {
    let o1 = new String("abc");
    let o2 = finalClone(o1);
    //这是一个string Object 内存地址不一样 不是基本数据类型了
    assert.notEqual(o1, o2);
    assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  });
  it("clone a Function", () => {
    function o1(a, b) {
      return a + b;
    }
    let o2 = finalClone(o1);
    assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  });
});
