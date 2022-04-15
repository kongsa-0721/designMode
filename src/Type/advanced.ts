/**
 * Created by KongSa on 2022/4/15-10:33 AM.
 */
// -------------------partial-----------------------
type partial<T> = {
  [p in keyof T]?: T[p];
};

type p1 = {
  cat: string;
  dog: string;
};
//Initial type: {cat?: string, dog?: string}
type p2 = partial<p1>;
//Initial type: string
type p3 = p1["cat"];

// -------------------partial 把指定的key变为可选类型-----------------------
// 把P约束为T的每一个key K in P 遍历 P
type partial1<T, P extends keyof T> = {
  [K in P]?: T[K];
};

type p4 = partial1<p1, "cat">;

// -------------------Readonly-----------------------

type Read<T> = {
  readonly [P in keyof T]: T[P];
};
//Initial type: {readonly cat: string, readonly dog: string}
type p5 = Read<p1>;
