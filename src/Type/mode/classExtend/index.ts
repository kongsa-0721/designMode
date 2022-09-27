import { AbstractComp } from "./app";
import { DispatchType } from "./app";

function StringControl<T>() {
  class StringComp extends AbstractComp<T, string> {
    readonly myString: string = "";
    constructor(props: { dispatch?: DispatchType; value?: any }) {
      super(props);
      this.myString = props.value;
    }
    getPropertyView(): any {
      return "this is a StringComp getPropertyView";
    }
    override getView(): any {
      //注意下面的调用 追溯到原型链上调用了
      return this;
    }

    reduce(action: any): any {
      return this.dispatchChangeValue(action);
    }

    override toJsonValue(): string {
      return this.myString;
    }
  }
  return StringComp;
}

// const a = StringControl();
// console.log(new a({ value: "this is a value" }).reduce("1234455"));
// console.log(new a({ value: "this is a value" }).toJsonValue());
// console.log(StringControl().prototype.getView());

function useControl() {
  const a = StringControl();
  for (let i = 0; i < 5; i++) {
    let flag = new Date().getMilliseconds();
    const app = new a({ value: flag });
    // flag =  app.reduce(flag + new Date().toLocaleDateString());
    console.log(app.toJsonValue());
  }
}
useControl();
