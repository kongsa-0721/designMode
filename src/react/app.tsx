/**
 * Created by KongSa on 2022/8/13-6:47 PM.
 */

import React from "react";
import Combine from "./redux/combine";
import { Protal } from "./basic/protal";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { BasicAhooks } from "./ahooks/basic";

function App() {
	return (
		<Provider store={store}>
			this is app component
			<Combine />
			<Protal />
			<BasicAhooks />
		</Provider>
	);
}

export default App;
