/**
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请你在该数组中找出 和为目标值 target的那 两个 整数，并返回它们的数组下标。
 */

/**
 * 最基础的双循环方法 注意j从1开始
 */
function twoSumFor(nums, target) {
	let len = nums.length;
	for (let i = 0; i < len; i++) {
		for (let j = 1; j < len; j++) {
			if (nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
}

function twoSumMap(nums, target) {
	let map1 = new Map();
	for (let i = 0; i < nums.length; i++) {
		let flag = target - nums[i];
		if (map1.has(flag)) {
			return [map1.get(flag), i];
		}
		map1.set(nums[i], i);
	}
}

function twoSumObj(nums, target) {
	let obj = {};
	for (let i = 0; i < nums.length; i++) {
		let flag = target - nums[i];
		if (obj[flag] != null) {
			return [obj[flag], i];
		}
		obj[nums[i]] = i;
	}
}

function twoSum(nums, target) {
	const myMap = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (myMap.has(target - nums[i])) {
			return [myMap.get(target - nums[i]), i];
		}
		myMap.set(nums[i], i);
	}
	return [];
}
// for of 不能保证他的顺序 所以不能用for of
// 但是我们可以用lastIndexOf
let twoSumHack = function (nums, target) {
	const map = new Map();
	for (let item of nums) {
		const flag = target - item;
		if (map.has(flag)) {
			//改成lastIndexOf 返回最后一个数的下标 就可以了 因为之前的数可能已经被set进去了 返回最后一个就不会冲突
			return [nums.indexOf(item), map.get(flag)];
		}
		map.set(item, nums.indexOf(item));
	}
	return [];
};

//返回一个boolean值
let twoSumES6 = (nums, target) => {
	return nums.some((i) => nums.includes(target - i));
};
