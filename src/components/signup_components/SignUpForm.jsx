import './SignUpForm.scss'

import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { message } from 'antd';
import $ from 'jquery'
import { useHistory } from 'react-router-dom'



// const { Option } = Select;
// const residences = [{value: 'zhejiang',label: 'Zhejiang',children: [{value: 'hangzhou',label: 'Hangzhou',children: [{value: 'xihu',label: 'West Lake',},],},],},{value: 'jiangsu',label: 'Jiangsu',children: [{value: 'nanjing',label: 'Nanjing',children: [{value: 'zhonghuamen',label: 'Zhong Hua Men',},],},],},];
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 8, }, }, wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, }, };
const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, }, };

const RegistrationForm = () => {
    const [form] = Form.useForm();
    // const onFinish = (values) => {console.log('Received values of form: ', values);};
    // const prefixSelector = (<Form.Item name="prefix" noStyle><Select style={{ width: 70, }} ><Option value="86">+86</Option><Option value="87">+87</Option> </Select> </Form.Item>);
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    // const onWebsiteChange = (value) => {if (!value) {setAutoCompleteResult([]);} else {setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));}};
    let history = useHistory();
    const fail_forward = false;

    const [val_email, set_ValEmail] = useState("");
    const [val_nickn, set_ValNickn] = useState("");
    const [val_passw, set_ValPassw] = useState("");
    const [val_p_ver, set_ValPVeri] = useState("");
    const handle_emailChange = (e) => { console.log("set_ValEmail: " + val_email); set_ValEmail(e.target.value); }
    const handle_nickNChange = (e) => { console.log("set_ValNickn: " + val_nickn); set_ValNickn(e.target.value); }
    const handle_passwChange = (e) => { console.log("set_ValPassw: " + val_passw); set_ValPassw(e.target.value); }
    const handle_p_verChange = (e) => { console.log("set_ValPVeri: " + val_p_ver); set_ValPVeri(e.target.value); }

    const handle_signupRequest = (history) => {
        // const url = "http://192.168.1.13:5000/signup";
        const url = "http://106.52.167.166:8084/v1/user/register"
        console.log("HTTP request made towards: " + url);
        try {
            $.post(url,
                {
                    email: val_email,
                    password: val_passw,
                    nickname: val_nickn
                },
                function (data, status) {
                    console.log(data);
                    // var dataObj = eval("(" + data + ")");//转换为json对象 
                    var dataObj = data;
                    if (dataObj.status === 200) {
                        console.log("LOGIN SUCCESS")
                        // history.push('/');
                        message.info('Successfully Signup', 0.6);
                        return;
                    } else {
                        console.log("LOGIN FAILURE")
                        // alert(dataObj.msg)
                        return;
                    }
                }
            ).fail(function () { message.warn('Incorrect form data', 0.6);  if(fail_forward){history.push('/');} }); 
        } catch (e) {
            message.warn('Connection to server is a failure', 0.6);
        }
    }


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
