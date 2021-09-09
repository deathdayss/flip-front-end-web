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
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;
const { Footer, Sider, Content } = Layout;

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
    console.log("Form submitted");
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
            <div style={{ float: 'left', marginRight: '264px' }}>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={beforeUpload}
                >
                    {fileList.length > 1 ? null : uploadButton}
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
    border: '1px solid',
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
                        onFinish={handleUploadRequest}
                        initialValues={{
                            'input-number': 3,
                            'checkbox-group': ['A', 'B'],
                            rate: 3.5,
                        }}
                    >
                        <Form.Item
                            wrapperCol={
                                { span: 1, }
                            }
                        >
                            <div className='item'>
                                <label for='fileName' style={{ fontSize: '20px', fontFamily: 'Arial' }}>File</label>
                                <Input id='fileName' suffix={<span style={{ color: '#9E9E9E' }}>x</span>} type='text' placeholder='File Name' required='required' style={{ borderTop: '0px', borderLeft: '0px', borderRight: '0px', borderBottom: '#C4C4C4 3px solid', width: '422px' }} />
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="cover_upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra=""
                        >
                            <div className='item'>
                                <label for='covers' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Cover Picture</label>
                                <div id='covers'>
                                    <PicturesWall style={{ float: 'left', }} />
                                </div>
                                <div id='covers'>
                                    <PicturesWall style={{ float: 'left', }} />
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
                                <label for='game_title' className='title' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Title</label>
                                <Input id='game_title' placeholder="100/100" />
                            </div>

                        </Form.Item>

                        <Form.Item
                            name="select"
                            hasFeedback
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
                                <label for='category' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Category</label>
                                <Select id='category' placeholder="Please select a section">
                                    <Option value="renew">二创</Option>
                                    <Option value="3d">三次元</Option>
                                    <Option value="classic">传统</Option>
                                </Select>
                            </div>

                        </Form.Item>


                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the title',
                                },
                            ]}
                        >
                            <div className='item'>
                                <label for='description' style={{ fontSize: '20px', fontFamily: 'Arial' }}>Description</label>
                                <TextArea id='description' maxlength='100' placeholder="100/100" cols='30' rows='8'></TextArea>
                            </div>


                        </Form.Item>




                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
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