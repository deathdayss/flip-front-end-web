/* eslint-disable */

/**
 * @author Yi Gu
 * @create date 2022-04-15 00:00:00
 * @modify date 2022-04-15 23:59:59
 */
import React from 'react'
import { Button, Form, Upload, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import request from 'umi-request';

import './DragUpload1.scss';
import Header from '../header_components/Header.jsx';
import { API_UPDATE_GAME } from '../../Config.js';

const history = createBrowserHistory({
  basename: '',
  forceRefresh: true
});

const { Dragger } = Upload;

const handleVersionChangeRequest = (history = null) => {
  console.log("have fun!");
}

const handle_uploadRequest = (options) => {
  const { onSuccess, onError, file, onProgress } = options;
  console.log(file);
  let formData = new FormData();
  const user = JSON.parse(localStorage.getItem('user'));
  formData.append('email', user.email);
  formData.append('password', user.password);
  formData.append('file_body', file);

  const uploadPromise = getUploadSerive(formData);
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
  return request(`${API_UPDATE_GAME}`, {
    method: "post",
    data: params,
    requestType: 'form',
  });
}

const props = {
  className: 'uploader',
  name: 'file',
  style: {
    backgroundColor: '#fff'
  },
  multiple: false,
  action: `${API_UPDATE_GAME}`,
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
  height: '672px',
  margin: '160px 441px'
}

const styleOuter = {
  // height: '100%',
  // position: 'absolute',
}

const DragUpload1 = () => {
  const history = useHistory();
  return (
    <div>
      <Header />
      <div style={styleOuter}>
        <div style={styleInner}>
          <Form
          onFinish={() => handleVersionChangeRequest(history)}
          >
            <Form.Item>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <img src='images/content/UploadSimple.svg' height='90' width='90' />
                </p>
                <p className="ant-upload-text">You can upload a new version of current game</p>

              </Dragger>
            </Form.Item>
            <p></p>
            <Form.Item style={{textAlign: 'center'}} >
              <Button
                type="primary"
                htmlType='submit'
                style={
                  {
                    backgroundColor: '#5B28FF',
                    borderColor: '#5B28FF',
                  }
                }
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default DragUpload1
