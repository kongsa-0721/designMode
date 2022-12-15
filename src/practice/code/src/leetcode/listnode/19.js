/**
 * Created by KongSa on 2022/9/29-3:26 PM.
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
let removeNthFromEnd = function (head, n) {
	let ret = new ListNode(0, head);
	let slow = ret,
		fast = ret;
	//fast指针先前进n步
	while (n--) {
		fast = fast.next;
	}
	//slow指针也前进 终止的位置就是倒数n
	while (fast.next !== null) {
		slow = slow.next;
		fast = fast.next;
	}
	//删除n并且返回头节点的下一个
	slow.next = slow.next.next;
	return ret.next;
};
let removeNthFromEndRetry = function (head, n) {
	let node = new ListNode(0, head);
	let slow = node;
	let fast = node;
	for (let i = 0; i < n; i++) {
		fast = fast.next;
	}
	while (fast.next) {
		fast = fast.next;
		slow = slow.next;
	}
	slow.next = slow.next.next;
	return node.next;
};
