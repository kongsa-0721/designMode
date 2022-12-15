/**
 * Created by KongSa on 2022/9/5-7:43 PM.
 */
function debounce(fn, time, now) {
	let t = null;
	return function () {
		if (t) {
			clearTimeout(t);
		}
		t = setTimeout(() => {
			fn.apply(this, arguments);
		}, time);
	};
}

function throttle(fn, time) {
	let begin = 0;
	return function () {
		let now = new Date().getTime();
		if (now - begin > time) {
			fn.apply(this, arguments);
			begin = now;
		}
	};
}
function myInstance(obj, target) {
	if (!obj || typeof obj !== "object") {
		return false;
	}
	if (!target.prototype) {
		throw Error;
	}
	if (Object.getPrototypeOf(obj) === target.prototype) {
		return true;
	} else {
		return myInstance(Object.getPrototypeOf(obj), target);
	}
}
/**
 * this 是在运行时基于函数的执行环境绑定的
 * 观察是否是显示绑定 或者是不是对象调用
 * 箭头函数没有this指向 拿的是外层函数作用域的this 或者 window
 * 箭头函数没有arguments
 * 箭头函数没有this指向 没有prototype 不能作为构造函数 不能new
 * */

function myNew(fn, ...rest) {
	let obj = Object.create(fn.prototype);
	let res = fn.apply(obj, rest);
	return typeof res === "object" ? res : obj;
}

function whichType(obj) {
	if (obj == null) {
		return obj + "";
	}
	return typeof obj === "object" || "function"
		? Object.prototype.toString.call(obj)
		: typeof obj;
}
Function.prototype.myCall = function (context, ...rest) {
	context = Object(context || window);
	const Key = new Symbol();
	context[Key] = this;
	const res = context[Key](...rest);
	delete context[Key];
	return res;
};
for (var i = 0; i < 5; i++) {
	(function (i) {
		setTimeout(() => {
			console.log(i);
		}, i * 1000);
	})(i);
}
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}
async function ddo() {
	for (let i = 0; i < 5; i++) {
		await sleep(1000).then(() => console.log(i));
	}
}
//将forEach重写 改成可异步迭代的
Array.prototype.myForeach = async function (callback, thisArg) {
	thisArg = Object(thisArg || window);
	let toBeArr = this;
	for (let i = 0; i < toBeArr.length; i++) {
		await callback.call(thisArg, toBeArr[i], i, toBeArr);
	}
};
// ddo();
function pp() {}
let p1 = new pp();
let protoArr = [
	Function.prototype.__proto__ === Object.prototype,
	Function.__proto__ === Function.prototype,
	Object.__proto__ === Function.prototype,
	pp.__proto__ === Function.prototype,
	p1.__proto__ === pp.prototype,
];
protoArr.forEach((e) => {
	console.log(e);
});
/**
 * es6
 * let const 块级作用域声明 不会变量提升 不允许重复定义 const 定义的值不可以被改变
 * 扩展运算符  Symbol.iterator 消费这个接口 可以扩展运算符一定可以for of 也是消费这个接口
 * 结构赋值  赋值是给键值对的value赋值
 * set map
 * class
 * promise async await
 * Object.assign entries
 * 没想起来的 箭头函数 模版字符串
 * Array.from of string.includes
 *
 * css权重
 * !important
 * 行内 1000
 * id 100
 * class 伪类选择器 属性选择器 10
 * 标签 伪元素 1
 * 通配符 最小
 */

const originTime = window.setTimeout;
let timeStack = new Set();
window.setTimeout = function (fn, time, ...args) {
	let timer = originTime(fn, time, ...args);
	timeStack.add(timer);
	return timer;
};
function clearAll() {
	timeStack.forEach((e) => {
		clearTimeout(e);
		timeStack.delete(e);
	});
}

class Com {
	static PEDING = "peding";
	static RESOLVE = "resolve";
	static REJECT = "reject";
	status = null;
	result = null;
	FullStack = [];
	FailStack = [];
	constructor(fn) {
		this.status = Com.PEDING;
		try {
			fn(this.resolve.bind(this), this.reject.bind(this));
		} catch (e) {
			this.reject(e);
		}
	}
	resolve(res) {
		setTimeout(() => {
			if (this.status === Com.PEDING) {
				this.status = Com.RESOLVE;
				this.result = res;
				this.FullStack.forEach((e) => {
					e(this.result);
				});
			}
		});
	}
	reject(res) {
		setTimeout(() => {
			if (this.status === Com.PEDING) {
				this.status = Com.REJECT;
				this.result = res;
				this.FailStack.forEach((e) => {
					e(this.result);
				});
			}
		});
	}
	then(onFilled, onReject) {
		return new Com(() => {
			if (this.status === Com.PEDING) {
				this.FullStack.push(onFilled);
				this.FailStack.push(onReject);
			}
			if (this.status === Com.RESOLVE) {
				onFilled(this.result);
			}

			if (this.status === Com.REJECT) {
				onReject(this.result);
			}
		});
	}
	static all(iterator) {
		return new Promise((res, rej) => {
			if (iterator.length === 0) {
				res([]);
			}
			let result = [];
			let count = 0;
			for (let i = 0; i < iterator.length; i++) {
				Promise.resolve(iterator[i])
					.then((res) => {
						result[i] = res;
					})
					.catch((e) => {
						rej(e);
					});
				if (++count === iterator.length) {
					res(result);
				}
			}
		});
	}
	static race(iterator) {
		return new Promise((res, rej) => {
			for (let item of iterator) {
				Promise.resolve(item)
					.then((result) => {
						res(result);
					})
					.catch((e) => {
						rej(e);
					});
			}
		});
	}
}

/**
 * 事件轮询
 * 执行同步代码 微任务 渲染dom 宏任务执行
 * 宏任务不会阻塞dom
 * 微任务优先级比较高 因为宏任务执行前 微任务栈必须是空的
 * 在执行任务的时候没有渲染dom
 */
