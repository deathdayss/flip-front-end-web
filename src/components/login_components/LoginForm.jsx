/* eslint-disable */

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './LoginForm.scss'
import $ from 'jquery'
import { message } from 'antd';
import { useHistory } from 'react-router-dom'
import request from 'umi-request';

const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, }, };
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 8, }, }, wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, }, };

const DOMAIN = "http://106.52.167.166:8084" 
const API_LOGIN = `${DOMAIN}/v1/user/login`

const LoginForm = (props) => {

    let history = useHistory();
    const fail_forward = false;
    const [val_email, set_ValEmail] = useState("");
    const [val_passw, set_ValPassw] = useState("");
    const handle_emailChange = (e) => { set_ValEmail(e.target.value); }
    const handle_passwChange = (e) => { set_ValPassw(e.target.value); }
    const handle_loginRequest = (history) => {
        // console.log("Attempting to login via: " + val_email + " " + val_passw);
        const loginPormise = getLoginService({email: val_email, password: val_passw});
        console.log(loginPormise);
        loginPormise.then(
            function(value){
                // console.log('Login success');
                message.info('Login Successful', 2.0);
                setTimeout(function(){history.push('/');message.info('Welcome '+val_email + ' !', 2.0);}, 2000);
            },
            function(value){
                // console.log('Login failture');
                message.warn('Either your <email> or <password> is incorrect', 2.0);
            }
        )
    }
    const getLoginService = (params) => {
        return request(`${API_LOGIN}`, {
            method: "post",
            data: params,
            requestType: "form"
        });
    }

    // DEPRECATED 
    // (handle login request using the ajax method)
    //
    // const handle_loginRequest = (history) => {
    //     const url = "http://192.168.1.9:5000/login";
    //     // const url = "http://106.52.167.166:8084/v1/user/login";
    //     console.log("HTTP request made towards: " + url);
    //     // 第一个参数是提交的地址
    //     try {
    //         $.post(url,
    //             {
    //                 email: val_email,
    //                 password: val_passw
    //             },
    //             function (data, status) {
    //                 console.log("DATA  " + data);
    //                 console.log("STATUS" + status);
    //                 // var dataObj = eval("(" + data + ")");//转换为json对象 
    //                 var dataObj = data;
    //                 if (dataObj.status === 200) {
    //                     console.log("LOGIN SUCCESS")
    //                     message.info('Successfully Login', 2.0);
    //                     setTimeout(function(){history.push('/');message.info('Welcome '+dataObj.nickname + ' !', 2.0);}, 2000)
    //                     // history.push('/');
    //                     return;
    //                 } else {
    //                     console.log("LOGIN FAILURE")
    //                     alert(dataObj.msg)
    //                     message.warn('Either your <email> or <password> is incorrect', 0.6);
    //                     return;
    //                 }
    //             }
    //         ).fail(
    //             function () {
    //                 message.warn('Incorrect username or password ', 0.6); 
    //                 if (fail_forward) { history.push('/') }
    //             }
    //         );
    //     } catch (e) {
    //         message.warn('Connection to server is a failure', 0.6);
    //     }
    // }



    // ====================================================================================================
    // ====================================================================================================
    return (
        <div className="LoginForm-container">
            <h3 className="LoginForm-Title"> Flip, {"<SLOGAN>"} </h3>
            <br />
            <Form
                {...formItemLayout}
                name="normal_login"
                className="Flip_LoginForm"
                initialValues={{ remember: true }}
                onFinish={() => handle_loginRequest(history)}
                scrollToFirstError
            >
                <Form.Item
                    className="Flip_LoginForm_Item"
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input value={val_email} onChange={handle_emailChange} />
                </Form.Item>

                <Form.Item
                    className="Flip_LoginForm_Item"
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password value={val_passw} onChange={handle_passwChange} />
                </Form.Item>

                <Form.Item className="login-button-container" {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
    // ====================================================================================================
    // ====================================================================================================
};

export default LoginForm;
