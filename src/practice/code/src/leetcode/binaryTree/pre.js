/**
 * Created by KongSa on 2022/10/5-4:43 PM.
 */
import TreeNode from "./common.js";
const tree = new TreeNode(15);
tree.insert([1, 2, 3, 4, 3, 8, 7, 5, 10, 12, 11, null, null, null]);

//前序遍历
let Traversal = function (root) {
	return backTrack(root, []);
};
function backTrack(root, res) {
	if (!root) return root;
	res.push(root.val);
	backTrack(root.left, res);
	//中序
	backTrack(root.right, res);
	//后序
	return res;
}
let arr = Traversal(tree).sort((a, b) => a - b);

//练一下迭代 递归转迭代需要一个stack数组
/**
 * 根左右
 * 左根右
 * 左右根
 * 迭代使用的是栈 所以顺序是反过来的
 * @param root
 */
let preorderTraversal = function (root) {
	let res = [];
	if (!root) return res;
	let stack = [root];
	while (stack.length) {
		//更通用的写法是放一个标识位置 null 根据这个null来判断
		let node = stack.pop();
		res.push(node.val);
		node.right && stack.push(node.right);
		node.left && stack.push(node.left);
	}
	return res;
};
