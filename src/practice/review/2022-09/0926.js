/**
 * 空对象 数组的toString方法
 */

console.log({}.toString()); //这个转出来是[object object]
console.log([1].toString()); //转的是数组里面的内容
//数组里面没有内容 会被转化成false 所以打印1
if ([] == false) {
	console.log(1);
}
//空对象被转化为字符串 就是真
if ({} == false) {
	console.log(2);
}
//这个对象是存在的 所以就是true
if ({}) {
	console.log(5);
}
if ([]) {
	console.log(3);
}
//内存地址不一样
if ([1] == [1]) {
	console.log(4);
}

let arr = [3, 34, 21, 231, 2341, 345, 342, 324, 234, 234, 34245, 568, 4135, 8];

function quickSort(element) {
	if (element.length <= 1) {
		return element;
	}
	let base = element[0],
		leftArr = [],
		rightArr = [];
	for (let i = 1; i < element.length; i++) {
		if (element[i] < base) {
			leftArr.push(element[i]);
		} else {
			rightArr.push(element[i]);
		}
	}
	return quickSort(leftArr).concat(base, quickSort(rightArr));
}
function bubbleSort(element) {
	if (!element || element.length < 2) {
		return element;
	}
	for (let i = 0; i < element.length; i++) {
		for (let j = 0; j < element.length - i; j++) {
			if (element[j] > element[j + 1]) {
				let temp = element[j];
				element[j] = element[j + 1];
				element[j + 1] = temp;
			}
		}
	}
	return element;
}

// console.log(quickSort(arr));
// console.log(bubbleSort(arr));
