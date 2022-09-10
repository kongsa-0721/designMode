/**
 * Created by KongSa on 2022/9/10-8:04 PM.
 */
import * as assert from "assert";
import { deepClone1, deepClone2, deepClone3 } from "../src/deepClone.js";

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
});
describe("error in test", () => {
  it("warning clone a circular reference", () => {
    let o1 = {
      a: "kongsa",
      b: {
        name: "chundan",
      },
    };
    //在对象里面循环引用会语法错误 不能在声明之前调用 我们在后面加上 c属性
    o1.c = o1;
    let o2 = deepClone1(o1);
    //这里会爆栈
    assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  });
});
