/**
 * @author Yi Gu
 * @create date 2022-04-15 00:00:00
 * @modify date 2022-04-15 23:59:59
 */

/* eslint-disable */

import React, { Component, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Form, Modal, Pagination, Radio, Row, Space, message } from 'antd';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import request from 'umi-request';

import "./CreationManagement.scss";
import Header from '../header_components/Header.jsx';
import { API_IMG } from '../../Config.js';
import { getRecommendationList, getLatestList } from '../../service/lastestRecommand';

const { confirm } = Modal;

// =========================================================================================
// Form Upload Logic
const handleGameChangeRequest = (_gid_, _nickname_, _signature_, _gender_, _birthday_, history = null) => {

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
	margin: '43px 495px 55px 300px',
	boxSizing: 'border-box',
}

const CoverBlock = ({ game_name, like_num, playCount, authorName, img }) => {

	const showConfirm = () => {
		confirm({
			title: 'Do you want to delete this item?',
			icon: <ExclamationCircleOutlined />,
			okText: 'Yes',
			okButtonProps: {
				style: {
					backgroundColor: '#5B28FF',
					border: 'none',
				}
			},
			cancelButtonProps: {
				type: "text",
				style: {
					color: '#5B28FF'
				}
			},
			onOk() {
				console.log('Ok');
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}

	return (
		like_num ? 
		<div className='cover-block'>
			<img src={`${API_IMG}?img_name=${img}`} />

			<div className='word-group'>
				<div style={{ fontSize: '18px'}}>{game_name}</div>
				<div>22-04-16 10:00:00</div>
				<div>{`${like_num} liked · ${playCount} commented · ${like_num} collected `}</div>
			</div>

			<div className='buttom-group' style={{ marginBlock: 'auto'}}>
				<Link to='./update_game'>
					<Button className='btn1' icon={<EditOutlined />}>Edit</Button>
				</Link>
				<Button className='btn2' onClick={showConfirm}>Delete</Button>
			</div>
		</div >
		: null
	);
}

const BlockGrid = ({ colNum, data, dataToItem, itemClass, rowClass, gridClass, idProperty }) => {
	if (!data || data.length === 0) {
		return null;
	}
	let rowArray = [];
	let gridArray = [];
	let nextRowKey = idProperty ? data[0].GID : 0;
	for (let i = 0; i < data.length; ++i) {
		rowArray.push(
			<div key={idProperty ? data[i][idProperty] : i} className={itemClass}>
				{dataToItem(data[i])}
			</div>)
		if (rowArray.length === colNum) {
			gridArray.push(
				<div key={nextRowKey} className={rowClass}>
					{rowArray}
				</div>
			)
			rowArray = []
			if (i + 1 < data.length) {
				nextRowKey = idProperty ? data[i + 1][idProperty] : i + 1
			}
		}
	}
	if (rowArray.length > 0 && rowArray.length < colNum) {
		for (let i = rowArray.length; i < colNum; ++i) {
			rowArray.push(
				<div key={i} className={itemClass}></div>
			)
		}
		gridArray.push(
			<div key={nextRowKey} className={rowClass}>
				{rowArray}
			</div>
		)
	}
	return <div className={gridClass}>{gridArray}</div>
}

const itemRender = (current, type, originalElement) => {
	if (type === 'prev') {
		return <a>Previous</a>;
	}
	if (type === 'next') {
		return <a>Next</a>;
	}
	return originalElement;
}

const CreationManagement = (props) => {
	const history = useHistory();
	const [page, setPage] = useState(1);
	const [valueListContent, setListContent] = useState([]);
	const [valueShowOption, setShowOption] = useState(true);

	useEffect(
		() => {
			if (valueShowOption) {
				getRecommendationList().then(res => {
					setListContent(res)
				})
			}
			else {
				getLatestList().then(res => setListContent(res))
			}
		}, []);

	const onChangePage = e => {
		setPage(e.target.value);
		console.log("page:", e.target.value);
	}

	return (
		<div>
			<Header />
			<div style={style}>
				<Form className='cm'
				// onFinish={() => handleGameChangeRequest(gid, nickname, signature, gender, date, history)}
				>
					<Row>
						<Col span={5}>
							<p style={{ fontSize: '16px', textAlign: 'center', fontWeight: 'bold', margin: 0 }}>My Game</p>
						</Col>
						<Col>
							<Form.Item name="layout">
								<Radio.Group
									className='cmr'
									value={page}
									buttonStyle="solid"
									onChange={onChangePage}>
									<Space direction="horizontal" size={0} style={{ borderCollapse: 'collapse' }}>
										<Radio.Button
											value={1}
											style={{
												borderColor: '#fff',
												borderBottomColor: page == 1 ? '#5B28FF' : '#fff'
											}}
										>
											Latest Released
										</Radio.Button>

										<Radio.Button
											value={2}
											style={{
												borderColor: '#fff',
												borderBottomColor: page == 2 ? '#5B28FF' : '#fff',
											}}
										>
											Most Played
										</Radio.Button>

										<Radio.Button
											value={3}
											style={{
												borderColor: '#fff',
												borderBottomColor: page == 3 ? '#5B28FF' : '#fff'
											}}
										>
											Most Stored
										</Radio.Button>
									</Space>
								</Radio.Group>
							</Form.Item>
						</Col>

						<BlockGrid
							colNum={1}
							data={valueListContent}
							dataToItem={(data) =>
								<CoverBlock playCount={data.playCount}
									AuthorName={data.AuthorName}
									img={data.img}
									like_num={data.like_num}
									game_name={data.game_name}
								/>}
							idProperty='GID'
							gridClass='cover-block-grid'
							rowClass='cover-block-row'
							itemClass='cover-block-item'
						/>

						<div className="page-wrapper">
							<Pagination
								total={100}
								defaultCurrent={1}
								style={
									{
										borderColor: '#5B28FF'
									}
								}
								// itemRender={itemRender}
								showTotal={total => `Total ${total} games`}
								showQuickJumper
								showSizeChanger={false}
								hideOnSinglePage
								className="page"
							/>
						</div>
					</Row>
				</Form>
			</div>
		</div >
	)
};
export default CreationManagement;