/**
 * @author Suowei Hu, Robert Zhao
 * @email suowei.h@gmail.com, vibrantrobert@gmail.com
 * @create date 2021-08-11 18:18:24
 * @modify date 2021-08-27 20:00:00
 * @desc [description]
 */

 import React,{Component} from 'react'
 
 import Header from '../header_components/Header.jsx';
 import { Upload, message } from 'antd';
 import { UploadOutlined } from '@ant-design/icons';
 
 const { Dragger } = Upload;
 
 
 
 // TODO: Read the documents and finish the remaiing upload "HTTP-Posting" stuff  
 // https://ant.design/components/upload-cn/
 
 const props = {
   className: 'uploader',
   name: 'file',
   multiple: false,
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   onChange(info) {
     const { status } = info.file;
     if (status !== 'uploading') {
       console.log(info.file, info.fileList);
     }
     if (status === 'done') {
       message.success(`${info.file.name} file uploaded successfully.`);
     } else if (status === 'error') {
       message.error(`${info.file.name} file upload failed.`);
     }
   },
   onDrop(e) {
     console.log('Dropped files', e.dataTransfer.files);
   },
 };

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-336px 0 0 -519px',height: '672px',width: '1038px'
 }
 
 
 class DragUpload extends Component {
   render() {
     return (
       <div>
         <Header />
         <div style={style}>
         <Dragger {...props} directory>
           <p className="ant-upload-drag-icon">
             <UploadOutlined />
           </p>
           <p className="ant-upload-text">Click or drag WebGL folder to this area to upload</p>
           <p className="ant-upload-hint">
             Support for a single or bulk upload. Strictly prohibit from uploading company data or other
             band files
           </p>
         </Dragger>
         </div>
       </div>
     )
   }
   
 }
 
 export default DragUpload
 