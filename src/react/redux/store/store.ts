/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "../utils/reduxMiddleware";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
export { store };
