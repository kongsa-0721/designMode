/**
 * Created by KongSa on 2022/8/24-10:08 AM.
 */
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject(3);

export function noSync() {
	//all 有一个拒绝 直接拒绝 全部通过 返回一个数组
	Promise.all([p1, p2, p3])
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});
	//全部落地之后的 返回状态以及返回值
	Promise.allSettled([p1, p2, p3])
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});
	//返回最快的那个 成功用then接收 失败用catch
	Promise.race([p3, p2, p1])
		.then((res) => {
			console.log(res);
		})
		.catch((e) => {
			console.log(e);
		});
	//成功或者失败都会执行 但是不能接收任何参数 返回一个设置了finally回调函数的promise对象
	Promise.resolve(3).finally(() => {
		console.log("finally");
	});
}

class Commient {
	static RESOLVE = "is_resolve";
	static REJECT = "is_reject";
	static PENDING = "is_pending";
	status: string;
	result: any;
	resolveCallBack: Array<(res: any) => void>;
	rejectCallback: Array<(res: any) => void>;
	constructor(fn: (res: any, rej: any) => void) {
		this.status = Commient.PENDING;
		this.result = null;
		this.resolveCallBack = [];
		this.rejectCallback = [];
		try {
			fn(this.resolve.bind(this), this.reject.bind(this));
		} catch (e) {
			this.reject(e);
		}
	}
	resolve(res: any) {
		setTimeout(() => {
			if (this.status === Commient.PENDING) {
				this.status = Commient.RESOLVE;
				this.result = res;
				this.resolveCallBack.forEach((i) => i(this.result));
			}
		});
	}
	reject(res: any) {
		setTimeout(() => {
			if (this.status === Commient.PENDING) {
				this.status = Commient.REJECT;
				this.result = res;
				this.rejectCallback.forEach((i) => i(this.result));
			}
		});
	}
	then(onFullfilled: (res: any) => void, onRejected: (res: any) => void) {
		return new Commient((res, rej) => {
			if (this.status === Commient.PENDING) {
				this.resolveCallBack.push(onFullfilled);
				this.rejectCallback.push(onRejected);
			}
			if (this.status === Commient.RESOLVE) {
				onFullfilled(this.result);
			}
			if (this.status === Commient.REJECT) {
				onRejected(this.result);
			}
		});
	}
	static all(callBackArray: any[]) {
		return new Commient((res, rej) => {
			if (callBackArray.length === 0) {
				res([]);
			} else {
				let count = 0;
				const result: any[] = [];
				for (let i = 0; i < callBackArray.length; i++) {
					//包装成promise返回值
					Promise.resolve(callBackArray[i]).then(
						(res1) => {
							result[i] = res1;
							if (++count === callBackArray.length) {
								res(result);
							}
						},
						(err) => {
							rej(err);
							return;
						},
					);
				}
			}
		});
	}
	static race(callback: any[]) {
		return new Commient((res, rej) => {
			for (const item in callback) {
				Promise.resolve(item).then(
					(result) => {
						res(result);
					},
					(err) => {
						rej(err);
					},
				);
			}
		});
	}
	static allSettled(callback: any[]) {
		return new Commient((resolve, reject) => {
			const result: any[] = [];
			let count = 0;
			for (let i = 0; i < callback.length; i++) {
				Promise.resolve(callback[i]).then(
					(res) => {
						result[i] = res;
						if (++count === callback.length) {
							resolve(result);
						}
					},
					(error) => {
						result[i] = error;
						if (++count === callback.length) {
							resolve(result);
						}
					},
				);
			}
		});
	}
}
