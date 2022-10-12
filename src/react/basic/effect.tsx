/**
 * Created by KongSa on 2022/10/11-6:52 PM.
 */

import { useEffect, useLayoutEffect, useState } from "react";
import * as React from "react";

const CommonEffect = () => {
  const [num, setNum] = useState(1);
  useEffect(() => {
    console.log("this is effect");
    setNum(2);
  });
  useLayoutEffect(() => {
    console.log("this is layout effect");
  });
  return <>{num}</>;
};
const CommonLayoutEffect = () => {
  const [num, setNum] = useState(1);
  useLayoutEffect(() => {
    setNum(2);
  });
  return <>{num}</>;
};

export { CommonEffect, CommonLayoutEffect };
