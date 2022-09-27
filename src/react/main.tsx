import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./app";
import App from "./packageApp";

//注意 最后有一个 ！断言这个不是null
let Root = document.getElementById("root")!;

ReactDOM.createRoot(Root).render(<App />);
