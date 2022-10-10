/**
 * Created by KongSa on 2022/8/26-8:22 PM.
 */
// @ts-nocheck
/**
 * 缓存函数
 * @param fn 需要缓存的函数
 * @param resolver 缓存函数的参数映射成一个key作为唯一标志
 */
function memorise(fn: any, resolver: any) {
  let cache = new Map();
  return function () {
    const cacheKey = resolver
      ? resolver(arguments)
      : Array.from(arguments).join("_");
    const contextMap = cache.get(cacheKey);
    if (!contextMap) {
      let value = fn.apply(this, arguments);
      cache.set(cacheKey, new Map().set(this, value));
      return value;
    }
    if (contextMap.has(this)) {
      console.log("命中缓存");
      return contextMap.get(this);
    }
    let val = fn.apply(this, arguments);
    contextMap.set(this, val);
    return val;
  };
}

function add(a, b) {
  return a + b;
}

const a = memorise(add);
// 缓存函数测试用例
console.log(a(1, 2));
console.log(a(1, 2));
console.log(a(1, 23));
console.log(a(1, 23));

/**
 * 重写foreach
 */
fun11([
  () => console.group("start"),
  () => sleep(1000),
  () => console.log("waiting2"),
  () => sleep(2000),
  () => console.log("waiting3"),
  () => sleep(3000),
  () => console.log("end"),
  () => console.groupEnd(),
]);
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, ms);
  });
}
// 使用 for await of  for循环也可以
// async function fun(arg: any[]) {
//   for (let item of arg) {
//     await item();
//   }
// }

//普通的forEach 每一次都创建一个函数 async fn1 async fn2 达不到延迟的效果
// function fun(arg: any[]) {
//   arg.forEach(async (item) => {
//     await item();
//   });
// }

// 重写foreach方法
// @ts-ignore
Array.prototype.myForeach = async function (callback, thisArg) {
  //获取调用myForeach的值 就是this 就是调用数组
  //防止thisArg不是对象 使用Object包装一下
  let _arr = this,
    _thisArg = thisArg ? Object(thisArg) : window;
  for (let i = 0; i < _arr.length; i++) {
    await callback.call(_thisArg, _arr[i], i, _arr);
  }
};
async function fun11(arg: any[]) {
  //这里也需要使用async await
  // @ts-ignore
  arg.myForeach(async (item) => {
    await item();
  });
}
/**
 * 构造出一个react环境 里面有render方法
 * 暴露出一个cacheState函数 模拟useState
 */
const myReact = (() => {
  let state: any[] = [],
    storeSetter: any[] = [];
  let stateIndex = 0;
  function createStore(initialState: any, Index: number) {
    //state 里面可以存null
    return state[Index] !== undefined ? initialState : state[Index];
  }
  function createstoreSetter(Index: number) {
    return function (newState: any) {
      if (typeof newState === "function") {
        state[Index] = newState(state[Index]);
      } else {
        state[Index] = newState;
      }
      // render()
      // 在render里面把stateIndex置空 render之后 cacheState重新执行一遍 0 1 不置空就变成  2 3 4 5
    };
  }
  function cacheState(initialstate: any) {
    state = createStore(initialstate, stateIndex);
    if (!storeSetter[stateIndex]) {
      storeSetter.push(createstoreSetter(stateIndex));
    }
    let _state = state[stateIndex],
      _setState = storeSetter[stateIndex];
    stateIndex++;
    return [_state, _setState];
  }
  return {
    cacheState,
  };
})();
const { cacheState } = myReact;
console.log(cacheState);
