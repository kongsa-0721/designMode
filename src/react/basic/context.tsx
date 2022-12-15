/**
 * Created by KongSa on 2022/8/13-9:09 PM.
 */
import React from "react";
//创建一个上下文 每一个consumer都必须在这个provider里面 才可以消费这个provider
const Context1 = React.createContext({});

class ContextComponent extends React.Component<any, any> {
	state = { name: "kongsa" };
	handleChange = () => {
		this.setState({ name: this.state.name + "!" });
	};
	render() {
		return (
			<Context1.Provider value={{ name: this.state.name }}>
				{this.props.children}
				<button onClick={this.handleChange}>点击</button>
			</Context1.Provider>
		);
	}
}

class Item1 extends React.Component<any, any> {
	render() {
		return (
			<Context1.Consumer>
				{(value: any) => {
					console.log(value);
					return <>{value.name}</>;
				}}
			</Context1.Consumer>
		);
	}
}

class Item2 extends React.Component<any, any> {
	render() {
		return (
			<Context1.Consumer>
				{(value: any) => {
					console.log(value);
					return <>{value.name}</>;
				}}
			</Context1.Consumer>
		);
	}
}

// <ContextComponent>
//   <Item1 />
//   <Item2 />
// </ContextComponent>;

export { ContextComponent, Item1, Item2 };
