/**
 * Created by KongSa on 2022/9/27-1:00 PM.
 */
import React from "react";
import { Child } from "./package/child";
import { booleanComp } from "./class/class";
import { CommonEffect, CommonLayoutEffect } from "./basic/effect";

function App() {
	const b = new booleanComp("name");
	const InputOnChange = (e: any) => {
		b.dispatchAction(e.target.value);
	};
	return (
		<>
			<CommonEffect />
			<CommonLayoutEffect />
			{/*{b.value}*/}
			{/*<Child />*/}
			{/*<input type="text" value={b.value} onChange={InputOnChange} />*/}
		</>
	);
}

export default App;
