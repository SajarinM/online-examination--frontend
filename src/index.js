import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "react-widgets/dist/css/react-widgets.css";
import "./assets/scss/main.scss";
import "./index.scss";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// import {ExpForm, ExpForm2} from "./components/ExpForm";
// ReactDOM.render(<div>
// 	<ExpForm />
// 	<ExpForm />
// </div>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
