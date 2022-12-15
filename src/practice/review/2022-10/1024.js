/**
 * Created by KongSa on 2022/10/24-10:17 AM.
 */

function debounce(fn, time, now) {
	let t = null;
	return function () {
		if (t) clearTimeout(t);
		if (now) {
			let first = !t;
			if (first) fn.apply(this, arguments);
			t = setTimeout(() => {
				t = null;
			}, time);
		} else {
			t = setTimeout(() => {
				fn.apply(this, arguments);
			}, time);
		}
	};
}

function throttle(fn, time) {
	let begin = 0;
	return function () {
		let now = new Date().getTime();
		if (now - begin > time) {
			fn.apply(this, arguments);
			begin = now;
		}
	};
}
