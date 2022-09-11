/**
 * Created by KongSa on 2022/9/10-1:49 PM.
 */
/**
 * 限制promise的并发数 总数组 最大值 执行函数
 * @param allPromise
 * @param max
 * @param iteratorFn
 */
async function ctrlPromise(
  allPromise: any[],
  max: number,
  iteratorFn: (item: any) => void
) {
  let ret = [];
  let excuting: any[] = [];
  for (const item of allPromise) {
    const pItem = Promise.resolve().then(() => iteratorFn(item));
    ret.push(pItem);
    //每当一个完成的时候 就从数组中清除掉
    const e = pItem.then(() => {
      excuting.splice(excuting.indexOf(e), 1);
    });
    excuting.push(e);
    //超过最大限制 等待地最快的那个完事 上面会继续push进去一个 然后再等待
    if (excuting.length >= max) {
      await Promise.race(excuting);
    }
  }
  //返回成功的数组
  return Promise.all(ret);
}
const timeout = (i: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(i);
    }, i)
  ).then((i) => {
    console.log(i, "结束");
    return i;
  });
};

(async () => {
  const res = await ctrlPromise([1000, 1000, 1000, 2000], 2, timeout);
  console.log(res);
})();
function ctrlPromise1(allPromise: any[], max: number) {
  let totalArr = [...allPromise];
  let count = 0;
  for (let i = 0; i < max; i++) {
    run();
  }
  function run() {
    return new Promise((resolve, reject) => {
      resolve(allPromise[count]);
    }).then(() => {
      if (count < totalArr.length) {
        run();
      }
    });
  }
}
export { ctrlPromise };
