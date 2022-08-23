/**
 * Created by KongSa on 2022/8/22-8:07 PM.
 */
import React from "react";
import { connect } from "react-redux";
import { ActionTypes } from "./store/action/action";
import { MyPromise } from "./utils/mypromise";

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
  return (
    <div>
      {props.store.user.data.name}
      {props.store.user.data.age}
      <button
        onClick={() => {
          props.putdata({
            name: "kongsa",
            age: 18,
          });
        }}
      >
        put
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
        dispatch({ type: ActionTypes.PUT_DATA, payload: data });
      },
    };
  }
)(Combine);
