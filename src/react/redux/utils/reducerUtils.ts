/**
 * Created by KongSa on 2022/8/23-12:57 PM.
 */

import { ReduxAction } from "../store/action/action";
export function createReducer(
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
