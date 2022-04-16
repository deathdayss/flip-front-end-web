/**
 * @author Yi Gu
 * @create date 2022-03-23 17:32:13
 * @modify date 2022-03-27 18:16:19
 */


/* eslint-disable */

import React, { Component, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, Col, DatePicker, Form, Input, message, Modal, Radio, Space, Row, Upload } from 'antd';
import { LineOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import request from 'umi-request';
import moment from 'moment';

import "./UpdateForm.scss";
import Header from '../header_components/Header.jsx';
import { API_USER_DETAIL } from '../../Config.js';

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

	// if (_nickname_.length == 0) { message.warn("The nickname cannot be empty.", 2.0); }
	// else {
	// 	const formData = new FormData();
	// 	formData.append('Email', _email_);
	// 	formData.append('Age', _age_);
	// 	formData.append('Nickname', _nickname_);
	// 	formData.append('Signiature', _signature_);
	// 	formData.append('Gender', _gender_);
	// 	formData.append('Birth', _birth_);
	// 	const promise = getInfoUploadService(formData);
	// 	promise.then(
	// 		values => {
	// 			message.info('Your personal info has been updated successfully ! User:' + _email_, 2.0);
	// 			history.push('/');
	// 		},
	// 		reasons => {
	// 			message.info('Oops ! Something was wrong ! Please try again ! User:' + _email_, 2.0);
	// 			history.push('/');
	// 		})
	// }
}

const API_INFO = "http://106.52.167.166:8084/v1/user/detail";//`${DOMAIN}/v1/upload/info`;

const getInfoUploadService = (formData) => {
	return request(API_INFO, {
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

	// const formData = new FormData();
	// formData.append('Email', _email_);
	// formData.append('Age', _age_);
	// formData.append('Icon', _icon_);
	// const promise = getInfoUploadService(formData);
	// promise.then(
	// 	values => {
	// 		message.info('Your avatar has been updated successfully ! User:' + _email_, 2.0);
	// 		history.push('/');
	// 	},
	// 	reasons => {
	// 		message.info('Oops ! Something was wrong ! Please try again ! User:' + _email_, 2.0);
	// 		history.push('/');
	// 	})
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
	// const [previewVisible, setPreviewVisible] = useState(false);
	// const [previewImage, setPreviewImage] = useState("");
	// const [previewTitle, setPreviewTitle] = useState("");
	// const [fileList, setFileList] = useState([
	// 	// {
	// 	// 	uid: '-1',
	// 	// 	name: 'icon.png',
	// 	// 	status: 'done',
	// 	// 	url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
	// 	// },
	// ]);

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
		// const image = file.url ? file.url : file.preview;
		// const name = file.name ? file.name : file.url.substring(file.url.lastIndexOf('/') + 1);
		// setPreviewImage(image);
		// setPreviewVisible(true);
		// setPreviewTitle(name);
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


	const getUserDetailService = params => {
		return request(`${API_USER_DETAIL}`, { params });
	}

	useEffect(() => {
		const getUserDetail = async () => {
			const result = await getUserDetailService({
				Email: 'yuanxinzhu1234',
				Age: 0
			});
			// setEmail(result.detail.Email);
			// setAge(result.detail.Age);
			console.log(result.detail);
			// console.log(data);
		}
		getUserDetail();
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
					{...layout}
					onFinish={() => {
						page == 1 ?
							handleInfoChangeRequest("abc", age, nickname, signature, gender, birth, history)
							:
							handleAvatarChangeRequest("abc", age, imageList, history)
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
									<Input placeholder="" value={nickname} onChange={onChangeNickname} />
								</Form.Item>

								<Form.Item label="Email">{email}</Form.Item>

								<Form.Item label="Signature">
									<Input placeholder="" value={signature} onChange={onChangeSignature} />
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
									<p style={{ fontSize: '12px' }}>Wanna Change?</p>

									<Form.Item
										getValueFromEvent={normFile}
									>
										<UpdateAvatar id="IMG_LEFT" />
									</Form.Item>

									<Form.Item>
										<Avatar size={64} icon={<UserOutlined />} />
										<p style={{ fontSize: '12px'}} >Current Avatar</p>
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