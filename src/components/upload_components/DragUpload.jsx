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
 
 const props = {
   className: 'uploader',
   name: 'file',
   style: {
     backgroundColor: '#fff'
   },
   multiple: false,
   action: 'https://68f8d248-d179-4ceb-9469-79555efa3395.mock.pstmn.io',
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
  margin: '-336px 0 0 -519px',
  boxSizing: 'inner-box',
  height: '672px',
  width: '1038px',
 }
 
 
 class DragUpload extends Component {
   render() {
     return (
       <div>
         <Header />
         <div style={style}>
         <Dragger {...props}>
           <p className="ant-upload-drag-icon">
            <img src='images/content/UploadSimple.svg' height='90' width='90' />
           </p>
           <p className="ant-upload-text">Click or drag WebGL folder to this area to upload</p>
        
         </Dragger>
         </div>
       </div>
     )
   }
   
 }
 
 export default DragUpload
 