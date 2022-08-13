/**
 * Created by KongSa on 2022/8/12-10:51 PM.
 */
import React from "react";

class ClassComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    //不要在构造器中使用setState
    this.state = {
      isHot: true,
    };
    this.tick = this.tick.bind(this);
  }
  componentDidMount() {
    this.setState(
      //第一个参数 之前的state 第二个参数 props
      (preState: any, props: any) => {
        return {
          isHot: false,
          ppx: true,
        };
      },
      () => {
        console.log(this.state);
      }
    );
  }

  tick() {
    //这个动作是一个合并的动作 如果有别的值 不会去改变别的值 只改变这个isHot
    this.setState({ isHot: !this.state.isHot }, () => {
      console.log(this.state);
    });
  }
  render() {
    return (
      <>
        <div>{this.state.isHot + ""}</div>
        <button onClick={() => this.tick()}>log</button>
      </>
    );
  }
}
//简写方式 第一个参数是props 第二个是state 可以在基础上多添加属性 但是不能少写属性
class SimplyComponent extends React.Component<
  { name: string; age: number },
  { isHot: boolean }
> {
  //这个state直接被添加到实例属性上
  state = {
    isHot: true,
  };
  //使用箭头函数 不需要bind 或者使用{ () => this.changeIt }
  //第一个参数传递一个对象 第二个参数作出修改 获得到了最新的值
  changeIt = () => {
    this.setState(
      {
        isHot: !this.state.isHot,
      },
      () => {
        console.log(this.state.isHot);
      }
    );
  };
}

function FnComponent() {
  const [light, setLight] = React.useState(false);
  function tick() {
    setLight((pre: boolean) => {
      return !pre;
    });
  }
  return (
    <>
      {light + ""}
      <button onClick={tick}>light</button>
    </>
  );
}

class HocInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }
  handleChange(dataType: string) {
    const _this = this;
    return function (e: any) {
      _this.setState({ [dataType]: e.target.value });
    };
  }
  render() {
    return (
      <>
        <input type="text" onChange={this.handleChange("name")} />
        <input type="text" onChange={this.handleChange("age")} />
        <input type="text" onChange={this.handleChange("sex")} />
      </>
    );
  }
}

export { FnComponent, ClassComponent, SimplyComponent, HocInput };
