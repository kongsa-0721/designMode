/**
 * Created by KongSa on 2022/8/15-9:37 PM.
 */
import React from "react";

const GlobalContext = React.createContext({});

function HooksPlay() {
	const [name, setName] = React.useState("kongsa");
	React.useEffect(() => {
		console.log("依赖空数组，只执行一次，相当于ComponentDidMount");
	}, []);
	React.useEffect(() => {
		console.log(name, "name改变,函数执行");
	}, [name]);
	React.useEffect(() => {
		const timer = setTimeout(() => {
			console.log("timer");
		});
		return () => {
			console.log("依赖的是空数组，在组件销毁的时候执行");
			clearTimeout(timer);
		};
	}, []);
	const callfn = React.useCallback(() => {
		console.log("callfn被缓存下来 每一次渲染不会申请新的内存");
		console.log("依赖的数组里的内容改变，会更新");
	}, []);
	const num = React.useMemo(() => {
		console.log("根据依赖的数组来改变返回值");
		return 1 + 1;
	}, []);
	return <></>;
}

function HookContext() {
	//这个value就是Context的内容
	const value = React.useContext(GlobalContext);
	console.log(value);
	return <></>;
}

interface stateProps {
	num: number;
	name: string;
}
interface actionProps {
	type: "minus" | "add";
}
function reducerFn(preState: stateProps, action: actionProps) {
	console.log(preState, action);
	const newState = { ...preState };
	switch (action.type) {
		case "add":
			newState.num++;
			return newState;
		case "minus":
			newState.num--;
			return newState;
		default:
			return preState;
	}
}

const initialState = {
	num: 0,
	name: "kongsa",
};

function HookReducer() {
	const [state, dispatch] = React.useReducer(reducerFn, initialState);
	return (
		<>
			{state.name}
			<button
				onClick={() => {
					dispatch({
						type: "add",
					});
				}}
			>
				+
			</button>
			{state.num}
			<button
				onClick={() => {
					dispatch({
						type: "minus",
					});
				}}
			>
				-
			</button>
		</>
	);
}

export { HooksPlay, HookReducer };
