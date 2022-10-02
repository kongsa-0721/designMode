/**
 * Created by KongSa on 2022/10/2-7:00 PM.
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let reverseList = function (head) {
  let pre = null;
  let cur = head;
  while (cur) {
    let flag = cur.next;
    cur.next = pre;
    pre = cur;
    cur = flag;
  }
  return pre;
};
