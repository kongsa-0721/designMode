/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
import { createStore } from "redux";
import { rootReducer } from "./reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());
export { store };
