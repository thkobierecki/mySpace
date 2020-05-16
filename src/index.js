import React from "react";
import ReactDOM from "react-dom";

import Root from "./vievs/Root";
import * as serviceWorker from "./serviceWorker";
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
