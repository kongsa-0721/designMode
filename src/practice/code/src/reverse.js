/**
 * Created by KongSa on 2022/9/6-1:43 PM.
 */
function isReverse(str) {
  let left = 0,
    right = str.length - 1;
  while (left <= right) {
    if (str[left] === str[right]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
console.log(isReverse("qwq"));
/**
 * 1.实例由构造函数构造出来
 * __proto__就是实例的原型 prototype是构造函数的原型对象 构造函数从这里继承一些方法
 * constructor 构造函数原型的构造器指向构造函数
 * 2.BFC 块级格式化上下文
 * 内部的元素 影响不到外部的元素 可以解决浮动元素造成高度塌陷的问题 实现灵活的自适应布局
 * display 设置为inline-block table-cell
 * overflow 属性不为visible, float 熟悉不为none
 * 根元素 position 属性不为relative static
 * 3.this指向
 * 箭头函数 保存this指向 call apply bind new一个实例
 * 4.垂直水平居中
 * position absolute
 * flex
 * 父元素设置为relative 子元素absolute 上下左右都设置为0 margin:auto;
 * 5.清除浮动
 * 设置overflow:hidden
 * 父元素 底部添加一个空元素 clear:both
 * 伪元素 clear:both
 * 6.两栏布局
 * 父元素 flex 左元素 flex:0 0 200px; 右元素 flex:1;
 */
