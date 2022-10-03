/**
 * Created by KongSa on 2022/9/13-7:30 PM.
 */
/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * l1 l2 类型都是ListNode
 * 这个题 说是倒叙的 其实我们相加就是倒叙的呀 123 123 先算3+3 直接按着顺序来就好了
 */
//hack的做法 以为他是传进来一个数组 没想到是没有数组的方法的
var addTwoNumbersHack = function (l1, l2) {
  const str1 = Number(l1.reverse().join(""));
  const str2 = Number(l2.reverse().join(""));
  return (str1 + str2)
    .toString()
    .split("")
    .map((num, index, arr) => {
      return (arr[index] = Number(num));
    });
};
console.log(addTwoNumbersHack([1, 2, 3], [1, 2, 3]));
var addTwoNumbers = function (l1, l2) {
  const preHead = new ListNode();
  let cur = preHead;
  let carry = 0;
  while (l1 || l2) {
    const r1 = l1 ? l1.val : 0;
    const r2 = l2 ? l2.val : 0;
    const sum = r1 + r2 + carry;
    cur.next = new ListNode(sum % 10);
    cur = cur.next;
    carry = Math.floor(sum / 10);
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    cur.next = new ListNode(carry);
  }
  return preHead.next;
};
//递归 注意运算符号的顺序 不如存在变量里面 或者给他包起来
//确定递归的出口 l1 l2 都是空的 这时候最后一位可能存在进位 所以等待最后一位的进位是0的时候 就是递归的出口
function dfs(num1, num2, carry) {
  if (!num1 && !num2 && carry === 0) {
    return null;
  }
  const r1 = num1 ? num1.val : 0;
  const r2 = num2 ? num2.val : 0;
  let newCarry = Math.floor((r1 + r2 + carry) / 10);
  let head = new ListNode((r1 + r2 + carry) % 10);
  head.next = dfs(num1 ? num1.next : null, num2 ? num2.next : null, newCarry);
  return head;
}
let addTwoNumbersRetry = function (l1, l2) {
  let pre = new ListNode(0);
  //新建一个节点 不能修改原来的 next一直往下指 那你最后可能只是一个空值或者是null
  let node = pre;
  let carry = 0;
  while (l1 !== null || l2 !== null) {
    let num1 = l1 === null ? 0 : l1.val;
    let num2 = l2 === null ? 0 : l2.val;
    let sum = num1 + num2 + carry;
    let num = sum % 10;

    carry = Math.floor(sum / 10);
    node.next = new ListNode(num);

    node = node.next;
    if (l1 !== null) {
      l1 = l1.next;
    }
    if (l2 !== null) {
      l2 = l2.next;
    }
  }

  if (carry === 1) {
    node.next = new ListNode(1);
    node = node.next;
  }
  return pre.next;
};
