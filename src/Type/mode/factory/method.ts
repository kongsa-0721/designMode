/**
 * Created by kongsa on 2022/4/2-5:15 PM.
 */
function createElement(type: any, config: any) {
	return { type, props: config };
}
function Factory(type: string) {
	const factory = createElement.bind(null, type);
	return factory;
}
export const factory1 = Factory("h1");
