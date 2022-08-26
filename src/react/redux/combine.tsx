/**
 * Created by KongSa on 2022/8/22-8:07 PM.
 */
import React from "react";
import { connect } from "react-redux";
import { deleteDataAction, putDataAction } from "./store/action/action";
import { MyPromise } from "./utils/mypromise";
import { noSync } from "../async/methods";
import { logger } from "./utils/reduxMiddleware";
//
// const myReact = (() => {
//   let state: any[] = [],
//     storeSetter: any[] = [];
//   let stateIndex = 0;
//   function createStore(initialState: any, Index: number) {
//     //state 里面可以存null
//     return state[Index] !== undefined ? initialState : state[Index];
//   }
//   function createstoreSetter(Index: number) {
//     return function (newState: any) {
//       if (typeof newState === "function") {
//         state[Index] = newState(state[Index]);
//       } else {
//         state[Index] = newState;
//       }
//       // render()
//       // 在render里面把stateIndex置空 render之后 cacheState重新执行一遍 0 1 不置空就变成  2 3 4 5
//     };
//   }
//   function cacheState(initialstate: any) {
//     state = createStore(initialstate, stateIndex);
//     if (!storeSetter[stateIndex]) {
//       storeSetter.push(createstoreSetter(stateIndex));
//     }
//     let _state = state[stateIndex],
//       _setState = storeSetter[stateIndex];
//     stateIndex++;
//     return [_state, _setState];
//   }
//   return {
//     cacheState,
//   };
// })();
// const { cacheState } = myReact;
// console.log(cacheState);

fun([
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
// 使用 for of  for循环也可以
async function fun(arg: any[]) {
  for (let item of arg) {
    await item();
  }
}
//普通的forEach 每一次都创建一个函数 async fn1 async fn2 达不到延迟的效果
// function fun(arg: any[]) {
//   arg.forEach(async (item) => {
//     await item();
//   });
// }
function Combine(props: any) {
  new MyPromise((res, rej) => {
    res(props);
  }).then(
    (res) => {
      console.log(res);
    },
    (res) => {
      console.log("err");
    }
  );
  noSync();
  return (
    <div>
      {props.store.user.data.name}
      {props.store.user.data.age}
      <button
        onClick={() => {
          props.putdata({
            name: "kongsa",
            age: 20,
          });
        }}
      >
        put
      </button>
      <button
        onClick={() => {
          props.deleteData({
            name: "chundan",
            age: 22,
          });
        }}
      >
        delete
      </button>
    </div>
  );
}

export default connect(
  function (state) {
    return { store: state };
  },
  function (dispatch) {
    return {
      putdata(data: { name: string; age: number }) {
        dispatch(putDataAction(data));
      },
      deleteData(data: { name: string; age: number }) {
        dispatch(deleteDataAction(data));
      },
    };
  }
)(Combine);
