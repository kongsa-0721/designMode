/**
 * Created by KongSa on 2022/9/17-12:20 PM.
 * 写了一圈下来 发现很多都不会了 看来明天早上要好好复习
 */
let set = new Set([1, 1, 1, 1, 1, 1]);
[[...set], [].map.call(set, (e) => e), Array.from(set), [].slice.apply(set)].forEach(
	(e) => console.log(e),
);

//今天手撕一些代码 异步并发 清空所有定时器 对象数组=>树
async function run(iterator, max, fn) {
	let all = [];
	let excuting = [];
	for (let item of iterator) {
		let pItem = Promise.resolve().then(() => fn(item));
		all.push(pItem);
		const e = pItem.then(() => excuting.splice(excuting.indexOf(e), 1));
		excuting.push(e);
		if (excuting.length >= max) {
			await Promise.race(excuting);
		}
	}
	return Promise.all(all);
}
function fn(num) {
	return new Promise((res) => {
		setTimeout(() => {
			res();
		}, num);
	});
}
//清空所有定时器
const origin = setTimeout;
let timerArr = new Set();
setTimeout = function (fn, timer, arg) {
	let res = origin(fn, timer, arg);
	timerArr.add(res);
	return res;
};
function clear() {
	timerArr.forEach((e) => {
		clearTimeout(e);
		timerArr.delete(e);
	});
}
//对象数组 树 这个也是正确的做法
function revert(arr) {
	const newArr = JSON.parse(JSON.stringify(arr));
	return newArr.filter((e) => {
		newArr.forEach((item) => {
			if (item.pid === e.id) {
				if (e.children) {
					e.children.push(item);
				} else {
					e.children = [];
					e.children.push(item);
				}
			}
		});
		return e.pid === 0;
	});
}
function deepClone(origin) {
	let target = Object.create(Object.getPrototypeOf(origin));
	let stack = [{ origin, target }];
	let map = new Map();
	while (stack.length) {
		const { origin, target } = stack.pop();
		for (let item of origin) {
			if (typeof origin[item] === "object" && origin[item] !== null) {
				if (map.has(origin[item])) {
					target[item] = map.get(origin[item]);
				} else {
					target[item] = Object.create(Object.getPrototypeOf(origin[item]));
					map.set(origin[item]);
					stack.push({ origin: origin[item], target: target[item] });
				}
			} else {
				target[item] = origin[item];
			}
		}
	}
	return target;
}
Function.prototype.myCall = function (context, ...args) {
	context = Object(context || window);
	const uniqueKey = Symbol();
	context[uniqueKey] = this;
	const res = context[uniqueKey](...args);
	delete context[uniqueKey];
	return res;
};
