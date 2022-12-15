import * as ahooks from "ahooks";
import axios from "axios";
import React from "react";

const BasicAhooks = () => {
	const [info, setInfo] = ahooks.useSetState({
		name: "kongsa",
		age: 12,
	});
	// {}里面的属性都是由ahooks里面的接口定义好的
	const [real, { toggle, setTrue, setFalse, set }] = ahooks.useBoolean(false);
	function getRes() {
		return axios
			.get("/api/api/listDatasources")
			.then((res) => {
				console.log(res);
				return res;
			})
			.catch((e) => {
				console.log(e);
			});
	}
	const { data, error, loading, run } = ahooks.useRequest(getRes, {
		manual: true,
		loadingDelay: 300,
		onFinally: () => {
			console.log("this request in finally");
		},
	});
	return (
		<div>
			<button onClick={run}>get请求</button>
			{data?.data.msg}
			{loading ? "loading....." : "loading 完毕"}
			{error ? "error" : "no error"}
		</div>
	);
};
export { BasicAhooks };
