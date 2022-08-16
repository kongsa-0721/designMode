/**
 * Created by KongSa on 2022/8/16-8:13 PM.
 * 结合了useContext useReducer 将状态抽离出来管理
 * 类似于redux的dispatch模式
 */
import React, { useContext, useReducer } from "react";

interface stateProps {
  name: string;
  food: string;
}

interface actionProps {
  type: "add" | "minus";
}

function reduceFn(preState: stateProps, action: actionProps) {
  const newState = { ...preState };
  switch (action.type) {
    case "add":
      newState.name = "kongsa";
      newState.food = "suancai";
      return newState;
    case "minus":
      newState.name = "chundan ";
      newState.food = "shi";
      return newState;
    default:
      return preState;
  }
}
//创建一个全局的上下文
const GlobalContext: any = React.createContext({});

function Conbiner(props: any) {
  const [state, dispatch] = useReducer(reduceFn, { name: "", food: "" });
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div>{props.children}</div>
    </GlobalContext.Provider>
  );
}
function DisplayContext() {
  const { state, dispatch } = useContext(GlobalContext);
  console.log(state, dispatch);
  return (
    <div>
      {state.name}
      <button onClick={() => dispatch({ type: "add" })}>add</button>
      <button onClick={() => dispatch({ type: "minus" })}>minus</button>
      {state.food}
    </div>
  );
}
export { Conbiner, DisplayContext };
