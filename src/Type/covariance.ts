/**
 * Created by KongSa on 2022/4/14-9:38 PM.
 */
interface animal {
  name: string;
}

interface dogtype extends animal {
  say: () => void;
}

let cat: animal;
let dog: dogtype = {
  name: "dog",
  say: () => {},
};
// ---------------- 协变 --------------------
//dog可以赋值给cat 但是cat上没有say属性  反过来不行
cat = dog;

//经过构造类型转换之后 如果关系逆转了 称之为逆变
type AnimalFn = (arg: animal) => void;
type DogFn = (arg: dogtype) => void;

let Eg1: AnimalFn = ({}) => {};
let Eg2: DogFn;
// 不再可以赋值了，
// AnimalFn = DogFn不可以赋值了, Animal = Dog是可以的
// Eg1 = Eg2;
// 反过来可以
Eg2 = Eg1;

export {};
