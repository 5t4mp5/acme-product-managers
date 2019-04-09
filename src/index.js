import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from "react-router-dom"
import Main from "./components/Main";
import { Provider } from "react-redux";
import store from "./store";
 
const root = document.querySelector('#root');
ReactDOM.render(<Provider store={store}><HashRouter><Route component={Main} /></HashRouter></Provider>, root);


