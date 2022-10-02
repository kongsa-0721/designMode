/**
 * Created by KongSa on 2022/10/2-2:55 PM.
 */

const map = new Map();
map.set("name", "kongsa");
map.forEach((e, i, origin) => {
  console.log(e, i, origin);
});
//entries对象 返回的是一个数组 里面的每一项还是数组 key val
//fromEntries 把键值对列表转化为对象 可以转化map 或者键值对数组
console.log(Object.entries(Object.fromEntries(map)));

const arr = [1, 1, 1, 1];
const ppx = arr.entries(); //返回值是一个可迭代的对象 每一个都是一个数组
for (let item of ppx) {
  console.log(item);
}

// set = Array.prototype.slice.call(set);
// set = [].map.call(set, (e) => e);
let set = new Set([1, 11, 2, 22, 3, 33]);
// set = [...set];
// set = Array.from(set);
set = Array.of(...set);
console.log(set);
console.log([].map.call([1, 2, 3, 4, 56], (e) => e));
