/**
 * Created by KongSa on 2022/10/7-4:48 PM.
 */
import React from "react";
import { JSONValue, ChangeName, ChangeValue, ActionType } from "./action";
import { Simulate } from "react-dom/test-utils";
type DispatchType = (action: ActionType) => void;
interface comp<DataType extends JSONValue = JSONValue> {
  dispatch: DispatchType;
  node: () => void;
  getPropertyView: () => React.ReactNode;
}
abstract class Comp<DataType extends JSONValue = JSONValue> implements comp {
  protected constructor() {
    this.dispatch = (_action: any) => {};
  }
  dispatch: DispatchType;
  abstract node(): void;
  abstract getPropertyView(): React.ReactNode;
  dispatchAction(value: DataType) {
    console.log(ChangeValue(value));
    this.dispatch(ChangeValue(value));
  }
}

class booleanComp extends Comp {
  value: string;

  constructor(val: string) {
    super();
    this.value = val;
  }

  changeValue(val: string) {
    // this.value = this.dispatch();
  }
  node() {
    console.log("this is" + this);
  }
  getPropertyView(): React.ReactNode {
    return <></>;
  }
}
export { booleanComp };
