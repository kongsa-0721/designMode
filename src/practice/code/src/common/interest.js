/**
 * Created by KongSa on 2022/9/12-3:22 PM.
 */
let defaultVal = 0;
Object.defineProperty(window, "a", {
	get() {
		return ++defaultVal;
	},
});
if (a == 1 && a == 2 && a == 3) {
	console.log('you"re win');
}

const len1 = ({} + {}).length; //30
const len2 = ([] + []).length; //0
const len3 = function () {}.length; //0
console.log(len1, len2, len3);
console.log([1, 2, 3] + [, 5, 6]); //1,2,3,5,6
