/**
 * Created by KongSa on 2022/9/29-3:42 PM.
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
let mergeTwoLists = function (list1, list2) {
  let res = new ListNode(0);
  let ret = res;
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      ret.next = list1;
      list1 = list1.next;
    } else {
      ret.next = list2;
      list2 = list2.next;
    }
    ret = ret.next;
  }
  ret.next = list1 != null ? list1 : list2;
  return ret.next;
};
