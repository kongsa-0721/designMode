/**
 * Created by KongSa on 2022/9/23-1:58 PM.
 * 下午先学一点八股文吧
 */
//  1 2 4 每一次取值的时候输出
let defaultVal = 0;
let count = 0;
let obj = { a: 0 };
Object.defineProperty(obj, "a", {
	get: function () {
		if (count === 2) {
			return defaultVal + 2;
		}
		count++;
		return ++defaultVal;
	},
});
console.log(obj.a);
console.log(obj.a);
console.log(obj.a);

//原型问题 函数的实例 => 构造函数的原型 => Object.prototype => null
let F = function () {};
Object.prototype.a = function () {
	console.log("this is a ");
};
Function.prototype.b = function () {
	console.log("this is b ");
};
const f = new F();
f.a();
// f.b();

//多叉树的dfs
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
// 递归查询 A
function stack(node) {
	let res = [];
	let stack = [node];
	while (stack.length) {
		const item = stack.pop();
		if (item.name === "A") {
			res.push(item.name);
		}
		if (item.children && item.children.length > 0) {
			item.children.map((v) => {
				stack.push(v);
			});
		}
	}
	return res;
}
console.log(stack(root));

//异步的情况
new Promise((resolve) => {
	console.log(1);
	resolve();
})
	.then(() => setTimeout(() => console.log(2), 1))
	.finally(() => console.log(4));

const timer = setTimeout(() => console.log(3), 1);

//curry
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) {
			return fn.apply(this, args);
		} else {
			return function (...brgs) {
				return curried.apply(this, args.concat(brgs));
			};
		}
	};
}
function sum(a, b, c) {
	return a + b + c;
}
let currySum = curry(sum);
console.log(currySum(1)(2)(2) + "curry");

//compose
function compose(...funcs) {
	if (funcs.length === 0) {
		return (arg) => arg;
	}
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reverse().reduce(
		(a, b) =>
			(...args) =>
				a(b(...args)),
	);
}
function log1() {
	console.log("log1 compose");
}
function log2() {
	console.log("log2 compose");
}
compose(log1, log2)(1);

//实现几个小方法 instanceof new call Object.create
function myInstance(target, origin) {
	if (!target || typeof target !== "object") {
		return false;
	}
	if (!origin.prototype) {
		throw Error;
	}
	if (Object.getPrototypeOf(target) === origin.prototype) {
		return true;
	} else {
		return myInstance(Object.getPrototypeOf(target), origin);
	}
}

function myNew(fn, ...args) {
	let obj = Object.create(Object.getPrototypeOf(fn));
	//注意 这里是apply 收集的是一个数组
	let res = fn.apply(obj, args);
	return typeof res === "object" ? res : obj;
}

function create(origin) {
	function F() {}
	F.prototype = origin;
	return new F();
}

Function.prototype.myCall = function (context, ...args) {
	//注意这里 要用object包起来
	context = Object(context || window);
	const key = Symbol();
	context[key] = this;
	const res = context[key](...args);
	delete context[key];
	return res;
};

const cycle = (() => {
	function curry(fn) {
		return function curried(...args) {
			if (args.length >= fn.length) {
				fn.apply(this, args);
			} else {
				return function (...brgs) {
					return curried.apply(this, args.concat(brgs));
				};
			}
		};
	}
	function compose(...func) {
		if (func.length === 0) {
			return (arg) => arg;
		}
		if (func.length === 1) {
			return func[0];
		}
		return func.reduce(
			(a, b) =>
				(...args) =>
					a(b(args)),
		);
	}
	return { curry, compose };
})();

const str = "UNIVERSITY";
//就相当于把str看成了数组 charCodeAt 返回在ASCII中的位置
console.log(str.charAt(0));
console.log(str.charCodeAt(0) + "ascII");
