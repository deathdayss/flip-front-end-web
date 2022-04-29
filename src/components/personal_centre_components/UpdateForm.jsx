/**
 * @author Yi Gu
 * @create date 2022-03-23 17:32:13
 * @modify date 2022-03-27 18:16:19
 */


/* eslint-disable */

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Avatar,
	Button,
	Col,
	DatePicker,
	Divider,
	Form,
	Image,
	Input,
	message,
	Modal,
	Radio,
	Row,
	Space,
	Tooltip,
	Upload
} from 'antd';
import { LineOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import request from 'umi-request';
import moment from 'moment';
import axios from 'axios';

import "./UpdateForm.scss";
import Header from '../header_components/Header.jsx';
import { API_AVATAR, API_USER_DETAIL } from '../../Config.js';

const normFile = e => {
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

const imageList = [];

// =========================================================================================
// Form Upload Logic
const handleInfoChangeRequest = (_email_, _age_, _nickname_, _signature_, _gender_, _birth_, history = null) => {

	console.log("email", _email_);
	console.log("age", _age_);
	console.log("nickname", _nickname_);
	console.log("signature", _signature_);
	console.log("gender", _gender_);
	console.log("birthday", _birth_);
}

const getInfoUploadService = (formData) => {
	return request(API_USER_DETAIL, {
		method: "post",
		data: formData,
		requestType: "form",
	});
}

// =========================================================================================
// Avatar display & upload

const handleAvatarChangeRequest = (_email_, _age_, _icon_, history = null) => {

	console.log("email", _email_);
	console.log("age", _age_);
	console.log("avatar", imageList[0]);
}

const getBase64 = file => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class UpdateAvatar extends Component {
	state = {
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [],
	};

	beforeUpload = file => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			message.error('You can only upload .jpg/.png file!');
		}
		const isLt2MB = file.size / 1024 / 1024 < 2;
		if (!isLt2MB) {
			message.error('Image must be smaller than 2MB!');
		}
		return isJpgOrPng && isLt2MB;
	}

	handleCancel = () => {
		this.setState({ previewVisible: false });
	}

	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		});
	}

	handleChange = ({ fileList, file }) => {
		imageList.push(file);
		this.setState({ fileList });
		console.log('list:', this.state.fileList);
	}

	render() {
		const { previewVisible, previewImage, fileList, previewTitle } = this.state;

		const uploadButton = (
			<div>
				<PlusOutlined />
				<div style={{ marginTop: 8 }}>Upload</div>
			</div>
		);

		return (
			<div style={{ float: 'left', marginRight: '26px' }}>
				<Upload
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					beforeUpload={this.beforeUpload}
				>
					{fileList.length >= 1 ? null : uploadButton}
				</Upload>
				<Modal
					visible={previewVisible}
					title={previewTitle}
					footer={null}
					onCancel={this.handleCancel}
				>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
			</div>
		);
	}
}

// =========================================================================================
// FORM ELEMENT

const style = {
	position: 'relative',
	height: '919px',
	width: '928px',
	margin: '43px 495px 55px 300px',
	boxSizing: 'border-box',
}

const UpdateForm = (props) => {
	const history = useHistory();

	const [email, setEmail] = useState("");

	const [page, setPage] = useState(1);
	const [age, setAge] = useState(0);
	const [nickname, setNickname] = useState("");
	const [signature, setSignature] = useState("");
	const [gender, setGender] = useState(1);
	const [birth, setBirth] = useState(moment().format('YYYY-MM-DD'));

	const [avatar, setAvatar] = useState();

	// const getUserDetailService = token => {
	// 	return request(`${API_USER_DETAIL}`, { 
	// 		method: "get",
	// 		token: token 
	// 	});
	// }

	const getUserAvatarService = token => {
		return axios.get(`${API_AVATAR}`, { 
			headers: {"Authorization" : `${token}`} });
	}

	useEffect(() => {
		const user = localStorage.getItem('user');
		const userDetails = JSON.parse(user);
		const token = userDetails.token;

		// const getUserDetails = async () => {
		// 		const result = await getUserDetailService({
		// 			token
		// 		});
		// 		console.log('result:', result);
		// 		setEmail(result.email);
		// 		setNickname(result.nickname);
		// 		setSignature(result.signature);
		// 		setGender(result.gender);
		// 		setBirth(result.birth);
		// 	}
		
		// getUserDetails();

		const getUserAvatar = async () => {
			if (userDetails != null) {
				const result = await getUserAvatarService(token);
				result.then(res => {
					console.log(res.data)
				})
				// setAvatar(result);
			}
		}
		getUserAvatar();
	}, []);

	const onChangePage = e => {
		// console.log('page:', e.target.value);
		setPage(e.target.value);
	}

	const onChangeNickname = e => {
		// console.log('nickname:', e.target.value);
		setNickname(e.target.value);
	}

	const onChangeSignature = e => {
		// console.log('signature:', e.target.value);
		setSignature(e.target.value);
	}

	const onChangeGender = e => {
		// console.log('gender:', e.target.value);
		setGender(e.target.value);
	};

	const onChangeBirthday = (date, dateString) => {
		// console.log(date, dateString);
		setBirth(dateString);
		let duration = moment.duration(moment().diff(moment(dateString)));
		let { _data } = duration;
		setAge(_data.years);
	}

	const disabledDate = current => {
		// Can not select days after today and today
		return current && current > moment().endOf('day');
	}

	const layout = {
		labelCol: { span: 4 },
		wrapperCol: { span: 16 },
	};

	return (
		<div>
			<Header />
			<div style={style}>
				<Form
					className='uf'
					{...layout}
					onFinish={() => {
						page == 1 ?
							handleInfoChangeRequest("abc", age, nickname, signature, gender, birth, history)
							: page == 2 ?
								handleAvatarChangeRequest("abc", age, imageList, history)
								: null
					}}
				>
					<Row>
						<Col span={5}>
							<p style={{ fontSize: '16px', textAlign: 'center', fontWeight: 'bold' }}>Personal Centre</p>
							<Form.Item name="layout">
								<Radio.Group
									value={page}
									buttonStyle="solid"
									onChange={onChangePage}>
									<Space direction="vertical" size={0} style={{ borderCollapse: 'collapse' }}>
										<Radio.Button
											value={1}
											style={{
												width: '100%',
												color: page == 1 ? '#fff' : '#000',
												backgroundColor: page == 1 ? '#5B28FF' : '#fff',
												borderColor: page == 1 ? '#5B28FF' : '#D3D3D3'
											}}
										>
											Personal Info
										</Radio.Button>

										<Radio.Button
											value={2}
											style={{
												width: '100%',
												backgroundColor: page == 2 ? '#5B28FF' : '#fff',
												borderColor: page == 2 ? '#5B28FF' : '#D3D3D3'
											}}
										>
											My Icon
										</Radio.Button>

										<Link to='/my_game'>
											<Radio.Button
												value={3}
												style={{
													width: '100%'
												}}
											>
												Creation Management
											</Radio.Button>
										</Link>

										<Link to='/personal_page'>
											<Radio.Button
												value={4}
												style={{
													width: '100%',
													backgroundColor: page == 4 ? '#5B28FF' : '#fff',
													borderColor: page == 4 ? '#5B28FF' : '#D3D3D3'
												}}
											>
												My Homepage
											</Radio.Button>
										</Link>
									</Space>
								</Radio.Group>
							</Form.Item>
						</Col>

						<Col span={1}>
							<LineOutlined rotate='90' style={{ color: '#5B28FF', fontSize: '25px' }} />
						</Col>

						{page == 1 ?
							<Col>
								<p style={{ fontSize: '16px' }}>Personal Info</p>
								<Form.Item label="Nickname">
									<Input placeholder="Input your nickname here" value={nickname} onChange={onChangeNickname} />
								</Form.Item>

								<Form.Item label="Email">{email}</Form.Item>

								<Form.Item label="Signature">
									<Input placeholder="Customize your signature here" value={signature} onChange={onChangeSignature} />
								</Form.Item>

								<Form.Item label="Gender">
									<Radio.Group onChange={onChangeGender} value={gender}>
										<Radio value={1}>Male</Radio>
										<Radio value={2}>Female</Radio>
										<Radio value={3}>Other</Radio>
									</Radio.Group>
								</Form.Item>

								<Form.Item label="Birthday">
									<DatePicker
										defaultValue={moment()}
										// value={birth}
										disabledDate={disabledDate}
										onChange={onChangeBirthday} />
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit" style={{ backgroundColor: '#5B28FF', borderColor: '#5B28FF' }} >Save</Button>
								</Form.Item>
							</Col>
							: page == 2 ?
								<Col>
									<p style={{ fontSize: '16px' }}>Icon</p>
									<p style={{ fontSize: '14px' }}>Wanna Change?</p>
									<Form.Item
										getValueFromEvent={normFile}
									>
										<UpdateAvatar
											id="IMG_LEFT"
											maxCount={1}
											onchange={() => {
												<Tooltip defaultVisible={true}></Tooltip>
											}}
										/>
										<Divider type="vertical" />
										<Avatar
											size={100} style={{ marginLeft: '25px', verticalAlign: 'top', border: '1px solid #5B28FF' }}
											src={avatar ? avatar : "https://joeschmoe.io/api/v1/random"}
											icon={<UserOutlined />}
										/>
										{/* <p style={{ fontSize: '14px' }} >Current Avatar</p> */}
									</Form.Item>
									<p style={{ fontSize: '12px', color: '#6c757d' }}>Select an image from your local file. Size: 180 * 180 px. Compatible image types: .jpg, .png, etc. Maximum image size: 2MB. </p>
									<Form.Item>
										<Button type="primary" htmlType='submit' style={{ backgroundColor: '#5B28FF', borderColor: '#5B28FF' }} >Update</Button>
									</Form.Item>
								</Col>
								: null
						}
					</Row>
				</Form>
			</div>
		</div >
	)
};
export default UpdateForm;