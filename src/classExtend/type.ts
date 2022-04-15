/**
 * Created by kongsa on 2022/4/2-1:58 PM.
 */
export type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue | undefined;
}

export interface JSONArray extends Array<JSONValue> {}
