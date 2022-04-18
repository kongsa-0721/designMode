/**
 * Created by KongSa on 2022/4/18-4:58 PM.
 * 希望参数 a 和 b 的类型都是一致的，即 a 和 b 同时为 number 或 string 类型。当它们的类型不一致的值，TS 类型检查器能自动提示对应的错误信息。
 */

//判断是否为字符串
const isStr = (a: string[] | number[]): boolean => typeof a[0] === "string";
//接收参数 string | number 不限个数
function issue2(...args: string[] | number[]) {
  if (isStr(args)) {
    return "this is a str" + args.map((item) => item);
  } else {
    let num: number = 0;
    return args.map((item) => num + (item as number));
  }
}
//让其自动推导返回值的类型
function nfn<T extends string | number>(a: T, b: T) {
  if (typeof a === "string") {
    return a + ":" + b;
  } else if (typeof a === "number") {
    return (a as number) + (b as number);
  } else {
    const check: never = a;
    return "";
  }
}

//函数的重载
// todo 了解函数的重载
function pfn(a: string, b: string): string;
function pfn(a: number, b: number): number;
function pfn(a: string | number, b: string | number): string | number {
  if (typeof a === "string") {
    return a + ":" + b;
  } else {
    return (a as number) + (b as number);
  }
}
export {};
