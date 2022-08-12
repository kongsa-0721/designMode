/**
 * Created by KongSa on 2022/8/12-10:58 PM.
 */

import React from "react";

class classComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  //进行初始化
  tick() {
    //这种方法被弃用 推荐第三种方法
    console.log(this.refs.input1);
  }
  input2: null | HTMLInputElement = null;
  myRef = React.createRef<HTMLInputElement>();
  render() {
    return (
      <>
        <input type="text" ref={"input1"} />
        <input
          type="text"
          ref={(e) => {
            this.input2 = e;
          }}
        />
        <input type="text" ref={this.myRef} />
      </>
    );
  }
}
