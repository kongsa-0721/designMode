/**
 * Created by KongSa on 2022/9/21-8:05 PM.
 * 去哪旅行笔试 把阿拉伯数字转化为大写
 */
function convert(num) {
  num = num.slice(0, num.length - 1) + "";
  if (num == 0) {
    return "零圆整";
  }
  for (let i = num.length - 1; i >= 0; i--) {
    num = num.replace(",", "");
    num = num.replace(" ", "");
  }
  if (isNaN(num)) {
    return;
  }
  let part = String(num).split(".");
  let newchar = "";
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return "";
    }
    let tmpnewchar = "";
    let perchar = part[0].charAt(i);
    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;
        break;
      case "1":
        tmpnewchar = "壹" + tmpnewchar;
        break;
      case "2":
        tmpnewchar = "贰" + tmpnewchar;
        break;
      case "3":
        tmpnewchar = "叁" + tmpnewchar;
        break;
      case "4":
        tmpnewchar = "肆" + tmpnewchar;
        break;
      case "5":
        tmpnewchar = "伍" + tmpnewchar;
        break;
      case "6":
        tmpnewchar = "陆" + tmpnewchar;
        break;
      case "7":
        tmpnewchar = "柒" + tmpnewchar;
        break;
      case "8":
        tmpnewchar = "捌" + tmpnewchar;
        break;
      case "9":
        tmpnewchar = "玖" + tmpnewchar;
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar;
        break;
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 4:
        tmpnewchar = tmpnewchar + "万";
        break;
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
        break;
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
        break;
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
        break;
      case 8:
        tmpnewchar = tmpnewchar + "亿";
        break;
      case 9:
        tmpnewchar = tmpnewchar + "拾";
        break;
    }
    newchar = tmpnewchar + newchar;
  }
  while (
    newchar.search("零零") != -1 ||
    newchar.search("零亿") != -1 ||
    newchar.search("亿万") != -1 ||
    newchar.search("零万") != -1
  ) {
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零零", "零");
  }
  if (newchar.indexOf("一十") == 0) {
    newchar = newchar.substr(1);
  }
  if (newchar.lastIndexOf("零") == newchar.length - 1) {
    newchar = newchar.substr(0, newchar.length - 1);
  }
  return newchar + "圆";
}
function transform(text) {
  // write code here
  const reg = /(\d+)(元)/g;
  const res = text.replace(reg, convert);
  return res;
}
console.log(
  transform(
    "本次采购的商品有110件”，采购的价格为0元的10件属于赠送商品，采购价格为9999元的100件是实际购买商品，本次采购总价为999900元。"
  )
);
