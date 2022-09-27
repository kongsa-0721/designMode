/**
 * Created by KongSa on 2022/8/22-8:07 PM.
 */
import React from "react";
import { connect } from "react-redux";
import { deleteDataAction, putDataAction } from "./store/action/action";
import { MyPromise } from "./utils/mypromise";
import { TimerList } from "./utils/timerList";
import { Person } from "./utils/decorator";

function Combine(props: any) {
  const p1 = new Person();
  p1.say();
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
  const time1 = new TimerList({
    time: 2000,
    name: "time1",
    callback: () => {
      console.log("time1 do");
    },
  });
  function clearT() {
    time1.clearT("time1");
  }
  return (
    <div>
      <button onClick={clearT}>clearTime1</button>
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
