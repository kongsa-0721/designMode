/**
 * Created by KongSa on 2022/9/4-2:31 PM.
 * 用setTimeout模拟setInterval
 * 集中管理 并暴露接口删除
 * name可以是symbol 防止重名
 */
interface ListProps {
	name: string;
	callback: () => void;
	time: number;
}
class TimerList {
	list: any[];
	constructor(props: ListProps) {
		this.list = [];
		this.list.push({
			name: props.name,
			callback: props.callback,
			time: props.time,
		});
		this.runtime.call(this, props.name);
	}
	//这个函数不暴露出去 在new的时候传递参数就可以了
	private runtime(name: string) {
		const _this = this;
		(function app() {
			const task = _this.list.find((item) => {
				return item.name === name;
			});
			task["t"] = setTimeout(() => {
				task.callback();
				clearTimeout(task["t"]);
				app();
			}, task.time);
		})();
	}
	//暴露接口清除定时器
	clearT(name: string) {
		const flag = this.list.findIndex((item) => {
			return item.name === name;
		});
		clearTimeout(this.list[flag].t);
		this.list.splice(flag, 1);
	}
}

export { TimerList };
