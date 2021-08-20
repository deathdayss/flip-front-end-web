/**
 * @author Zhicheng Wang
 * @create date 2021-07-23 20:35:11
 * @modify date 2021-08-20 17:13:36
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css';
import 'antd/dist/antd.css'                       //IMPORT ANTD     CSS LIBRARY
import 'ant-design-pro/dist/ant-design-pro.css'   //IMPORT ANTD-PRO CSS LIBRARY

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
