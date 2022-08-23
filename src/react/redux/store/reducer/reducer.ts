/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";

//store => {user:{},index:0} 这个user映射到store里面
export const rootReducer = combineReducers({ user: userReducer });
