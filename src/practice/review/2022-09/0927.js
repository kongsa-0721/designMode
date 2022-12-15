let arr = [6, 453, 1, 24, 6, 89];
function quickSort(element) {
	if (element.length < 2) {
		return element;
	}
	let base = element[0],
		leftArr = [],
		rightArr = [];
	for (let i = 1; i < element.length; i++) {
		if (element[i] > base) {
			rightArr.push(element[i]);
		} else {
			leftArr.push(element[i]);
		}
	}
	return quickSort(leftArr).concat(base, quickSort(rightArr));
}

function bubbleSort(element) {
	const len = element.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i; j++) {
			if (element[j] > element[j + 1]) {
				let temp = element[j];
				element[j] = element[j + 1];
				element[j + 1] = temp;
			}
		}
	}
	return element;
}

// console.log(quickSort(arr));
// console.log(bubbleSort(arr))

//手写call call改变函数的this指向
Function.prototype.myCall = function (context, ...args) {
	context = Object(context || window);
	const fn = this;
	const uniqueKey = Symbol();
	context[uniqueKey] = fn;
	const res = context[uniqueKey](...args);
	delete context[uniqueKey];
	return res;
};
//手写一下new
function myNew(fn, ...args) {
	let obj = Object.create(Object.getPrototypeof(fn));
	const res = fn.call(obj, ...args);
	// 返回值类型
	return typeof res === "object" || typeof res === "function" ? res : obj;
}
// fn打印2 改变了函数的this指向
const fn = function () {
	console.log(this.a);
}.bind({ a: 2 });
//手写bind
Function.prototype.myBind = function (context, ...args) {
	context = Object(context || window);
	//this显式调用 设置为fn
	let fn = this;
	const uniqueKey = Symbol();
	const result = function (...brgs) {
		// result作为构造函数调用 this指向new出来的对象
		if (this instanceof fn) {
			this[uniqueKey] = fn;
			this[uniqueKey](...args, ...brgs);
			delete this[uniqueKey];
		} else {
			context[uniqueKey] = fn;
			// 如果不是作为构造函数调用 直接执行这个 然后删除掉key
			context[uniqueKey](...args, ...brgs);
			delete context[uniqueKey];
		}
	};
	//修改一下原型
	result.prototype = Object.create(fn.prototype);
	//bind不需要获取函数的返回值
	return result;
};
const fn1 = function () {
	console.log(this.a);
}.myBind({ a: 2 });
fn1();

async function ctrlPromise(iterator, max, fn) {
	let all = [];
	let excuting = [];
	for (let item of iterator) {
		const pItem = Promise.resolve().then(() => fn(item));
		all.push(pItem);
		const e = pItem.then(() => {
			excuting.splice(excuting.indexOf(e), 1);
		});
		excuting.push(e);
		if (excuting.length >= max) {
			await Promise.race(excuting);
		}
	}
	return Promise.resolve(all);
}

const timeout = (i) => {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(i);
		}, i),
	).then((i) => {
		console.log(i, "结束");
		return i;
	});
};

(async () => {
	const res = await ctrlPromise([1000, 1000, 1000, 2000], 2, timeout);
	console.log(res);
})();

function retry(fn, delay, times) {
	return new Promise((resolve, reject) => {
		function func() {
			Promise.resolve(fn())
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					if (times === 0) {
						reject(err);
					} else {
						setTimeout(func, delay);
						times--;
					}
				});
		}
		func();
	});
}
