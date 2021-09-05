/**
 * @author Suowei Hu
 * @email suowei.h@gmail.com
 * @create date 2021-08-11 18:18:24
 * @modify date 2021-08-11 18:18:24
 * @desc [description]
 */

import React from 'react'

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './DragUpload.scss'

const { Dragger } = Upload;

// TODO: Read the documents and finish the remaiing upload "HTTP-Posting" stuff  
// https://ant.design/components/upload-cn/

const props = {
  name: 'file',
  multiple: true,
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


function DragUpload() {
  return (
    <div className="uploader-container">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </div>
  )
}

export default DragUpload
