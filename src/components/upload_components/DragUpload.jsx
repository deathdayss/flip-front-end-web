/* eslint-disable */

/**
 * @author Suowei Hu, Robert Zhao
 * @email suowei.h@gmail.com, vibrantrobert@gmail.com
 * @create date 2021-08-11 18:18:24
 * @modify date 2021-08-27 20:00:00
 * @desc [description]
 */

import React, { Component } from 'react'

import Header from '../header_components/Header.jsx';
import { Upload, message } from 'antd';

import { createBrowserHistory } from 'history';

import request from 'umi-request';

const history = createBrowserHistory({
  basename: '',
  forceRefresh: true
});

const { Dragger } = Upload;

const API_UPLOAD = "http://106.52.167.166:8084/v1/upload/game";//"https://68f8d248-d179-4ceb-9469-79555efa3395.mock.pstmn.io";//

const handle_uploadRequest = (options) => {
  const { onSuccess, onError, file, onProgress } = options;
  console.log(file);
  let formData = new FormData();
  formData.append('email', "my_name_is_noBody@example.com");
  formData.append('password', "123");
  formData.append('file_body', file);

  const uploadPromise = getUploadSerive(formData);//{ email: "my_name_is_noBody@example.com",password: "123",file_body: file}
  uploadPromise.then(
    function (value) {
      message.success(`${file.name} uploaded successfully.`);
      console.log(JSON.stringify(value));
      onSuccess(value.status, file);
      history.push(`/upload_form?id=${value.ID}`);
    },
    function (value) {
      console.log('Upload failture');
      message.warn('Check your network and try again', 2.0);
    }
  )
}

const getUploadSerive = (params) => {
  return request(`${API_UPLOAD}`, {
    method: "post",
    data: params,
    requestType: 'form',
    // headers:{'Content-Type': 'multipart/form-data'}
  });
}

const props = {
  className: 'uploader',
  name: 'file',
  style: {
    backgroundColor: '#fff'
  },
  multiple: false,
  action: `${API_UPLOAD}`,
  customRequest: handle_uploadRequest,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      // message.success(`${info.file.name} file uploaded successfully.`);
      // history.push('/upload_form', { id: '123' });

    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const styleInner = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // margin: '-336px 0 0 -519px',
  // // boxSizing: 'inner-box',
  height: '672px',
  margin: '160px 441px'
  // // maxHeight: '672px',
  // width: '1038px',
  // maxWidth: '1038px',

}

const styleOuter = {
  // height: '100%',
  // position: 'absolute',
}



const DragUpload = () => {

  return (
    <div>
      <Header />
      <div style={styleOuter}>
        <div style={styleInner}>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <img src='images/content/UploadSimple.svg' height='90' width='90' />
            </p>
            <p className="ant-upload-text">Click or drag WebGL compressed file(.zip) to this area to upload</p>

          </Dragger>
        </div>
      </div>
    </div>
  )


}

export default DragUpload
