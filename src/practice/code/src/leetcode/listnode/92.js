/**
 * Created by KongSa on 2022/10/2-7:05 PM.
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
let reverseBetween = function (head, left, right) {
	//新建一个dummy 如果从第一个开始就反转 就需要dummy dummy就是 0 1 2 3 4 5
	let dummy = new ListNode(0, head);
	//这个pre永远指向l_node pre.next = l_node **
	let pre = dummy;
	let l_node = head;
	let r_node = head;
	// l r 都移到要转换的位置去 2 4 走了 l-1 / r-1 步   假如 left=2 head从1到2 只需要一步
	// pre 也移动 保存好l的下一个节点 方便m后移
	for (let i = 1; i < left; i++) {
		pre = pre.next;
		l_node = l_node.next;
	}
	for (let i = 1; i < right; i++) {
		r_node = r_node.next;
	}
	//终止的条件就应该是他俩相等
	while (l_node != r_node) {
		pre.next = l_node.next;
		l_node.next = r_node.next;
		r_node.next = l_node;
		l_node = pre.next;
	}
	return dummy.next;
};
