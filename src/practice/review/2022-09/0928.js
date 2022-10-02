//compose
function compose(...funcs) {
	if (funcs.length === 0) {
		return (arg) => arg;
	}
	if (funcs.length === 1) {
		return funcs[0];
	}
	return funcs.reduce((a, b) => {
		return function (...args) {
			return a(b(...args));
		};
	});
}

//柯里化
function curry(func) {
	return function curried(...args) {
		if (args.length >= func.length) {
			return func.apply(this, args);
		} else {
			return function (...brgs) {
				return curried.apply(this, args.concat(brgs));
			};
		}
	};
}
function sum(a, b, c) {
	return a + b + c;
}
let currySum = curry(sum);
console.log(currySum(1)(2)(2) + "curry");
