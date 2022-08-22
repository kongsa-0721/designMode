/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
import { ActionTypes } from "./action";

type ReduxActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
interface ReduxAction<T> {
  type: ReduxActionTypes;
  payload: T;
}
interface StateType {
  data: {
    name: string;
    age: number;
  };
  index: number;
}
const initialState: StateType = {
  data: {
    name: "",
    age: 0,
  },
  index: 0,
};
function createReducer(
  initialState: any,
  handlers: {
    [type: string]: (state: any, action: any) => any;
  }
) {
  return function reducer(state = initialState, action: ReduxAction<any>) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
const userReducer = createReducer(initialState, {
  [ActionTypes.PUT_DATA]: (
    state: StateType,
    action: ReduxAction<{ name: string; age: number }>
  ): StateType => {
    return { ...state, data: action.payload };
  },
  [ActionTypes.DELETE_DATA]: (
    state: StateType,
    action: ReduxAction<{ name: string; age: number }>
  ): StateType => {
    return { ...state, data: action.payload };
  },
});
export { userReducer };
