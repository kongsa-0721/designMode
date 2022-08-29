/**
 * Created by KongSa on 2022/8/29-1:21 PM.
 * 整理在图书馆学的知识 从0826--
 */
/**
 * 数组扁平化 flat
 */
let Carray = [[12, 34, 2, 2], 3, 41, 2, 33, [33, 211, 13, 79, 5645]];
function flat(arr, depth) {
  if (!arr) {
    return arr;
  }
  return arr.reduce((total, cur) => {
    return Array.isArray(cur) ? flat(cur, depth - 1) : [...total, ...cur];
  }, []);
}

function logDetail() {
  console.log(flat(Carray, 1));
}
export { logDetail };
