let arr = [6, 453, 1, 24, 6, 89];
function quickSort(element) {
	if (element.length < 2) {
		return element;
	}
	let base = element[0],
		leftArr = [],
		rightArr = [];
	for (let i = 1; i < element.length; i++) {
		if (element[i] > base) {
			rightArr.push(element[i]);
		} else {
			leftArr.push(element[i]);
		}
	}
	return quickSort(leftArr).concat(base, quickSort(rightArr));
}

function bubbleSort(element) {
	const len = element.length;
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i; j++) {
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
// console.log(bubbleSort(arr))
