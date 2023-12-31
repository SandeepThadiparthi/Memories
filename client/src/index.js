import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import { legacy_createStore as createStore, compose,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {reducers} from "./reducers";
import "../src/index.css"

const store = createStore(reducers,compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
<Provider store={store}>
    <App />
</Provider> )
