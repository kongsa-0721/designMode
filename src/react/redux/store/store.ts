/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
import { createStore } from "redux";
import { combineReducers } from "redux";
import { userReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  combineReducers({ user: userReducer }),
  composeWithDevTools()
);
export { store };
