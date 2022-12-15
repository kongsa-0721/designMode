/**
 * Created by KongSa on 2022/10/9-2:39 PM.
 * 今天就写几道难一点的手写题
 */

//深拷贝
function deepCopy(origin) {
	let target = Object.create(Object.getPrototypeOf(origin));
	let stack = [{ origin, target }];
	let map = new Map().set(origin, target);
	while (stack.length) {
		const { origin, target } = stack.pop();
		for (let item of Object.getOwnPropertyNames(origin)) {
			if (origin[item] !== null && typeof origin[item] === "object") {
				if (map.has(origin[item])) {
					target[item] = origin[item];
				} else {
					target[item] = Object.create(Object.getPrototypeOf(origin[item]));
					map.set(origin[item], target[item]);
					stack.push({ origin: origin[item], target: target[item] });
				}
			} else {
				target[item] = origin[item];
			}
		}
	}
	return target;
}

//bind
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
	//注意修改原型
	result.prototype = Object.create(Object.getPrototypeOf(fn));
	return result;
};

//new
function myNew(fn, ...args) {
	let obj = Object.create(Object.getPrototypeOf(fn));
	const res = fn.apply(obj, args);
	return typeof res === "object" || "function" ? res : obj;
}

//异步并发
async function pool(iterator, fn, max) {
	let ret = [];
	let excuting = [];
	for (let item of iterator) {
		let pItem = Promise.resolve().then(() => fn(item));
		ret.push(pItem);
		let e = pItem.then(() => excuting.splice(excuting.indexOf(e), 1));
		excuting.push(e);
		if (excuting.length >= max) {
			await Promise.race(excuting);
		}
	}
	return Promise.all(ret);
}

//curry&compose
function curry(fn) {
	return function curried(...args) {
		if (fn.length === args.length) {
			return fn.apply(this, args);
		} else {
			return function (...brgs) {
				return curried.apply(this, [...args, ...brgs]);
			};
		}
	};
}
function compose(funcs) {
	if (funcs.length === 0) {
		return (arg) => arg;
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
