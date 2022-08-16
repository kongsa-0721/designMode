/**
 * Created by KongSa on 2022/8/13-6:47 PM.
 */

import React from "react";
import { HookReducer } from "./basic/hooks";
import { Conbiner, DisplayContext } from "./basic/conbiner";

function App() {
  return (
    <>
      this is app component
      <HookReducer></HookReducer>
      <Conbiner>
        <DisplayContext></DisplayContext>
      </Conbiner>
    </>
  );
}

export default App;
