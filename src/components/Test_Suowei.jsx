/**
 * @author Suowei Hu
 * @email suowei.h@gmail.com
 * @create date 2021-08-20 16:37:41
 * @modify date 2021-08-20 16:37:41
 * @desc [description]
 */
/**
 * @author Zhicheng Wang, Suowei Hu
 * @create date 2021-07-23 20:33:55
 * @modify date 2021-08-13 11:58:17
 */

/* eslint-disable */

import React, { Component } from 'react';
import { Redirect, Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from 'antd';

import LoginForm from "./login_components/LoginForm";
import SignUpForm from "./signup_components/SignUpForm"
import DragUpload from "./upload_components/DragUpload"
import UserHeader from './user/UserHeader';
import UserContent from './user/UserContent';
import Header from './header_components/Header.jsx'
import UploadForm from './upload_components/UploadForm';



const Test_Suowei = () => {
    return (
        // <LoginForm/>
        // <SignUpForm/>
        // <Header />
        // <DragUpload />
        <UploadForm/>
    );
}

export default Test_Suowei;
