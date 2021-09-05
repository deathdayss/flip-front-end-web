import React from 'react'
import "./UploadForm.scss"
import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd'
import UserHeader from '../user/UserHeader';

const { Option } = Select;

const UploadForm = () => {
    const [form] = Form.useForm();
    const submitGameInfo = (values) => {
        console.log("Form submitted");
    }
    const formItemLayout = {
        labelCol: { xs: { span: 24, }, sm: { span: 8, }, },
        wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
    };

    return (
        <div>

            <UserHeader />
            <div
                className="upload-container"
            >
                <Form
                    className="upload-form"
                    // {...formItemLayout}
                    form={form}
                    name="game-uploader"
                    onFinish={submitGameInfo}
                    scrollToFirstError
                >
                    <h3 className="LoginForm-Title"> Flip, {"<SLOGAN>"} </h3>
                    <br />
                    <div className="upload-form-flex-container">

                        {/* 输入框的位置 */}
                        <div className="sub-upload-container">
                            <Form.Item
                                label="Game Title"
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="File Name"
                            >
                                <Input></Input>
                            </Form.Item>
                            <Form.Item
                                label="Category"
                            >
                                <Select
                                    defaultValue="1"
                                >
                                    <Option value="1">TYPE-1 PLACEHOLDER</Option>
                                    <Option value="2">TYPE-2 PLACEHOLDER</Option>
                                    <Option value="3">TYPE-3 PLACEHOLDER</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        {/* 缩略图的位置 */}
                        <div className="sub-upload-container">
                            <div
                                className="ant-form-item"
                                style={{ height: 144, textAlign: 'center', lineHeight: 10 }}
                            >THUBMNAIL</div>
                        </div>
                        <div className="sub-upload-container-comment">
                            <div style={{height:40}}></div>
                        </div>
                        Comment
                        <div className="sub-upload-container-comment">
                            <Input.TextArea rows={10}></Input.TextArea>
                        </div>
                    </div>

                    {/* <div className="sub-upload-container-large">
                    <div style={{height:100}}></div>
                </div> */}
                    {/* <div className="upload-form-flex-container">
                    <div className="sub-upload-container-large"> 
                    </div>
                </div> */}

                    {/* 我已确认按钮 */}
                    <Form.Item></Form.Item>
                    {/* 提交按钮 */}
                    <Form.Item></Form.Item>
                </Form>
            </div>
        </div>

    )
}
export default UploadForm
