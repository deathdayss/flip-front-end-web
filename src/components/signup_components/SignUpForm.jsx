/* eslint-disable */

import './SignUpForm.scss'

import React, { useState, useEffect } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { message } from 'antd';
import $ from 'jquery'
import { useHistory } from 'react-router-dom'
import request from 'umi-request';



const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 8, }, }, wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, }, };
const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, }, };
const DOMAIN = "http://106.52.167.166:8084";
const API_SINGUP = `${DOMAIN}/v1/user/register`;
const API_VERIFICATION_CODE = "http://rinato.ticp.vip/v1/verification/code";

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    let history = useHistory();
    const fail_forward = false;
    const [val_email, set_ValEmail] = useState("");
    const [val_nickn, set_ValNickn] = useState("");
    const [val_passw, set_ValPassw] = useState("");
    const [val_p_ver, set_ValPVeri] = useState("");
    const [val_veri, set_ValVeri] = useState("");
    const [val_veriCodeResponse, set_ValVeriCodeResponse] = useState("");
    const [val_veriImageURL, set_ValVeriImageURL] = useState("");
    const [val_veriFailWarning, set_ValVeriFailWarning] = useState("");
    const [val_borderWidth, set_ValBorderWidth] = useState("0");
    const handle_emailChange = (e) => { console.log("set_ValEmail: " + val_email); set_ValEmail(e.target.value); }
    const handle_nickNChange = (e) => { console.log("set_ValNickn: " + val_nickn); set_ValNickn(e.target.value); }
    const handle_passwChange = (e) => { console.log("set_ValPassw: " + val_passw); set_ValPassw(e.target.value); }
    const handle_p_verChange = (e) => { console.log("set_ValPVeri: " + val_p_ver); set_ValPVeri(e.target.value); }
    const handle_veriChange = (e) => { console.log("set_Veri: " + val_veri); set_ValVeri(e.target.value); }


    const handle_signupRequest = (history) => {
        set_ValVeriFailWarning("");
        set_ValBorderWidth("0");
        if (val_veri.toUpperCase() === val_veriCodeResponse.toUpperCase()) {
            // console.log("Attempting to signup via: " + email + " " + nickname + " " + password);
            const signupPormise = getSignupSerive({ email: val_email, nickname: val_nickn, password: val_passw });
            signupPormise.then(
                function (value) {
                    console.log('Singup success');
                    message.info('Signup Successful', 2.0);
                    setTimeout(function () { history.push('/'); message.info('Welcome ' + val_email + ' !', 2.0); }, 2000);
                },
                function (value) {
                    console.log('Signup failture');
                    message.warn('The email you used is already registered', 2.0);
                }
            )
        }
        else {
            message.warn('Verification Failed!', 2.0);
            set_ValBorderWidth("1");
            set_ValVeriFailWarning("Verification Failed");
        }
    }

    const getSignupSerive = (params) => {
        return request(`${API_SINGUP}`, {
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
                // console.log('Request veri code failture');
                // message.warn('Something wrong just happened', 2.0);
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
    // DEPRECATED 
    // (handle login request using the ajax method)
    //
    // const handle_signupRequest = (history) => {
    //     const url = "http://192.168.1.9:5000/signup";
    //     // const url = "http://106.52.167.166:8084/v1/user/register"
    //     console.log("HTTP request made towards: " + url);
    //     try {
    //         $.post(url,
    //             {
    //                 email: val_email,
    //                 password: val_passw,
    //                 nickname: val_nickn
    //             },
    //             function (data, status) {
    //                 console.log(data);
    //                 // var dataObj = eval("(" + data + ")");//转换为json对象 
    //                 var dataObj = data;
    //                 if (dataObj.status === 200) {
    //                     console.log("LOGIN SUCCESS")
    //                     message.info('Successfully Signup', 2.0);
    //                     setTimeout(function () { history.push('/'); }, 2000)
    //                     return;
    //                 } else {
    //                     console.log("LOGIN FAILURE")
    //                     // alert(dataObj.msg)
    //                     return;
    //                 }
    //             }
    //         ).fail(function () { message.warn('Incorrect registration form data', 0.6); if (fail_forward) { history.push('/'); } });
    //     } catch (e) {
    //         message.warn('Connection to server is a failure', 0.6);
    //     }
    // }


    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <Form
            {...formItemLayout}
            className="Flip_SignupForm"
            form={form}
            name="register"
            onFinish={() => handle_signupRequest(history)}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            scrollToFirstError
        >
            <Form.Item
                className="Flip_SignupForm_Item"
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
                className="Flip_SignupForm_Item"
                name="nickname"
                label="Nickname"
                tooltip="What do you want others to call you?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input value={val_nickn} onChange={handle_nickNChange} />
            </Form.Item>

            <Form.Item
                className="Flip_SignupForm_Item"
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

            <Form.Item
                className="Flip_SignupForm_Item"
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password value={val_p_ver} onChange={handle_p_verChange} />
            </Form.Item>

            <Form.Item
                className="Flip_SignupForm_Item"
                name="verification"
                label="Verification Code"
                rules={[
                    {
                        required: true,
                        message: 'Please input the code!',
                    },
                ]}
            >
                <div style={{ border: `${val_borderWidth}px solid red` }}><Input value={val_veri} onChange={handle_veriChange} /></div>
            </Form.Item>
            <Form.Item
                className="Flip_SignupForm_Item"
                label=" "
                colon={false}
            >
                <img src={val_veriImageURL} height='50px' width='100px' />
                <p className="veri-failed-warning">{val_veriFailWarning}</p>
            </Form.Item>


            <Form.Item
                className="Flip_SignupForm_Item"
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>

            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
    );
};


const SignUpForm = () => {
    return (
        <div className="SignupForm-container">
            <h1 style={{ textAlign: 'center' }}>Start your jounery...</h1>
            <RegistrationForm />
        </div>
    );
}

export default SignUpForm;
