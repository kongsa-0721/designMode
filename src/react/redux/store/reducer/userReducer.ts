/**
 * Created by KongSa on 2022/8/23-12:55 PM.
 */
import { ActionTypes, ReduxAction } from "../action/action";
import { createReducer } from "../../utils/reducerUtils";

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

const userReducer = createReducer(initialState, {
	[ActionTypes.PUT_DATA]: (
		state: StateType,
		action: ReduxAction<{ name: string; age: number }>,
	): StateType => {
		return { ...state, data: action.payload };
	},
	[ActionTypes.DELETE_DATA]: (
		state: StateType,
		action: ReduxAction<{ name: string; age: number }>,
	): StateType => {
		return { ...state, data: action.payload };
	},
});
export { userReducer };
