import React, { Component, PropTypes } from 'react';
import { Upload, Icon, Modal } from 'antd';
import styles from './ImageUploadList.less';

export class ImageUploadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
  }
 
  handleCancel() {
    this.setState({
      previewVisible: false,
    });
  }

  render() {
    const props = {
      action: '/upload.do',
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }],
      onPreview: (file) => {
        this.setState({
          previewImage: file.url,
          previewVisible: true,
        });
      },
    };
    return (
      <div className="clearfix">
        <Upload {...props}>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
