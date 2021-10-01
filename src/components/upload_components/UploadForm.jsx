/* eslint-disable */

// import React from 'react'
// import "./UploadForm.scss"
// import { Form, Input, Select, Row, Col, Checkbox, Button } from 'antd'
// import UserHeader from '../user/UserHeader';
// import { useState } from 'react';
// const { Option } = Select;

// const UploadForm = () => {

//     // ==============================================================

//     const [form] = Form.useForm();
//     const formItemLayout = {
//         labelCol:   { xs: { span: 24, }, sm: { span: 8, }, },
//         wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
//     };
    
//     const [title,    updateTitle]    = useState("");
//     const [category, updateCategory] = useState("");
//     const [folder,   updateFolder]   = useState("1");
//     const submitGameInfo = (values) => {
//         console.log("Title: " + title);
//         console.log("Form submitted");
//     }
    
//     // ==============================================================
    
//     return (
//         <div>
//             <UserHeader />
//             <div
//                 className="upload-container"
//             >
//                 <Form
//                     className="upload-form"
//                     // {...formItemLayout}
//                     form={form}
//                     name="game-uploader"
//                     onFinish={submitGameInfo}
//                     scrollToFirstError
//                 >
//                     <h3 className="LoginForm-Title"> Flip, {"<SLOGAN>"} </h3>
//                     <br />
//                     <div className="upload-form-flex-container">

//                         {/* 输入框的位置 */}
//                         <div className="sub-upload-container">
//                             <Form.Item
//                                 label="Game Title"
//                             >
//                                 <Input value={title} onChange={ (e)=>{ updateTitle(e.target.value); console.log("Title changed", e.target.value); }}></Input>
//                             </Form.Item>
//                             <Form.Item
//                                 label="File Name"
//                             >
//                                 <Input value={folder} onChange={ (e)=>{ updateFolder(e.target.value); console.log("Folder changed", e.target.value); }}></Input>
//                             </Form.Item>
//                             <Form.Item
//                                 label="Category"
//                             >
//                                 <Select
//                                     defaultValue="1"
//                                     value={category}
//                                     onChange={(e)=>{updateCategory(e);console.log("Category changed:", e);}}
//                                 >
//                                     <Option value="1">TYPE-1 PLACEHOLDER</Option>
//                                     <Option value="2">TYPE-2 PLACEHOLDER</Option>
//                                     <Option value="3">TYPE-3 PLACEHOLDER</Option>
//                                 </Select>
//                             </Form.Item>
//                         </div>
//                         {/* 缩略图的位置 */}
//                         <div className="sub-upload-container">
//                             <div
//                                 className="ant-form-item"
//                                 style={{ height: 144, textAlign: 'center', lineHeight: 10 }}
//                             >
//                                 <div style={{padding:10, border: "2px dashed grey"}}>
//                                     THUBMNAIL
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="sub-upload-container-comment">
//                             <div style={{height:40}}></div>
//                         </div>
//                         Comment
//                         <div className="sub-upload-container-comment">
//                             <Input.TextArea rows={10}></Input.TextArea>
//                         </div>
//                     </div>

//                     {/* <div className="sub-upload-container-large">
//                     <div style={{height:100}}></div>
//                 </div> */}
//                     {/* <div className="upload-form-flex-container">
//                     <div className="sub-upload-container-large"> 
//                     </div>
//                 </div> */}

//                     {/* 我已确认按钮 */}
//                     <Form.Item></Form.Item>
//                     {/* 提交按钮 */}
//                     <Form.Item></Form.Item>
//                 </Form>
//             </div>
//         </div>

//     )
// }
// export default UploadForm
