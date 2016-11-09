import React, { Component, PropTypes } from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './ImageUploadList.less';

export class ImageUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }],
    };
  }
 
  handleCancel() {
    this.setState({
      previewVisible: false,
    });
  }

  handleChange(info) {
    // console.log(info.file.originFileObj);
    // const fileList = this.state.fileList
    // fileList.push(
    //   info.file.originFileObj
    // )
    // this.setState({fileList:fileList})
    
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  render() {
    const props = {
      // action: '/upload.do',
      listType: 'picture-card',
      onChange: this.handleChange.bind(this),
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible: true,
        });
      },
    };
    return (
      <div className="clearfix">
        <Upload {...props} fileList={this.state.fileList}>
          <div className="ant-upload-text"><Icon type="plus" />添加</div>
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
