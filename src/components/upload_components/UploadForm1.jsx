/**
 * @author [Robert Zhao]
 * @email 
 * @create date 2021-08-27 23:32:13
 * @modify date 2021-08-27 23:32:13
 * @desc [description]
 */

import React, { Component, useState } from 'react';

import Header from '../header_components/Header.jsx';

import "./UploadForm1.scss";

import { Layout, Input, Form, Select, Modal, Button, Upload } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { message } from 'antd';
import request from 'umi-request';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 5,
    },
};

const normFile = (e) => {
    console.log('Upload event:', e);
    // const formData = new FormData();
    // formData.append('file', e);
    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

const beforeUpload = ({ fileList }) => {
    return false;
}
// =========================================================================================
// Form Upload Logic

// ============= DEPRECATED ====================
// const handleSubmitRequest = (values) => {
//     console.log(values);
//     const submit = getSubmitService(values);
//     submit.then(
//         function (value) {
//             message.info('Submit Successful', 2.0);
//         },
//         function (value) {
//             message.warn('Submit Failed', 2.0);
//         }
//     )
// }
const handleSubmitRequest = (_game_id_, _title_, _folder_, _description_, _category_) => {
    console.log('===================================');
    console.log("Uploading info of game " + _game_id_);
    console.log("Title: \t\t"    + _title_);
    console.log("Folder: \t"   + _folder_);
    console.log("Descript: \t" + _description_);
    console.log("Category: \t" + _category_);

    getInfoUploadService(_game_id_, _title_, _folder_, _description_, _category_);
    
    const comp_imgLeft = document.getElementById('IMG_LEFT');
    console.log(comp_imgLeft);
}

// ============= DEPRECATED ====================
// const DOMAIN = "http://106.52.167.166:8084";
// const url = "https://68f8d248-d179-4ceb-9469-79555efa3395.mock.pstmn.io";
// const getSubmitService = (params) => {
//     return request(`${url}`, {
//         method: "post",
//         data: params,
//         requestType: "form"
//     });
// }
const DOMAIN   = "http://106.52.167.166:8084";
const API_IMG  = `${DOMAIN}/upload/img`
const API_INFO = `${DOMAIN}/upload/`

const getImageUploadService = (_img_s_) => {
    // Notice this will return a LIST of promise
    const rtn_s = []
    for (const img in _img_s_){
        rtn_s.push(
            request(API_IMG, {
                method     : "post",
                data       : {"img" : "123"}, //TODO: REPLACE THIS WITH THE REAL IMAGE
                requestType: "form"
            }
            )
        );
    }
}
const getInfoUploadService = (_game_id_, _title_, _folder_, _description_, _category_) => {
    return request(API_INFO, {
        method: "post",
        data: {
            "gid"      : _game_id_,
            "title"    : _title_,
            "folder"   : _folder_,
            "description" : _description_,
            "category" : _category_
        },
        requestType: "form"
    });
}

// =========================================================================================
//Miniature display
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

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };
    
    //TODO: Call this handler when calls "finishes" in the main form
    handleFinish = () => {
        console.log('=================');
        console.log(this.state.fileList);
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
                    beforeUpload={beforeUpload}
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

const UploadForm1 = () => {
    const game_id = "c137"; //TODO: IMPLMENT GAME ID PASSING 
    const [title,       updateTitle]         = useState("");
    const [category,    updateCategory]      = useState("Renew");
    const [folder,      updateFolder]        = useState("");
    const [description, updateDescription]   = useState("");

    return (
        <div>
            <Header />

            <div style={style}>
                <Form
                    name="game_info_upload"
                    id="upload_form"
                    onFinish={() => handleSubmitRequest(game_id, title, folder, description, category)}
                >
                    <Form.Item
                        name="file_name"
                        wrapperCol={
                            { span: 1, }
                        }
                        rules={
                            [
                                {
                                    required: true,
                                    message: 'Please input the file name',
                                },
                            ]
                        }
                    >
                        <div className='item'>
                            <label htmlFor='fileName' style={{ fontSize: '20px', fontFamily: 'Arial' }}>File</label>
                            <Input
                                value={folder}
                                onChange={(e) => {
                                    updateFolder(e.target.value);
                                    // console.log("Folder changed: " + folder);
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

                                {/* --------------------------------------------------------------------------------------------------------- */}
                                <div className='cover'>
                                    <PicturesWall id="IMG_LEFT" style={{ float: 'left', }}/>
                                    <div style={{ width: '185px', height: '128px', float: 'left', marginRight: '100px' }}><p>xxxxxx</p></div>
                                </div>
                                <div className='cover'>
                                    <PicturesWall id="IMG_RIGHT" style={{ float: 'left', }} />
                                    <div style={{ width: '185px', height: '128px', float: 'left' }}><p>xxxxxx</p></div>
                                </div>
                                {/* --------------------------------------------------------------------------------------------------------- */}

                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the title',
                            },
                        ]}
                    >
                        <div className='item'>
                            <label htmlFor='game_title' className='title' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Title</label>
                            <Input
                                value={title}
                                onChange={(e) => {
                                    updateTitle(e.target.value);
                                    // console.log("Title changed: " + title);
                                }}
                                id='game_title' showCount maxLength={100} style={{ border: '1px solid #ABABAB', borderRadius: '5px', height: '42px', width: '925px', boxSizing: 'border-box', marginTop: '16px' }} />
                        </div>

                    </Form.Item>

                    <Form.Item
                        name="category"

                        rules={[
                            {
                                required: true,
                                message: 'Please select the section!',
                            },
                        ]}
                        initialValue="renew"
                        wrapperCol={{
                            span: 2,

                        }}
                    >
                        <div className='item'>
                            <label htmlFor='category' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Category</label>

                            <select
                                value={category}
                                onChange={
                                    (e) => {
                                        const val = e.target.value; 
                                        updateCategory(val);
                                        // console.log("Category changed:" + category);
                                        // const result = document.querySelector('.result');
                                        // console.log(result);
                                    }
                                }
                                form='upload_form' id='category' placeholder="Please select a section" style={{ width: '136px', height: '42px', boxSizing: 'border-box', border: '#ABABAB 1px solid', borderRadius: '3px', marginTop: '16px' }}>

                                <option value="renew">      Renew       </option>
                                <option value="3D">         3D          </option>
                                <option value="classic">    Classic     </option>
                            </select>

                            {/* <Select id='category' placeholder="Please select a section" style={{ width: '136px', height: '42px' }}>
                                <Option value="renew">Renew</Option>
                                <Option value="3D">3D</Option>
                                <Option value="classic">Classic</Option>
                            </Select> */}
                        </div>

                    </Form.Item>


                    <Form.Item
                        name="description"
                    >
                        <div className='item'>
                            <label htmlFor='description' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Description</label>
                            <textarea 
                                value = {description}
                                onChange = { 
                                    (e) => {
                                        updateDescription(e.target.value);
                                        // console.log("Description changed: " + description);
                                    }
                                }
                                id='description' form='upload_form' style={{ width: '925px', height: '255px', boxSizing: 'border-box', border: '1px solid #ABABAB', borderRadius: '8px', marginTop: '16px', padding: '8px' }}></textarea>
                        </div>


                    </Form.Item>




                    <Form.Item

                    >
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