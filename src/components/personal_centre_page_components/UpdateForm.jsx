/**
 * @author Yi Gu
 * @create date 2022-03-23 17:32:13
 * @modify date 2022-03-27 18:16:19
 */


/* eslint-disable */

import React, { Component, useState } from 'react';
import Header from '../header_components/Header.jsx';
import "./UpdateForm.scss";
import moment from 'moment';
import { Input, Form, Radio, Button, DatePicker, Space, Row, Col, Divider, Avatar, Upload, message } from 'antd';
import { LineOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import request from 'umi-request';
import { useHistory } from 'react-router-dom'

const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

// =========================================================================================
// Form Upload Logic
const handleSaveRequest = (_user_id_, _nickname_, _signature_, _gender_, _birthday_, history = null) => {

	if (_nickname_.length == 0) { message.warn("The username cannot be empty.", 2.0); }
	else {
		const formData = new FormData();
		formData.append('username', _username_);
		formData.append('nickname', _nickname_);
		formData.append('signiature', _signature_);
		formData.append('gender', _gender_);
		formData.append('birthday', _birthday_);
		const promise = getInfoUploadService(formData);
		promise.then(
			values => {
				message.info('Your personal info has been updated successfully ! UID:' + _username_, 2.0);
				history.push('/');

			},
			reasons => {
				message.info('Your personal info has been uploaded successfully ! UID:' + _username_, 2.0);
				history.push('/');
			})
	}
}

// =========================================================================================
// FORM ELEMENT

const style = {
	position: 'relative',
	height: '919px',
	width: '928px',
	margin: '43px 495px 55px 497px',
	boxSizing: 'border-box',
}

const UpdateForm = (props) => {
	const history = useHistory();
	const _gid_ = props.location.search.split("=")[1];//_path_.split('/')[1];

	// const [form] = Form.useForm();
	// const [formLayout, setFormLayout] = useState('horizontal');

	// const onFormLayoutChange = ({ layout }) => {
	// 	setFormLayout(layout);
	// };

	// const formItemLayout =
	// 	formLayout === 'horizontal'
	// 		? {
	// 			labelCol: {
	// 				span: 4,
	// 			},
	// 			wrapperCol: {
	// 				span: 14,
	// 			},
	// 		}
	// 		: null;

	// const buttonItemLayout =
	// 	formLayout === 'horizontal'
	// 		? {
	// 			wrapperCol: {
	// 				span: 14,
	// 				offset: 4,
	// 			},
	// 		}
	// 		: null;

	const [page, setPage] = React.useState(1);
	const [gender, setGender] = React.useState(1);
	const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));
	const [fileList, setFileList] = useState([
		{
			uid: '-1',
			name: 'icon.png',
			status: 'done',
			url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
		},
	]);

	const onChangePage = e => {
		console.log('page:', e.target.value);
		setPage(e.target.value);
	}

	const onChangeGender = e => {
		console.log('gender:', e.target.value);
		setGender(e.target.value);
	};

	const onChangeDate = (date, dateString) => {
		console.log(date, dateString);
		setDate(dateString);
	}

	const disabledDate = current => {
		// Can not select days before today and today
		return current && current > moment().endOf('day');
	}

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const onChangeIcon = ({ fileList: newFileList }) => {
		setFileList(newFileList);
	};

	return (
		<div>
			<Header />
			<div style={style}>
				<Form
				// {...formItemLayout}
				// layout={formLayout}
				// form={form}
				// initialValues={{
				// 	layout: formLayout,
				// }}
				// onValuesChange={onFormLayoutChange}
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
										<Radio.Button value={1} style={{
											width: '100%',
											color: page == 1 ? '#fff' : '#000',
											backgroundColor: page == 1 ? '#6f42c1' : '#fff',
											borderColor: page == 1 ? '#6f42c1' : '#D3D3D3'
										}} >Personal Info</Radio.Button>
										<Radio.Button value={2} style={{
											width: '100%',
											backgroundColor: page == 2 ? '#6f42c1' : '#fff',
											borderColor: page == 2 ? '#6f42c1' : '#D3D3D3'
										}} >My Icon</Radio.Button>
										<Radio.Button value={3} style={{
											width: '100%',
											backgroundColor: page == 3 ? '#6f42c1' : '#fff',
											borderColor: page == 3 ? '#6f42c1' : '#D3D3D3'
										}} >Creation Management</Radio.Button>
									</Space>
								</Radio.Group>
							</Form.Item>
						</Col>

						<Col span={1}>
							<LineOutlined rotate='90' style={{ color: '#6f42c1', fontSize: '25px' }} />
						</Col>

						{page == 1 ?
							<Col>
								<p style={{ fontSize: '16px' }}>Personal Info</p>
								<Form.Item label="Nickname">
									<Input placeholder="Leo001" />
								</Form.Item>

								<Form.Item label="Username">{'12345'}</Form.Item>

								<Form.Item label="Signature">
									<Input placeholder="Test Signature" />
								</Form.Item>

								<Form.Item label="Gender">
									<Radio.Group onChange={onChangeGender} value={gender}>
										<Radio value={1}>Male</Radio>
										<Radio value={2}>Female</Radio>
										<Radio value={3}>Other</Radio>
									</Radio.Group>
								</Form.Item>

								<Form.Item label="Date of Birth">
									<DatePicker
										defaultValue={moment()}
										disabledDate={disabledDate}
										onChange={onChangeDate} />
								</Form.Item>

								<Form.Item>
									<Button type="primary" style={{
										backgroundColor: '#6f42c1',
										borderColor: '#6f42c1'
									}} >Save</Button>
								</Form.Item>
							</Col>
							: page == 2 ?
								<Col>
									<p style={{ fontSize: '16px' }}>Icon</p>
									<p style={{ fontSize: '12px' }}>Wanna Change?</p>

									<Form.Item>
										<Space split={<Divider type="vertical" style={{ borderColor: '#6c757d' }}/>}>
											<Upload
												action=""
												listType="picture-card"
												fileList={fileList}
											>
												{fileList.length < 2 && uploadButton}
											</Upload>
											<div style={{ textAlign: 'center' }}>
												<Avatar size={64} icon={<UserOutlined style={{ verticalAlign: 'middle' }} />} />
												<p style={{ fontSize: '12px', color: '#6c757d' }}>Current Avatar</p>
											</div>
										</Space>
									</Form.Item>

									<p style={{ fontSize: '12px', color: '#6c757d' }}>Select an image from your local file. Size: 180 * 180 px. Compatible image types: .jpg, .png, etc. Maximum image size: 2MB. </p>

									<Form.Item>
										<Button type="primary" style={{
											backgroundColor: '#6f42c1',
											borderColor: '#6f42c1'
										}} >Update</Button>
									</Form.Item>

								</Col>
								:
								<Col>
									<p style={{ fontSize: '16px' }}>Creation Management</p>

								</Col>
						}
					</Row>
				</Form>
			</div>
		</div >
	)
};
export default UpdateForm;