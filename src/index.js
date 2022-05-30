import React from 'react';
import ReactDOM from 'react-dom/client';
//引入这个Router
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

//使用这个方法去拿到真实dom的节点, 再使用render将真实dom和virtual dom进行对接
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //使用BrowserRouter给它包裹一下
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
