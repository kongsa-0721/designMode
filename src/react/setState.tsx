/**
 * Created by KongSa on 2022/8/12-10:51 PM.
 */
import React from "react";

class classComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    //不要在构造器中使用setState
    this.state = {
      isHot: true,
    };
    this.tick = this.tick.bind(this);
  }
  //进行初始化
  input1: null | HTMLInputElement = null;
  myRef = React.createRef<HTMLInputElement>();
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
    console.log(this.refs);
  }
  render() {
    return (
      <>
        <div>{this.state.isHot + ""}</div>
        <button onClick={() => this.tick()}>log</button>
        <input type="text" value={"name"} ref={"input1"} />
        <input
          type="text"
          ref={(e) => {
            this.input1 = e;
          }}
        />
        <input type="text" ref={this.myRef} />
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
  changeIt = () => {
    this.setState({
      isHot: !this.state.isHot,
    });
  };
}

function fnComponent() {
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

export { fnComponent };
