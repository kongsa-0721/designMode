/**
 * Created by KongSa on 2022/10/3-9:05 PM.
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
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
var swapPairs = function (head) {
	//corner case 递归的出口
	if (head === null || head.next === null) {
		return head;
	}
	//创建一个新的dummy next指向第二个节点 head就是第一个节点
	let dummy = new ListNode(0);
	let next = head.next;
	let pre = dummy;
	//转换的过程  0 2 1 3
	pre.next = next;
	head.next = next.next;
	next.next = head;
	//进行递归 head的下一个节点已经指向3了 从3开始在进行递归 在corner case出去
	head.next = swapPairs(head.next);
	//新链表的下一个就是要返回的
	return dummy.next;
};
