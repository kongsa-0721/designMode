/**
 * Created by KongSa on 2022/9/11-1:38 PM.
 */
//手写axios
const axios = (() => {
	const xhr = new XMLHttpRequest();
	function get(url) {
		return new Promise((resolve, reject) => {
			xhr.open("GET", url, true);
			xhr.onload = function () {
				console.log("进入这个函数");
				console.log(this);
				if (this.status === 200) {
					resolve({ response: this.response });
				} else {
					console.log("进入错误");
					reject({ response: this.response, status: this.status });
				}
			};
			xhr.send();
		});
	}
	return { get };
})();
axios
	.get("http://localhost:5000")
	.then((res) => {
		console.log(res);
	})
	.catch((e) => {
		console.log(e);
	});
async function pool(iterator, max, fn) {
	let ret = [];
	let exceting = [];
	for (const item of iterator) {
		const pItem = Promise.resolve().then(() => fn(item));
		ret.push(pItem);
		const e = pItem.then(() => exceting.splice(exceting.indexOf(e), 1));
		exceting.push(e);
		if (exceting.length >= max) {
			await Promise.race(exceting);
		}
	}
	return Promise.all(ret);
}
function clone(source) {
	let target = Object.create(Object.getPrototypeOf(source));
	let map = new Map();
	let stack = [{ source, target }];
	if (stack.length) {
		const { source, target } = stack.pop();
		for (let property in source) {
			if (typeof property === "object" && source[property] !== null) {
				if (map.has(source[property])) {
					target[property] = map.get(source[property]);
				} else {
					//这个对象是一个对象 创建一个以源对象原型为原型的对象 把他加入到stack中
					target[property] = Object.create(Object.getPrototypeOf(source[property]));
					stack.push({ source: source[property], target: target[property] });
					map.set(source[property], target[property]);
				}
			} else {
				target[property] = source[property];
			}
		}
	}
	return target;
}
/**
 * 100 继续 101 切换协议
 * 200 成功 204 只有请求头 没有内容 206 部分内容 大文件切片上传
 * 301 永久重定向 302 临时重定向 303 与301类似 使用get/post 304 协商缓存 没有请求内容
 * 400 badRequest 不理解请求参数 401 需要认证 403 forbidden 禁止 包含敏感信息 404 找不到 408 超时
 * 500 服务器内部错误 501 方法不被允许 502 503 服务器维护 504 网关超时 505 不支持http协议
 * 501 不支持请求的功能
 * 503 接收到了一个无效的相应
 * node事件循环 主题代码 nextTick 微任务 宏任务 Timeout Immedeite
 * 继承
 * 原型链继承
 * 盗用构造函数继承
 * 组合继承
 * 原型式继承
 * 寄生式继承
 * 寄生组合继承
 */
const inhert1 = (() => {
	function father() {
		this.fatherName = "kongsa";
	}
	function son() {}
	//不能给构造函数传递参数 原型上的引用值共享
	son.prototype = new father();
	const proto = son.prototype;
	return { proto };
})();
const inhert2 = (() => {
	function father() {
		this.fatherName = "pdx";
	}
	function son() {
		//盗用构造函数继承 访问不到父类原型上的方法
		father.call(this);
	}
	const proto = son.prototype;
	return { proto };
})();
const inhert3 = (() => {
	function father() {
		this.fatherName = "is inhert3";
	}
	function son() {
		father.call(this);
	}
	//构造函数会调用两次 有一定的性能问题
	son.prototype = new father();
	const proto = son.prototype;
	return { proto };
})();
const inhert4 = (() => {
	function father() {
		this.fatherName = "is object.create";
	}
	//一般来说 这个原型式继承 支持对象 可能不支持函数
	//实现信息之间的共享
	const son = Object.create(father.prototype);
	return { son };
})();
const inhert5 = (() => {
	function father() {
		this.fatherName = "寄生式继承";
	}
	function createObj(origin) {
		let clone = Object(origin);
		//类似于工厂模式
		clone.prototype.son = () => {
			console.log("this is son ");
		};
		return clone;
	}
	let son = createObj(father);
	return { son };
})();
const inhert6 = (() => {
	function father() {
		this.fatherName = "寄生组合继承";
	}
	function Son() {
		this.sonName = "实例上的属性";
		console.log(this.sonName, this.fatherName);
	}
	function create(origin) {
		//主要逻辑 创建一个新的对象 构造器指向子类
		let proto = Object(Object.getPrototypeOf(origin));
		proto.constructor = Son;
		Son.prototype = proto;
	}
	create(father);
	return { Son };
})();
console.log(inhert1.proto);
console.log(inhert2.proto);
console.log(inhert3.proto);
