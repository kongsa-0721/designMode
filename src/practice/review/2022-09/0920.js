/**
 * Created by KongSa on 2022/9/20-2:27 PM.
 */
const delay = (ms) => {
	return function (...args) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				ms > 2000 ? resolve(args) : reject("this is error");
			}, ms);
		});
	};
};
// 如果小于ms时间 数据返回回来 就不会展示loading 否则 展示loading 但是不影响数据 数据的时间还是之前的
const load = (success, ms) => {
	return function (...args) {
		const request = success(...args);
		return Promise.race([request, delay(ms)()]).then(
			(res) => {
				console.log(res);
			},
			(err) => {
				console.log(err);
				return request;
			},
		);
	};
};
async function app() {
	const res = await load(delay(2001), 1000)(1, 1, 1, 1);
	console.log(res);
}
app();
/**
 * fiber是什么 纤程 新的协调引擎 主要是支持虚拟dom的渐进式渲染
 * 对大型复杂的任务进行切片
 * 对优先级进行划分 高优先级打断低优先级
 * 对任务进行 挂起  恢复 终止
 *
 * 一个react的组件的渲染主要是以下两个阶段
 * 调度阶段 用新的数据生成一颗新的树 通过diff算法 遍历旧的树 快速找出需要更新的元素 放到更新队列中去 得到新的更新队列
 * 渲染阶段 遍历更新队列 调用宿主环境的api 更新渲染对应的元素 宿主环境如 DOM Native
 * 16之前 使用stack Reconciler 使用递归的方式 创建虚拟dom 递归的过程是不能中断的 超过16ms 就会掉帧
 * 16及以后 使用Fiber Reconciler 重构数据结构 改成迭代中可异步中断更新过程
 * fiber需要保存三个节点 父节点 兄弟节点 子节点 中断之后仍可以继续工作
 * Fiber Node Fiber NodeTree
 * render 或者 setState之后会开始创建或者更新fiber树
 * 从根节点遍历fiber树 这个阶段可以暂停 终止 重启
 *
 */
class Person {
	constructor() {}
	get() {
		return "this is a person example";
	}
}
let p1 = new Person();
console.log(typeof Person);
console.log(typeof p1);
