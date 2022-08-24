/**
 * Created by KongSa on 2022/8/22-8:07 PM.
 */
import React from "react";
import { connect } from "react-redux";
import { deleteDataAction, putDataAction } from "./store/action/action";
import { MyPromise } from "./utils/mypromise";
import { noSync } from "../async/methods";

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
