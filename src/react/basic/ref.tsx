/**
 * Created by KongSa on 2022/8/12-10:58 PM.
 */

import React from "react";

class ClassComponent extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}
	//进行初始化
	tick() {
		//这种方法被弃用 推荐第三种方法
		console.log(this.refs.input1);
	}
	input2: null | HTMLInputElement = null;
	myRef = React.createRef<HTMLInputElement>();
	render() {
		return (
			<>
				<input type='text' ref={"input1"} />
				<input
					type='text'
					ref={(e) => {
						this.input2 = e;
					}}
				/>
				<input type='text' ref={this.myRef} />
			</>
		);
	}
}

function RefComponent() {
	const ref1 = React.useRef<null | string>(null);
	const log = () => {
		console.log(ref1.current);
		ref1.current = "string111";
		console.log(ref1.current);
	};
	return (
		<div>
			<button onClick={log}>log</button>
		</div>
	);
}

export { RefComponent };
