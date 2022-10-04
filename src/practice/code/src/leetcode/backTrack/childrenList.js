/**
 * Created by KongSa on 2022/10/4-8:38 PM.
 * 题目给你输入一个无重复元素的数组 nums，其中每个元素最多使用一次，请你返回 nums 的所有子集。
 */
function getChildList(arr) {
  let res = [];
  let set = new Set();
  function backTrack(index, set) {
    res.push([...set]);
    for (let i = index; i < arr.length; i++) {
      set.add(arr[i]);
      backTrack(i + 1, set);
      set.delete(arr[i]);
    }
  }
  backTrack(0, set);
  return res;
}
console.log(getChildList([1, 2, 3]));
//[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]];
