import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './LoginForm.scss'
import $ from 'jquery'
import { message } from 'antd';
import { useHistory } from 'react-router-dom'



const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, }, }, };
const formItemLayout = { labelCol: { xs: { span: 24, }, sm: { span: 8, }, }, wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, }, };

const LoginForm = (props) => {

    // const onFinish = (values) => { console.log('Success:', values); };
    // const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo); };
    let history = useHistory();
    const fail_forward = true;

    const [val_email, set_ValEmail] = useState("");
    const [val_passw, set_ValPassw] = useState("");
    const handle_emailChange = (e) => { set_ValEmail(e.target.value); }
    const handle_passwChange = (e) => { set_ValPassw(e.target.value); }

    const handle_loginRequest = (history) => {
        const url = "http://192.168.1.13:5000/login";
        console.log("HTTP request made towards: " + url);
        // 第一个参数是提交的地址
        try {
            $.post(url,
                {
                    email: val_email,
                    password: val_passw
                },
                function (data, status) {
                    console.log(data);
                    var dataObj = eval("(" + data + ")");//转换为json对象 
                    if (dataObj.code === 200) {
                        console.log("LOGIN SUCCESS")
                        history.push('/');
                        return;
                    } else {
                        console.log("LOGIN FAILURE")
                        alert(dataObj.msg)
                        message.warn('Either your <email> or <password> is incorrect', 0.6);
                        return;
                    }
                }
            ).fail(function(){message.warn('Connection to server is a failure', 0.6); if(fail_forward){history.push('/')} }); 
        } catch (e) {
            message.warn('Connection to server is a failure', 0.6);
        }
    }



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
