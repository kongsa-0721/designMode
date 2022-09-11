/**
 * Created by KongSa on 2022/9/11-1:38 PM.
 */
//手写axios
const axios = (() => {
  const xhr = new XMLHttpRequest();
  function get(url) {
    return new Promise((resolve, reject) => {
      xhr.open("GET", url, true);
      xhr.onload = function () {
        console.log("进入这个函数");
        console.log(this);
        if (this.status === 200) {
          resolve({ response: this.response });
        } else {
          console.log("进入错误");
          reject({ response: this.response, status: this.status });
        }
      };
      xhr.send();
    });
  }
  return { get };
})();
axios
  .get("http://localhost:5000")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
