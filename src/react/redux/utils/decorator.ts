/**
 * Created by KongSa on 2022/9/23-1:28 PM.
 * 装饰器是一个函数
 */
/**
 * 类装饰器接收一个参数 是类本身 返回值是void 或者 返回一个新的类
 * 返回新的类 new之前的类 就是new新的类
 * @param target
 */
function decorator1(target: any) {
  console.log(target);
  class Dog {
    say() {
      console.log("this is dog class");
    }
  }
  return Dog;
}
@decorator1
class Person {
  say() {
    console.log("this is person class");
  }
}
export { Person };
