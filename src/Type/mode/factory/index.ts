/**
 * Created by kongsa on 2022/4/2-4:46 PM.
 * 简单工厂
 */
import { factory1 } from "./method";

abstract class Coffee {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract getName(): string;
}
//要实现抽象的抽象方法 可以有很多
class CpacinoCoffee extends Coffee {
  getName(): string {
    return this.name;
  }
}
//static属性可以直接调用 不需要实例化
class CafeFactory {
  static order(name: string) {
    switch (name) {
      case "CpacinoCoffee":
        return new CpacinoCoffee("CpacinoCoffee").getName();
    }
  }
}

console.log(CafeFactory.order("CpacinoCoffee"));
console.log(factory1({ name: "cofe" }));
