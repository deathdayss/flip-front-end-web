/**
 * @author Robert Zhao, Yi Gu
 * @create date 2021-08-27 23:32:13
 * @modify date 2021-08-27 23:32:13
 */


/* eslint-disable */

import React, { Component, useState } from 'react';
import Header from '../header_components/Header.jsx';
import "./UploadForm1.scss";
import { Input, Form, Modal, Button, Upload, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import request from 'umi-request';
import { useHistory } from 'react-router-dom';

const { CheckableTag } = Tag;

const tagsData = [
	'Action',
	'Adventure',
	'Board',
	'Card',
	'Family',
	'Music',
	'Puzzle',
	'Racing',
	'Role-Playing',
	'Simulation',
	'Sports',
	'Strategy'
];

const formItemLayout = {
	labelCol: { span: 0, }, wrapperCol: { span: 5, },
};

const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e && e.fileList;
};

const imageList = [];
// =========================================================================================
// Form Upload Logic

const handleSubmitRequest = (_game_id_, _title_, _folder_, _description_, _category_, history = null) => {
	const user = localStorage.getItem('user');
	const userDetails = JSON.parse(user);
	const token = userDetails.token;

	console.log('===================================');
	console.log("Game ID: \t" + _game_id_);
	console.log("thumbnail: \t" + JSON.stringify(imageList[0]));
	console.log("Title: \t\t" + _title_);
	console.log("Folder: \t" + _folder_);
	console.log("Descript: \t" + _description_);
	console.log("Category: \t" + _category_);
	console.log('===================================');

	if (_title_.length == 0) { message.warn("The game title cannot be empty.", 2.0); }
	else if (_folder_.length == 0) { message.warn("A folder is necessary for your game.", 2.0); }
	else if (_category_.length == 0) { message.warn("You must select at least a tag for your game category.", 2.0); }
	else if (_description_.length == 0) { message.warn("Have some description will bring you more notice.", 2.0); }
	else {
		const formData = new FormData();
		const categoryStr = _category_.join(" ");

		formData.append('file_body', imageList[0]);
		// formData.append('email', userDetails.email);
		// formData.append('password', userDetails.password);
		formData.append('game_id', _game_id_);
		formData.append('game_name', _title_);
		formData.append('zone', categoryStr);
		formData.append('description', _description_);

		const promise = getInfoUploadService(formData, token);
		promise.then(
			values => {
				message.info('Your game has been uploaded successfully ! GID:' + _game_id_, 2.0);
				history.push('/');

			},
			reasons => {
				message.info('Your game has been uploaded successfully ! GID:' + _game_id_, 2.0);
				history.push('/');
			})
	}
}

// const DOMAIN = "http://106.52.167.166:8084";
const API_INFO = "http://175.178.159.131:8084/v1/upload/info";//`${DOMAIN}/v1/upload/info`;

const getInfoUploadService = (formData, token) => {
	return request(API_INFO, {
		method: "post",
		headers: {
			token: token
		},
		data: formData,
		requestType: "form",
	});
}

// // =========================================================================================
// //Miniature display
function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

class PicturesWall extends Component {
	state = {
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: [],
	};

	handleCancel = () => this.setState({ previewVisible: false });
	handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		this.setState({
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		});
	};
	handleChange = ({ fileList, file }) => {
		imageList.push(file);
		// console.log(file);
		this.setState({ fileList });
	}

	beforeUpload = (file) => {
		return false;
	};

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
	margin: '43px 495px 55px 497px',
	boxSizing: 'border-box',
}

const UploadForm1 = (props) => {
	const history = useHistory();
	const gid = props.location.search.split("=")[1];//_path_.split('/')[1];
	console.log("gid 11:", gid)

	const [title, updateTitle] = useState("");
	const [category, updateCategory] = useState("");
	const [folder, updateFolder] = useState("GAME" + gid);
	const [description, updateDescription] = useState("");

	const handleChange = (tag, checked) => {
		// console.log("tag", tag);
		// console.log("checked", checked);
		// console.log("category", category);
		const selectedTags = checked ? [...category, tag] : category.filter(t => t !== tag);
		// const tagsStr = selectedTags.join(" ");
		console.log("tags", selectedTags);
		// console.log('type:', typeof(tagsStr));
		updateCategory(selectedTags);
	}

	return (
		<div>
			<Header />
			<div style={style}>
				<Form
					name="game_info_upload"
					id="upload_form"
					onFinish={() => handleSubmitRequest(gid, title, folder, description, category, history)}
				>
					<Form.Item
						name="file_name"
						wrapperCol={
							{ span: 1, }
						}
						rules={[]}
					>
						<div className='item'>
							<label htmlFor='fileName' style={{ fontSize: '20px', fontFamily: 'Arial' }}>File</label>
							<Input
								value={folder}
								onChange={(e) => {
									updateFolder(e.target.value);
								}}
								id='fileName' allowClear type='text' placeholder='File Name' style={{ marginTop: '10px', borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '#C4C4C4 3px solid', width: '422px' }} />
						</div>
					</Form.Item>

					<Form.Item
						name="cover_upload"
						valuePropName="fileList"
						getValueFromEvent={normFile}

					>
						<div className='item'>
							<label htmlFor='covers' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Cover Picture</label>
							<div className='covers'>
								<div className='cover'>
									<PicturesWall id="IMG_LEFT" />
									<div style={{ width: '185px', height: '0px', float: 'left', marginRight: '100px' }}><p>Cover Image</p></div>
								</div>
							</div>
						</div>
					</Form.Item>

					<Form.Item
						name="title"
						rules={[]}
					>
						<div className='item'>
							<label htmlFor='game_title' className='title' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Title</label>
							<Input
								value={title}
								onChange={(e) => {
									updateTitle(e.target.value);
								}}
								id='game_title' showCount maxLength={100} style={{ border: '1px solid #ABABAB', borderRadius: '5px', height: '42px', width: '925px', boxSizing: 'border-box', marginTop: '16px' }} />
						</div>

					</Form.Item>

					<Form.Item
						name="category"
						rules={[]}
					>
						<div className='item'>
							<label htmlFor='category' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Category</label>
							<p></p>
							<div style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: '-7px' }}>
								{tagsData.map(tag => (
									<CheckableTag
										key={tag}
										checked={category.indexOf(tag) > -1}
										style={{ fontSize: '15px' }}
										onChange={checked => handleChange(tag, checked)}
									>
										{tag}
									</CheckableTag>
								))}
							</div>
						</div>
					</Form.Item>

					<Form.Item name="description">
						<div className='item'>
							<label htmlFor='description' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Description</label>
							<textarea
								value={description}
								onChange={
									(e) => {
										updateDescription(e.target.value);
									}
								}
								id='description' form='upload_form' style={{ width: '925px', height: '255px', boxSizing: 'border-box', border: '1px solid #ABABAB', borderRadius: '8px', marginTop: '16px', padding: '8px' }}></textarea>
						</div>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ backgroundColor: '#5B28FF', width: '98px', height: '37px', border: '0px' }}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}
export default UploadForm1;