import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.scss'

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const LoginForm = () => {
    
    const onFinish = (values) => {console.log('Success:', values);};
    const onFinishFailed = (errorInfo) => {console.log('Failed:', errorInfo);};





    // ====================================================================================================
    // ====================================================================================================
    return (
        <div className="LoginForm-container">
            <h3 className="LoginForm-Title"> Flip, {"<SLOGAN>"} </h3>
            <br/>
            <Form
                {...formItemLayout}
                name="normal_login"
                className="Flip_LoginForm"
                initialValues={{ remember: true }}
                onFinish={onFinish}
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
                    <Input />
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
                    <Input.Password />
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
