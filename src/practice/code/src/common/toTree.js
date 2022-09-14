/**
 * Created by KongSa on 2022/9/4-5:17 PM.
 * 实现对象数组转化为树状结构
 */
let data = [
  { id: 1, name: "办公管理", pid: 0 },
  { id: 2, name: "请假申请", pid: 1 },
  { id: 3, name: "出差申请", pid: 1 },
  { id: 4, name: "请假记录", pid: 2 },
  { id: 5, name: "系统设置", pid: 0 },
  { id: 6, name: "权限管理", pid: 5 },
  { id: 7, name: "用户角色", pid: 6 },
  { id: 8, name: "菜单设置", pid: 6 },
];
let data1 = [
  {
    id: 1,
    name: "办公管理",
    pid: 0,
    children: [
      {
        id: 2,
        name: "请假申请",
        pid: 1,
        children: [{ id: 4, name: "请假记录", pid: 2 }],
      },
      { id: 3, name: "出差申请", pid: 1 },
    ],
  },
  {
    id: 5,
    name: "系统设置",
    pid: 0,
    children: [
      {
        id: 6,
        name: "权限管理",
        pid: 5,
        children: [
          { id: 7, name: "用户角色", pid: 6 },
          { id: 8, name: "菜单设置", pid: 6 },
        ],
      },
    ],
  },
];
//Array[Object] => Tree
function toTree(arr) {
  let result = [];
  let map = new Map();
  arr.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });
  //在0里面的2的children 与 2里面的children 指向同一个内存地址了
  map.forEach((item) => {
    if (map.has(item.pid)) {
      const parentNode = map.get(item.pid);
      parentNode.children.push(item);
    } else {
      result.push(map.get(item.id));
    }
  });
  return result;
}
const res1 = JSON.stringify(toTree(data));
console.log(res1);
//Tree => Array[Object]
let result = [];
function toArray(arr) {
  arr.forEach((item) => {
    result.push(item);
    if (item["children"]) {
      toArray(item["children"]);
      delete item["children"];
    }
  });
  return result;
}
const res2 = JSON.stringify(toArray(toTree(data)));
console.log(res2);
//比较简便的转化为树
function toTree(origin) {
  let data = JSON.parse(JSON.stringify(origin));
  return data.filter((id0) => {
    //找出每一个pid对应的那个父元素
    const _arr = data.filter((e) => e.pid === id0.id);
    //把每一个父元素的所有儿子都加到父元素的children属性里面
    _arr.length && (id0.children = _arr);
    return id0.pid === 0;
  });
}
