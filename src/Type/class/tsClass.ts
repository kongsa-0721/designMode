class Parent {
	age: number;
	constructor(age: number) {
		this.age = age;
	}
	getParentAge() {
		console.log("Parent");
		console.log(this);
		console.log("Parent" + this.age);
	}
}

class Child extends Parent {
	constructor(age: number) {
		super(age);
	}
	getChildAge() {
		console.log("Child");
		console.log(this);
		console.log("Child" + this.age);
	}
}
const a = new Child(18);
a.getChildAge();
a.getParentAge();
class P {
	// readonly age: number;
	constructor(age: number) {
		// this.age = age;
	}
}
const p1 = new P(12);
console.log(p1);
//类型保护函数 基础类型保护
//typeof只能做 等于/不等于的比较 typeof item === "string"
//不能做 (typeof item).includes("string")
//只能string/number/boolean/symbol 只能识别这四种 才能作为类型保护
function isString(item: string | number): item is string {
	return typeof item === "string";
}
//item是一个字符串或者是数字
const item = Math.random() * 10 > 5 ? "" : 1;
if (isString(item)) {
	console.log(item.length);
} else {
	console.log(item.toFixed());
}
//instance类型保护 实例的原型
export {};
