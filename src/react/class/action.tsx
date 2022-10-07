/**
 * Created by KongSa on 2022/10/7-5:09 PM.
 */
type JSONValue = number | string | boolean | JSONObject | JSONArray;
interface JSONObject {
  [x: string]: JSONValue | undefined;
}
interface JSONArray extends Array<JSONValue> {}

enum actionTypes {
  CHANGE_VALUE = "CHANGE_VALUE",
  CHANGE_NAME = "CHANGE_NAME",
}

interface ChangeValueAction<DataValue extends JSONValue = JSONValue> {
  value: DataValue;
  type: actionTypes.CHANGE_VALUE;
}

interface ChangeNameAction<DataValue extends JSONValue = JSONValue> {
  value: DataValue;
  type: actionTypes.CHANGE_NAME;
}

function ChangeValue(data: JSONValue): ChangeValueAction {
  console.log(data);
  return {
    value: data,
    type: actionTypes.CHANGE_VALUE,
  };
}
function ChangeName(data: JSONValue): ChangeValueAction {
  return {
    value: data,
    type: actionTypes.CHANGE_VALUE,
  };
}
type ActionType = ChangeNameAction | ChangeValueAction;
export {
  JSONValue,
  JSONArray,
  JSONObject,
  ChangeName,
  ChangeValue,
  ActionType,
};
