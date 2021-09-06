/**
 * @author [Robert Zhao]
 * @email 
 * @create date 2021-08-27 23:32:13
 * @modify date 2021-08-27 23:32:13
 * @desc [description]
 */

 import React, { Component } from 'react';

 import Header from '../header_components/Header.jsx';
 
 import { Layout, Input, Form, Select, Modal, Button, Upload } from 'antd';
 
 import { PlusOutlined } from '@ant-design/icons';
 const { Option } = Select;
 const { Footer, Sider, Content } = Layout;
 
 const formItemLayout = {
     labelCol: {
         span: 6,
     },
     wrapperCol: {
         span: 14,
     },
 };
 
 const normFile = (e) => {
     console.log('Upload event:', e);
    const formData = new FormData();
    formData.append('file',e);
     if (Array.isArray(e)) {
         return e;
     }
 
     return e && e.fileList;
 };

 const beforeUpload = ({fileList}) => {
    return  false;
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
        <>
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
        </>
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
 
 

 
 class UploadForm1 extends Component {
     render() {
         return (
             <Layout>
                 <Header />
                 <Content>
                     <div>
                         <Form
                             name="validate_other"
                             {...formItemLayout}
                             onFinish={handleUploadRequest}
                             initialValues={{
                                 'input-number': 3,
                                 'checkbox-group': ['A', 'B'],
                                 rate: 3.5,
                             }}
                         >
                             <Form.Item label="File Name">
                                 <span className="ant-form-text"></span>
                             </Form.Item>
 
                             <Form.Item
                                 name="cover_upload"
                                 label="Cover"
                                 valuePropName="fileList"
                                 getValueFromEvent={normFile}
                                 extra=""
                             >
                                 <PicturesWall />
                                 
                                 <PicturesWall />
                             </Form.Item>
 
                             <Form.Item
                                 {...formItemLayout}
                                 name="title"
                                 label="Title"
                                 rules={[
                                     {
                                         required: true,
                                         message: 'Please input the title',
                                     },
                                 ]}
                             >
                                 <Input placeholder="100/100" />
                             </Form.Item>
 
                             <Form.Item
                                 name="select"
                                 label="Classification"
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
                                 <Select placeholder="Please select a section">
                                     <Option value="renew">二创</Option>
                                     <Option value="3d">三次元</Option>
                                     <Option value="classic">传统</Option>
                                 </Select>
                             </Form.Item>
 
 
                             <Form.Item
                                 {...formItemLayout}
                                 name="description"
                                 label="Description"
                                 rules={[
                                     {
                                         required: true,
                                         message: 'Please input the title',
                                     },
                                 ]}
                             >
                             <Input value = " " placeholder="100/100" />
                             </Form.Item>
 
 
 
 
                                 <Form.Item
                                     wrapperCol={{
                                         span: 12,
                                         offset: 6,
                                     }}
                                 >
                                     <Button type="primary" htmlType="submit">
                                         Submit
                                     </Button>
                                 </Form.Item>
                         </Form>
                     </div>
                 </Content>
                     <Footer>Footer</Footer>
             </Layout>
                 )
     }
 }
 
                 export default UploadForm1;