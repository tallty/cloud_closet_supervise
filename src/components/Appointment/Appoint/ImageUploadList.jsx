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

  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  handleChange(info) {
    const fileList = this.state.fileList
    fileList.push(
      info.file.originFileObj
    )
    this.getObjectURL(info.file.originFileObj)
    this.setState({fileList:fileList})
  }

  render() {
    const props = {
      listType: 'picture-card',
      multiple: true,
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
        <Upload {...props} fileList={this.state.fileList} >
          <div className="ant-upload-text"><Icon type="plus" />添加</div>
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
