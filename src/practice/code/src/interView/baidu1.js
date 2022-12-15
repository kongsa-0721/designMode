/**
 * Created by KongSa on 2022/9/21-8:16 PM.
 * 水贴王 n 帖子的浏览用户种类 ai 用户的类型 就四个数 一共输入5个数
 * 1水贴王 见到就回复
 * 2点赞王 见到就点赞
 * 3跟风王 哪个多就干哪个 一样多就都干
 * 4潜水王 啥都不干
 */
function resolve(n, ...rest) {
	let dianZan = 0;
	let reply = 0;
	for (let i = 0; i < rest.length; i++) {
		if (rest[i] === 1) {
			reply++;
		}
		if (rest[i] === 2) {
			dianZan++;
		}
		if (rest[i] === 3) {
			if (reply > dianZan) {
				reply++;
			} else if (dianZan > reply) {
				dianZan++;
			} else {
				dianZan++;
				reply++;
			}
		}
		if (rest[i] === 4) {
			continue;
		}
	}
	return [(dianZan * n) / 4, (reply * n) / 4];
}
console.log(resolve(4, 1, 2, 3, 4));
