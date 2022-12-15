import { JSONValue } from "./type";
import { changeValueAction } from "./action";

export type DispatchType = (action: any) => void;

interface Comp<viewRuturn = any, dataType = JSONValue> {
	dispatch: DispatchType;

	getView(): viewRuturn;

	getPropertyView(): any;

	reduce(action: any): this;

	toJsonValue(): dataType;
}

abstract class AbstractComp<viewRuturn = any, dataType extends JSONValue = JSONValue>
	implements Comp
{
	dispatch: DispatchType;

	constructor(props: { dispatch?: DispatchType; value?: any }) {
		this.dispatch = props.dispatch
			? props.dispatch
			: (action: any) => {
					return action;
			  };
	}

	abstract getPropertyView(): any;

	abstract getView(): any;

	abstract reduce(action: any): this;

	abstract toJsonValue(): dataType;

	dispatchChangeValue(value: dataType) {
		return this.dispatch(changeValueAction(value));
	}
}

export { AbstractComp };
