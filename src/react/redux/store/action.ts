/**
 * Created by KongSa on 2022/8/22-7:25 PM.
 */
export const ActionTypes = {
  PUT_DATA: "put_data",
  DELETE_DATA: "delete_data",
};
const putDataAction = () => {
  return {
    type: ActionTypes.PUT_DATA,
  };
};
const deleteDataAction = () => {
  return {
    type: ActionTypes.DELETE_DATA,
  };
};
export { putDataAction, deleteDataAction };
