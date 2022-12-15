/**
 * 展开函数的参数 & 限定|自动推导返回值类型
 * todo 熟悉子类型的逆变|协变
 * */

interface user {
	name: string;
	age: number;
}
function fn<T extends user>(u: T): T {
	return {
		//展开u剩余的熟悉
		...u,
		name: u.name,
		age: 1,
	};
}
//这个形参u兼容了user 可以拥有user额外的属性
fn({ name: "kmg", age: 1, page: "one" });

//这个fn1返回值限定为了user
function fn1<T extends user>(u: T): user {
	return {
		name: u.name,
		age: 1,
	};
}

//自动推导返回类型
function fn2<T extends user>(u: T) {
	return {
		name: u.name,
		age: 1,
	};
}
//Initial type: {name: string, age: number}
type fnReturn = ReturnType<typeof fn2>;
export {};
