/**
 * Created by KongSa on 2022/4/14-8:37 PM.
 */
interface if1 {
  name: string;
  age: number;
}
//Initial type:"name" | "age"
type ty1 = keyof if1;

const a: ty1 = "name";
const b: ty1 = "age";

const ob1 = {
  name: "kongsa",
  age: 21,
};
//Initial type:{name: string, age: number}
type ty2 = typeof ob1;
//Initial type:"name" | "age"
type ty3 = keyof ty2;

const c: ty3 = "name";
const d: ty3 = "age";

/**
 * 根据对象的key来提取val
 */
export function getObjVal(str: string) {
  //此时 形参a被断言为 "name"|"key"
  return ob1[str as ty3];
}

// --------------------根据索引访问-------------------
interface if2 {
  pet: string;
  color: number;
}
type ty4 = keyof if2;
//Initial type: number | string   ty5 的类型就是 pet|color 联合起来
type ty5 = if2[ty4];

// --------------------接口继承 extend-------------------

interface if3 {
  car: string;
}

interface if4 {
  payload: number;
}

interface if5 extends if3, if4 {
  owner: string;
}
//human 有 if 3 4 5 所有的属性
const human: if5 = {
  car: "didi",
  payload: 100,
  owner: "kongsa",
};

// --------------------type继承 & 交叉类型-------------------

type ty6 = {
  car: string;
};
type ty7 = {
  payload: number;
};

const human1: ty7 & ty6 = {
  car: "didi",
  payload: 100,
};

// --------------------type运算符-------------------

type ty8 = ty7 extends ty6 ? "string" : "number";

type P<T> = T extends "x" ? 1 : 2;
//Initial type: 1 | 2
// extends前面的参数为联合类型时则会分解（依次遍历所有的子类型进行条件判断）联合类型进行判断。然后将最终的结果组成新的联合类型。
type ty9 = P<"x" | "y">;

// --------------------元组约束-------------------

type ty10 = [ty9];
const typle1: ty10 = [1];
const typle2: ty10 = [2];

type P1<T> = [T] extends ["x"] ? 1 : 2;
//Initial type: 2
//用元组约束之后 一个不通过 则全不通过
type ty11 = P1<"x" | "y">;
