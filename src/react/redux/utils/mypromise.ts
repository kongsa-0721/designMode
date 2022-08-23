/**
 * Created by KongSa on 2022/8/23-9:15 AM.
 */
class MyPromise {
  static PENDING = "status_pending";
  static RESOLVE = "status_resolve";
  static REJECT = "status_reject";
  status: string;
  result: any;
  resolveCallBack: Array<(res: any) => void>;
  rejectCallBack: Array<(res: any) => void>;
  constructor(fn: (res: any, rej: any) => void) {
    this.status = MyPromise.PENDING;
    this.result = null;
    this.resolveCallBack = [];
    this.rejectCallBack = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }
  resolve(res: any) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.RESOLVE;
        this.result = res;
        this.resolveCallBack.forEach((i) => i(this.result));
      }
    });
  }
  reject(res: any) {
    setTimeout(() => {
      if (this.status === MyPromise.PENDING) {
        this.status = MyPromise.REJECT;
        this.result = res;
        this.rejectCallBack.forEach((i) => i(this.result));
      }
    });
  }
  then(onFullFilled: (res: any) => void, onRejected: (res: any) => void) {
    let _this = this;
    return new MyPromise(function (resolve, reject) {
      if (_this.status === MyPromise.PENDING) {
        //里面存在异步的时候 状态为待定 需要把函数储存起来 给reject/resove执行
        _this.resolveCallBack.push(onFullFilled);
        _this.rejectCallBack.push(onRejected);
      }
      if (_this.status === MyPromise.RESOLVE) {
        onFullFilled(_this.result);
      }
      if (_this.status === MyPromise.REJECT) {
        onRejected(_this.result);
      }
    });
  }
}
export { MyPromise };
