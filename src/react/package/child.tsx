/**
 * Created by KongSa on 2022/9/27-12:56 PM.
 */

import React from "react";
import style from "./css/child.module.css";
import axios from "axios";
function Child() {
  // axios
  //   .get("/api/home")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return (
    <div>
      <ul>
        <li className={style.item}></li>
        <li className={style.item}></li>
        <li className={style.item}></li>
      </ul>
    </div>
  );
}
export { Child };
