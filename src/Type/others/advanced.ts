/**
 * Created by KongSa on 2022/4/15-10:33 AM.
 */
// -------------------partial-----------------------
/**
 * 这里的in的意思是类型映射 遍历所有的类型 然后返回
 * p2: {cat?: string, dog?: string}
 */
type partial<T> = {
	[p in keyof T]?: T[p];
};

type p1 = {
	cat: string;
	dog: string;
};
//Initial type: {cat?: string, dog?: string}
type p2 = partial<p1>;
//Initial type: string
type p3 = p1["cat"];

// ---------------partial 把指定的key变为可选类型--------------------
// 把P约束为T的每一个key K in P 遍历 P
type partial1<T, P extends keyof T> = {
	[K in P]?: T[K];
};

type p4 = partial1<p1, "cat">;

// -------------------Readonly-------------------------

type Read<T> = {
	readonly [P in keyof T]: T[P];
};
//Initial type: {readonly cat: string, readonly dog: string}
type p5 = Read<p1>;

// --------------------Pick-------------------------

type pick<T, P extends keyof T> = {
	[K in P]: T[K];
};

type p6 = { bug: string; fix: string };

type p7 = pick<p6, "bug">;

// --------------------Record ------------------------

type record<T extends keyof any, P> = {
	[K in T]: P;
};

type p8 = {
	name?: string;
	age: number;
};

type p9 = record<"a" | "b", p8>;

//------------------ index signature ---------------

type p10 = { [a: string]: number };

//Initial type: string | number   ["0"]被js强转了 0
type p11 = keyof p10;

//--------------------Return type---------------------

function fnn() {
	return { x: 5, y: 5 };
}

type p12 = typeof fnn;
//{x: number, y: number}
type p13 = ReturnType<p12>;

//-------------------indexed access type----------------

const MyArray = [
	{ name: "Alice", age: 15 },
	{ name: "Bob", age: 23 },
	{ name: "Eve", age: 38 },
];

type p14 = typeof MyArray[number];

const newArr: p14 = {
	name: "",
	age: 2,
};

const key = "age";
//type key1 = typeof newArr[key];
type keyp = "name";
type key2 = typeof newArr[keyp];

//---------------------Conditional Type Constraints----------------------

//Type '"message"' cannot be used to index type 'T' 意思是不知道T上到底有没有message这个属性
//type p15<T> = T["message"];

type p16<T extends { message: unknown }> = T["message"];
type p19<T> = T extends { message: unknown } ? T["message"] : never;

type p17 = {
	message: string;
	age: number;
};

type p18 = p16<p17>;
type p20 = p19<p17>;

//如果是数组 返回数组每一项的类型 否则原路返回
type p21<T> = T extends any[] ? T[number] : T;
//获取数组的每一项 组成一个类型
type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

//Initial type: 1 | 2 | 3 | "str"
type p22 = Flatten<[1, 2, 3, "str"]>;

type toArray<T> = T extends any ? Array<T> : never;
//Typically, distributivity is the desired behavior. To avoid that behavior, you can surround each side of the extends keyword with square brackets.
type ToArrayHigh<Type> = [Type] extends [any] ? Array<Type> : never;
//报错
//const arr1: toArray<string | number> = [1, "1"];
const arr2: ToArrayHigh<string | number> = [];
export {};
