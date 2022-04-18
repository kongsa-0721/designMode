/**
 * Created by KongSa on 2022/4/14-8:51 PM.
 */

export class cl1 {
  name: string;
  constructor(props: ty4) {
    console.log(props);
    this.name = props.name;
  }
}
// private protected 的属性不能被获取到
type ty4 = cl1;

// ----------------把类当作接口使用---------------

const obj1: cl1 = { name: "" };
