/**
 * Created by KongSa on 2022/9/10-3:36 PM.
 */
/**
 * js dom bom ecmaScript
 * script 标签的属性 defer 立即异步下载 推迟到html加载完之后执行 async 异步的下载 不知道什么时候下载完成 不知道什么时候执行
 * defer推迟执行的脚本 会在DOMContentLoaded 之前执行 就是在html加载完毕之后调用 包括里面的js都加载完毕
 * load 是全部资源都加载完毕 css image
 * 变量 定义 赋值 使用
 * 事件冒泡/捕获 捕获从body捕获到目标元素 冒泡从目标元素冒泡到body
 * 事件委托 一个ul下面有很多li标签 不能给每一个li标签都添加一个事件处理函数 就在父元素上添加事件处理函数 判断e.target是哪一个 触发对应的操作
 */
function debounce(fn, time, now) {
	let t = null;
	return function () {
		if (t) {
			clearTimeout(t);
		}
		if (now) {
			let first = !t;
			if (first) {
				fn.apply(this, arguments);
			}
			t = setTimeout(() => {
				t = null;
			}, time);
		} else {
			t = setTimeout(() => {
				fn.apply(this, arguments);
			}, time);
		}
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
/**
 * this 是在运行时 基于函数的执行环境所绑定的
 * 箭头函数没有this arguments prototype
 * 观察是否有显示绑定 对象调用 没有就指向外部
 */

function myInstance(obj, target) {
	if (!target || !obj || typeof obj !== "object") {
		return false;
	}
	if (Object.getPrototypeOf(obj) === target.prototype) {
		return true;
	} else {
		return myInstance(Object.getPrototypeOf(obj), target);
	}
}
Function.prototype.myCall = function (target, ...rest) {
	let thisArg = Object(target || window);
	let uniqueKey = Symbol();
	context[uniqueKey] = this;
	let res = context[uniqueKey]();
	delete context[uniqueKey];
	return res;
};
function myNew(fn, ...rest) {
	let obj = Object.create(fn.prototype);
	let res = fn.call(...rest);
	return typeof res !== "object" ? obj : res;
}
/**
 * weakMap/Set
 * key只能是object 引用数据类型 它持有的是对该数据的弱引用
 * 当没有比的地方引用这个key 就会被垃圾回收机制回收
 * 所以key是不可以枚举的 因为不知道它什么时候会被回收
 * 可以用在 闭包缓存 存储dom节点
 */
function cache(fn, resolver) {
	let cache = new Map();
	return function () {
		let cacheKey = resolver ? resolver(arguments) : Array.prototype.join("_");
		let cacheMap = cache.get(cacheKey);
		if (!cacheMap) {
			let value = fn.apply(this, arguments);
			cache.set(cacheKey, new WeakMap.set(this, value));
			return value;
		}
		if (cacheMap.has(this)) {
			console.log("命中缓存");
			return cacheMap.get(this);
		}
		let value = fn.apply(this, arguments);
		cacheMap.set(this, value);
		return value;
	};
}
Array.prototype.myForeach = async function (fn, context) {
	//使foreach支持异步 先获取this 还有当前操作的arr 每一次执行fn的时候await一下
	let thisArg = Object(context || window);
	let arr = this;
	for (let i = 0; i < arr.length; i++) {
		await fn.call(thisArg, arr[i], i, arr);
	}
};
/**
 * 把源函数保存起来 重写setTimeout函数
 * 把每一个定时器存起来 在调用函数的时候清除定时器 并且把定时器从栈中删除掉
 * @type {function(*, *): *}
 */
let originTime = setTimeout;
let stack = new Set();
setTimeout = function (fn, timer) {
	let t = originTime(fn, timer);
	stack.add(t);
	return t;
};
function clearAll() {
	stack.forEach((t) => {
		clearTimeout(t);
		stack.delete(t);
	});
}
function all(iterator) {
	return new Promise((resolve, reject) => {
		let result = [];
		let count = 0;
		for (let item of iterator) {
			Promise.resolve(item)
				.then((res) => {
					result.push(res);
					if (count++ === iterator.length) {
						resolve(result);
					}
				})
				.catch((e) => {
					reject(e);
				});
		}
	});
}
/**
 * 初始化一个正在执行的数组 把limit个实例放到数组里面
 * 使用Promise.race 等待这个执行的结果 看谁先执行完 执行完 再添加一个进来 并把之前的删除
 * 使用 Promise.all 返回执行过的所有结果
 */
async function currency(iterator, max, fn) {
	let ret = [];
	let excuting = [];
	for (const item of iterator) {
		const pItem = Promise.resolve().then(() => fn(item));
		ret.push(pItem);
		const e = pItem.then(() => {
			excuting.splice(excuting.indexOf(e), 1);
		});
		excuting.push(e);
		if (excuting.length >= max) {
			await Promise.race(excuting);
		}
	}
	return Promise.all(ret);
}
function timeout(i) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(i);
		}, i);
	}).then((e) => {
		console.log(e);
		return e;
	});
}
(async function () {
	const res = await currency([1000, 1000, 1000, 2000], 2, timeout);
	console.log(res);
})();
/**
 * http状态码
 * 100 继续 101 切换协议
 * 200 成功 204 请求成功 无内容 206 返回部分内容
 * 301 永久重定向 访问另一个地址 302 临时重定向 303 与301类似 使用post/get 协议 304 协商缓存 只有请求头 使用缓存的内容
 * 400 bad Request 不理解请求体 401 需要认证 403 forbidden 内容含有敏感信息 404找不到
 * 500 服务器内部错误 503 停机维护 504 网关超时 505 不支持的http协议
 * 501 不支持请求的功能 502 接收到一个无效的相应
 * 浏览器事件循环
 * 整体代码 执行微任务 dom渲染 宏任务
 * node事件循环
 * 整体代码 nextTick 微任务 宏任务 setTimeout
 */
let target = {};
let origin = {
	a: "kongsa",
	b: {
		name: "春丹",
		arr: [1, 2, 3, 4, 5],
	},
};
function deepClone(origin, target) {
	for (let item in origin) {
		if (origin[item] instanceof Array) {
			target[item] = [];
			deepClone(origin[item], target[item]);
		} else if (origin[item] instanceof Object) {
			target[item] = {};
			deepClone(origin[item], target[item]);
		} else {
			target[item] = origin[item];
		}
	}
}
//能完成最基本的任务
deepClone(origin, target);

Promise.resolve();
