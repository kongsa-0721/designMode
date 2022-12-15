/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
export const ActionTypes = {
	PUT_DATA: "put_data",
	DELETE_DATA: "delete_data",
};
export type ReduxActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
export interface ReduxAction<T> {
	type: ReduxActionTypes;
	payload: T;
}
// 这个action可以直接放到dispatch里面 派发出去
const putDataAction = (data: { name: string; age: number }) => {
	return {
		type: ActionTypes.PUT_DATA,
		payload: data,
	};
};
const deleteDataAction = (data: { name: string; age: number }) => {
	return {
		type: ActionTypes.DELETE_DATA,
		payload: data,
	};
};
export { putDataAction, deleteDataAction };
