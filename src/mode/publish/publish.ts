/**
 * Created by KongSa on 2022/8/13-8:56 PM.
 */
const bus: {
  callbackStack: Array<any>;
  subscribe: (e: () => void) => void;
  publish: () => void;
} = {
  callbackStack: [],
  subscribe(callback: () => void) {
    this.callbackStack.push(callback);
  },
  publish() {
    this.callbackStack.forEach((item) => {
      item && item();
    });
  },
};
bus.subscribe(() => {
  console.log("name");
});
bus.subscribe(() => {
  console.log("age");
});
bus.publish();
