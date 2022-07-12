/**
 * Created by KongSa on 2022/4/19-3:00 PM.
 * issue3 => 支持把给定的 keys 对应的属性变成可选的
 */

interface Issue3 {
  name: string;
  age: number;
  type: boolean;
}

type p1 = Partial<Issue3>;

type Par<T> = {
  [P in keyof T]?: T[P];
};

type p2 = Par<Issue3>;

//判断两个类型是否相等
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
type equal1<X, Y> = [X] extends [Y] ? ([Y] extends [X] ? true : false) : false;

type p3 = Equals<p1, p2>;
type p4 = equal1<p1, p2>;

type Optional<T, P extends keyof T> = Omit<T, P> & Partial<Pick<T, P>>;

type Require<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>;

export {};
