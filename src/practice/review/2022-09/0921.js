/**
 * Created by KongSa on 2022/9/21-12:36 PM.
 */
const reg = /([A-Z])(\w+)/g;
const str =
	"RegExr was created by gskinner.com, and is proudly hosted by Media Temple.Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & JavaScript flavors of RegEx are supported. Validate your expression with Tests mode.";

str.replace(reg, function (a, b, c) {
	// a是全部的 b是第一个括号 c是第二个括号
	console.log(a);
	console.log(b);
	console.log(c);
});
