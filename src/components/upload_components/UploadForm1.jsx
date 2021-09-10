/**
 * @author [Robert Zhao]
 * @email 
 * @create date 2021-08-27 23:32:13
 * @modify date 2021-08-27 23:32:13
 * @desc [description]
 */

import React, { Component } from 'react';

import Header from '../header_components/Header.jsx';

import "./UploadForm1.scss";

import { Layout, Input, Form, Select, Modal, Button, Upload } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

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
    const formData = new FormData();
    formData.append('file', e);
    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

const beforeUpload = ({ fileList }) => {
    return false;
}


const handleUploadRequest = (values) => {
    console.log("Form submitted", values);
}

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

    handleChange = ({ fileList }) => this.setState({ fileList });

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

//  const handleUploadRequest = (history) => {
//      const url = "http://192.168.1.13:5000/login";
//      console.log("HTTP request made towards: " + url);
//      // 第一个参数是提交的地址
//      try {
//          $.post(url,
//              {
//                  email: val_email,
//                  password: val_passw
//              },
//              function (data, status) {
//                  console.log(data);
//                  var dataObj = eval("(" + data + ")");//转换为json对象 
//                  if (dataObj.code === 200) {
//                      console.log("LOGIN SUCCESS")
//                      history.push('/');
//                      return;
//                  } else {
//                      console.log("LOGIN FAILURE")
//                      alert(dataObj.msg)
//                      message.warn('Either your <email> or <password> is incorrect', 0.6);
//                      return;
//                  }
//              }
//          ).fail(function(){message.warn('Connection to server is a failure', 0.6); if(fail_forward){history.push('/')} }); 
//      } catch (e) {
//          message.warn('Connection to server is a failure', 0.6);
//      }
//  }


const style = {
    position: 'relative',
    height: '919px',
    width: '928px',
    margin: '43px 495px 55px 497px',
    boxSizing: 'border-box',

}

class UploadForm1 extends Component {
    render() {
        return (
            <div>
                <Header />

                <div style={style}>
                    <Form
                        name="validate_other"
                        id="upload_form"
                        onFinish={handleUploadRequest}
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
                                <Input id='fileName' allowClear type='text' placeholder='File Name' style={{ marginTop: '10px', borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '#C4C4C4 3px solid', width: '422px' }} />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="cover_upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra=""
                        >
                            <div className='item'>
                                <label htmlFor='covers' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Cover Picture</label>
                                <div className='covers'>
                                    <div className='cover'>
                                        <PicturesWall style={{ float: 'left', }} />
                                        <div style={{ width: '185px', height: '128px', float: 'left' }}>
                                            <p>xxxxxx</p>
                                        </div>
                                    </div>
                                    <div className='cover'>
                                        <PicturesWall style={{ float: 'left', }} />
                                        <div style={{ width: '185px', height: '128px', float: 'left' }}>
                                            <p>xxxxxx</p>
                                        </div>
                                    </div>
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
                                <Input id='game_title' showCount maxLength={100} style={{ border: '1px solid #ABABAB', borderRadius: '5px', height: '42px', width: '925px', boxSizing: 'border-box', marginTop: '16px' }} />
                            </div>

                        </Form.Item>

                        <Form.Item
                            name="select"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please select the section!',
                                },
                            ]}
                            wrapperCol={{
                                span: 2,

                            }}
                        >
                            <div className='item'>
                                <label htmlFor='category' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Category</label>
                                <select form='upload_form' id='category' placeholder="Please select a section" style={{ width: '136px', height: '42px', boxSizing: 'border-box', border: '#ABABAB 1px solid', borderRadius: '3px', marginTop: '16px' }}>
                                    <option value="renew">Renew</option>
                                    <option value="3D">3D</option>
                                    <option value="classic">Classic</option>
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
                                <textarea id='description' form='upload_form' style={{ width: '925px', height: '255px', boxSizing: 'border-box', border: '1px solid #ABABAB', borderRadius: '8px', marginTop: '16px', padding: '8px' }}></textarea>
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
            </div >


        )
    }
}

export default UploadForm1;