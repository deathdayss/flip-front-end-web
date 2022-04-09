/* eslint-disable */

import { Input, Button, message } from 'antd';
import './LoginForm.scss';
import { useHistory } from 'react-router-dom'
import request from 'umi-request';
import React, { useState, useEffect } from 'react';


const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, }, };
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 8, }, }, wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, }, };

const DOMAIN = "http://175.178.159.131:8084";
const API_LOGIN = `${DOMAIN}/v1/user/login`;
const API_VERIFICATION_CODE = `${DOMAIN}/v1/verification/code`;

const LoginForm = (props) => {

    const [val_veriCodeResponse, set_ValVeriCodeResponse] = useState("");
    const [val_veriImageURL, set_ValVeriImageURL] = useState("");
    const [val_veriFailWarning, set_ValVeriFailWarning] = useState("");
    const [val_borderWidth, set_ValBorderWidth] = useState("0");


    const handle_loginRequest = (act, pwd, veri) => {
        set_ValVeriFailWarning("");
        set_ValBorderWidth("0");
        if (veri.toUpperCase() === val_veriCodeResponse.toUpperCase()) {
            console.log('Verification success!');
            const loginPromise = getLoginService({ email: act, password: pwd });
            loginPromise.then(
                function (value) {
                    message.info('Login Successful', 2.0);
                    localStorage.setItem('user', JSON.stringify({
                        email: act,
                        password: pwd
                    }));
                    props.set_IsLoggedIn(true);
                    props.closeLogin();
                    // setTimeout(function(){history.push('/');message.info('Welcome '+val_email + ' !', 2.0);}, 2000);
                },
                function (value) {
                    // console.log('Login failture');
                    message.warn('Either your <email> or <password> is incorrect', 2.0);
                }
            )
        }
        else {
            message.warn('Verification Failed!', 2.0);
            set_ValVeriFailWarning("Verification Failed");
            set_ValBorderWidth("1");
        }
    }

    const handle_logoutRequest = () => {
        localStorage.removeItem('user');
        set_IsLoggedIn(false);
    }
    const getLoginService = (params) => {
        return request(`${API_LOGIN}`, {
            method: "post",
            data: params,
            requestType: "form"
        });
    }

    const handle_getVerificationCode = () => {
        const verificationPromise = requestVerificationCode({ getCode: 123 });
        verificationPromise.then(
            function (value) {
                console.log('Request veri code success');
                // console.log(JSON.stringify(value));
                set_ValVeriCodeResponse(value.Content);
                set_ValVeriImageURL(value.URL);
            },
            function (value) {
                console.log('Request veri code failture');
                message.warn('No CAPTCHA response', 2.0);
            }
        )

    }
    const requestVerificationCode = (params) => {
        return request(`${API_VERIFICATION_CODE}`, {
            method: "get",
            params: params,
            requestType: "json"
        });
    }
    useEffect(handle_getVerificationCode, []);
    return (
        <div className="login-mask">
            <div className="login-window">
                <div className="login-header">
                    <div className="btn-close" style={{ padding: '30px', float: 'left', cursor: 'pointer'}} onClick={props.closeLogin} ></div>
                    <img src="images/header/logo.svg" width="60px" style={{ float: 'right', padding: '20px' }}></img>
                </div>
                <div className="login-form-area">

                    <h3> Log in for Flip </h3>
                    <p>Manage your profile, check notifications, comment and share games, and more</p>

                    <div className="login-form-area-center">
                        Enter email  <Input id="mainMenuLogin_name" type="email" /> <br />
                        Enter password <Input id="mainMenuLogin_pass" type="password" /> <br />
                        Verification Code <div className="veri-code-area" style={{ border: `${val_borderWidth}px solid red` }}><Input id="mainMenuLogin_veri" type="text" />
                            <img style={{ marginTop: '10px' }} src={val_veriImageURL} height='50px' width='100px' /></div>
                        <p className="veri-failed-warning">{val_veriFailWarning}</p>
                    </div>

                    <input type="checkbox" id="mainMenuLogin_keepLoggedIn" />
                    <label>Keep me log in</label><br />
                    <Button style={{marginTop: "10px", backgroundColor:'#5B28FF', color: '#FFF', width: '120px',borderRadius:'10px'}} onClick={
                        () => {

                            const account = document.getElementById("mainMenuLogin_name");
                            const passwrd = document.getElementById("mainMenuLogin_pass");
                            const veriCode = document.getElementById("mainMenuLogin_veri");

                            handle_loginRequest(account.value, passwrd.value, veriCode.value);
                        }
                    }> Log in </Button>
                </div>
                <div className="login-footer">
                    <p>Don't have an account?</p>
                    <div onClick={props.switchToSignup} style={{ color: "red" }}>Sign up</div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
