/**
 * this is redux middleware
 * 在dispatch action 和 到达reducer 之间提供了逻辑插入点
 * Created by KongSa on 2022/8/24-9:35 AM.
 */

// function logger(store: any) {
//   return function wrapDispatchToAddLogging(next: any) {
//     return function dispatchAndLog(action: any) {
//       console.log("dispatching", action);
//       let result = next(action);
//       console.log("next state", store.getState());
//       return result;
//     };
//   };
// }

/**
 * store 状态
 * next 是下一个中间件的dispatch方法
 * action 派发的action
 * @param store
 */
export const logger = (store: any) => (next: any) => (action: any) => {
	console.group(action.type);
	console.info("dispatching", action);
	//result 就是派发之后的state
	const result = next(action);
	console.log("next state", store.getState());
	console.groupEnd();
	return result;
};
