//set get 属性
const config = {
	age: 18,
	set ages(age) {
		if (age > 18) {
			console.log("is younger");
		} else {
			console.log("is old");
		}
	},
	get ages() {
		console.log("don't ask me");
		return this.age;
	},
};
export {};
