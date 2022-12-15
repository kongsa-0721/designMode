/**
 * Created by KongSa on 2022/10/5-4:34 PM.
 */
class TreeNode {
	constructor(value) {
		this.val = value;
		this.left = null;
		this.right = null;
	}

	insert(values) {
		const queue = [this];
		let i = 0;
		while (queue.length > 0) {
			let current = queue.shift();
			for (let side of ["left", "right"]) {
				if (!current[side]) {
					if (values[i] !== null) {
						current[side] = new TreeNode(values[i]);
					}
					i++;
					if (i >= values.length) return this;
				}
				if (current[side]) queue.push(current[side]);
			}
		}
		return this;
	}
}

// const tree = new TreeNode(15);
// tree.insert([1, 2, 3, 4, 3, 8, 7, 5, 10, 12, 11, null, null, null]);

export default TreeNode;
