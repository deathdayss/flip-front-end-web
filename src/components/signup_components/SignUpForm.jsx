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
const DOMAIN = "http://175.178.159.131:8084";
const API_SIGNUP = `${DOMAIN}/v1/notoken/register`;
const API_VERIFYEMAIL = `${DOMAIN}/v1/notoken/verify`;
const API_REQUESTQUESTION = `${DOMAIN}/v1/security/question`;
const API_VERIFICATION_CODE = `${DOMAIN}/v1/verification/code`;

const SignUpForm = (props) => {
	const [form] = Form.useForm();
	const [autoCompleteResult, setAutoCompleteResult] = useState([]);
	let history = useHistory();
	const fail_forward = false;
	const [signup_step, set_SignupStep] = useState(1);
	const [val_email, set_ValEmail] = useState("");
	const [val_nickn, set_ValNickn] = useState("");
	const [val_passw, set_ValPassw] = useState("");
	const [val_p_ver, set_ValPVeri] = useState("");
	const [val_veri, set_ValVeri] = useState("");
	const [questionList, set_questionList] = useState("");
	const [val_veriCodeResponse, set_ValVeriCodeResponse] = useState("");
	const [val_veriImageURL, set_ValVeriImageURL] = useState("");
	const [val_veriFailWarning, set_ValVeriFailWarning] = useState("");
	const [val_borderWidth, set_ValBorderWidth] = useState("0");
	const handle_emailChange = (e) => { set_ValEmail(e.target.value); }
	const handle_nickNChange = (e) => { set_ValNickn(e.target.value); }
	const handle_passwChange = (e) => { set_ValPassw(e.target.value); }
	const handle_p_verChange = (e) => { set_ValPVeri(e.target.value); }
	const handle_veriChange = (e) => { set_ValVeri(e.target.value); }


	const handle_signupRequest = (values) => {

		let params = values;
		params.email = val_email;
		params.nickname = val_nickn;
		params.password = val_passw;
		// console.log("Attempting to signup via: " + email + " " + nickname + " " + password);
		const signupPromise = getSignupService(params);
		signupPromise.then(
			function (msg) {
				message.info('Signup Successful', 2.0);
				localStorage.setItem('user', JSON.stringify({
					email: val_email,
					password: val_passw,
					token: msg.token
				}));
				props.set_IsLoggedIn(true);
				props.closeSignup();
				setTimeout(function () { message.info('Welcome ' + val_email + ' !', 2.0); }, 2000);
			},
			function (err) {
				console.log('Signup failture');
				message.warn('The email you used is already registered', 2.0);
			}
		)


	}

	const getSignupService = (params) => {
		return request(`${API_SIGNUP}`, {
			method: "post",
			data: params,
			requestType: "form"
		});
	}


	const handle_emailVerification = (values) => {
		set_ValVeriFailWarning("");
		set_ValBorderWidth("0");
		if (val_veri.toUpperCase() === val_veriCodeResponse.toUpperCase()) {
			const result = request(`${API_VERIFYEMAIL}`, {
				method: "get",
				params: {
					email: values.email,
					password: values.password
				}
			});
			result.then(
				(msg) => {
					handle_requestQuestionList();
				}).catch((err) => {
					message.warn("This email is already registered");
				});
		} else {
			message.warn('Verification Failed!', 2.0);
			set_ValBorderWidth("1");
			set_ValVeriFailWarning("Verification Failed");
		}


	}

	const handle_requestQuestionList = () => {
		const result = request(`${API_REQUESTQUESTION}`, {
			method: "get",
			params: {
				num: 3
			}
		});
		result.then(
			(msg) => {
				set_questionList(msg.List);
				set_SignupStep(2);
			}).catch((err) => {
				message.warn(err);
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
				set_ValVeriCodeResponse("abcd");
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

	switch (signup_step) {
		case 1:
			return (
				<div className="signup-mask">
					<div className="signup-window">
						<div className="signup-header">
							<div className="btn-close" style={{ padding: '30px', float: 'left', cursor: 'pointer' }} onClick={function () { props.closeSignup() }} ></div>
							<img src="images/header/logo.svg" width="60px" style={{ float: 'right', padding: '20px' }}></img>
						</div>
						<div className="signup-form-area">
							<div className="signup-form-area-title">
								<h3> Sign Up for Flip </h3>
								<p>Create your profile. Follow your favorite creator. Make your own game and more</p>
							</div>
							<Form
								{...formItemLayout}
								className="Flip_SignupForm"
								form={form}
								name="safetyQuestion"
								onFinish={(values) => handle_emailVerification(values)}
								initialValues={{
									residence: ['zhejiang', 'hangzhou', 'xihu'],
									prefix: '86',
								}}
								scrollToFirstError
							>
								Enter your Email
								<Form.Item
									className="Flip_SignupForm_Item"
									name="email"
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

								Create your user name
								<Form.Item
									className="Flip_SignupForm_Item"
									name="nickname"
									tooltip="What do you want others to call you?"
									rules={[
										{
											required: true,
											message: 'Please input your user name!',
											whitespace: true,
										},
									]}
								>
									<Input value={val_nickn} onChange={handle_nickNChange} />
								</Form.Item>

								Create your password
								<Form.Item
									className="Flip_SignupForm_Item"
									name="password"

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

								Confirm your password
								<Form.Item
									className="Flip_SignupForm_Item"
									name="confirm"

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

								Verification Code
								<Form.Item
									className="Flip_SignupForm_Item"
									name="verification"

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
									<p className="veri-failed-warning">{val_veriFailWarning}</p>
									<img src={val_veriImageURL} height='50px' width='100px' />
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
									<Button type="primary" htmlType="submit" style={{ backgroundColor: "#5B28FF", width: "150px", borderRadius: "10px" }}>Next</Button>
								</Form.Item>
							</Form>
						</div>
						<div className="signup-footer">
							<p>Already have an account?</p>
							<div style={{ cursor: "pointer" }} onClick={props.switchToLogin}>Log in</div>
						</div>
					</div>
				</div>
			);
		case 2:
			return (
				<div className="signup-mask">
					<div className="signup-window">
						<div className="signup-header">
							<div className="btn-close" style={{ padding: '30px', float: 'left', cursor: 'pointer' }} onClick={function () { props.closeSignup() }} ></div>
							<img src="images/header/logo.svg" width="60px" style={{ float: 'right', padding: '20px' }}></img>
						</div>
						<div className="signup-form-area">
							<div className="signup-form-area-title">
								<h3> Entre three safety questions: </h3>
							</div>
							<Form
								{...formItemLayout}
								className="Flip_SignupForm"
								form={form}
								name="register"
								onFinish={(values) => handle_signupRequest(values)}
								initialValues={{
									residence: ['zhejiang', 'hangzhou', 'xihu'],
									prefix: '86',
								}}
								scrollToFirstError
							>
								<Form.Item
									name="question1">

									<Select>
										{
											questionList.map((item) =>
												(<Select.Option value={item.id}>{item.content}</Select.Option>))
										}
									</Select>
								</Form.Item>
								<Form.Item
									name="answer1">
									<Input />
								</Form.Item>
								<Form.Item
									name="question2">
									<Select>
										{
											questionList.map((item) =>
												(<Select.Option value={item.id}>{item.content}</Select.Option>))
										}
									</Select>
								</Form.Item>
								<Form.Item
									name="answer2">
									<Input />
								</Form.Item>
								<Form.Item
									name="question3">
									<Select>
										{
											questionList.map((item) =>
												(<Select.Option value={item.id}>{item.content}</Select.Option>))
										}
									</Select>
								</Form.Item>
								<Form.Item
									name="answer3">
									<Input />
								</Form.Item>
								<Form.Item {...tailFormItemLayout}>
									
									<Button style={{ backgroundColor: '#D6D3DE', color: '#FFF', width: '150px', borderRadius: '10px', marginLeft:'-90px',marginRight:'20px' }} onClick={
										() => {
											set_SignupStep(1);
										}
									}>return</Button>
									<Button type="primary" htmlType="submit" style={{ backgroundColor: "#5B28FF", width: "150px", borderRadius: "10px" }}>Create account</Button>
									
								</Form.Item>
							</Form>
						</div>
						<div className="signup-footer">
							<p>Already have an account?</p>
							<div style={{ cursor: "pointer" }} onClick={props.switchToLogin}>Log in</div>
						</div>
					</div>
				</div>
			);
		default: return <div></div>;
	}

};

export default SignUpForm;
