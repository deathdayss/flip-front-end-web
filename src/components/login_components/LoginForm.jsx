import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css'

const LoginForm = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="LoginForm">
            <h1 className="LoginForm-Title"> 登陆标题字符 </h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空哦' }]}>
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        type="email"
                        placeholder="邮箱/用户名"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '也别忘了你的密码' }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> <a className="login-form-forgot" href=""> Forgot password</a>
                </Form.Item> */}
                <Form.Item className="login-button-container">
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button> 
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
};
export default LoginForm;
