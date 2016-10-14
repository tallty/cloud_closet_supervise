{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Row, Col, Modal, Button } from 'antd';
import { ImageUploadList } from './ImageUploadList';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './PostPicModal.less';

export class PostPicModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }
  // 删除确认模态框
  warning() {
    Modal.warning({
      title: '确定删除该订单？',
      content: '订单删除将无法恢复！请知晓。。。',
    });
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  render() {
    const title = []
    title.push(
      <div className={styles.modal_title}>编辑入库信息</div>
    )
    return (
      <div className={styles.link_btn}>
        <ActiveLink onClick={this.showModal.bind(this)}>详情</ActiveLink> | <ActiveLink onClick={this.warning}>删除</ActiveLink>
        <Modal
          width="60vw"
          style={{ top: 40 }}
          visible={this.state.visible}
          title={title}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
              提交
            </Button>,
          ]}
        >
          <Row className={styles.modal_content}>
            <Col span={8} className={styles.left_pic_add}>
              <img src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={24}>名称  D201610087768</Col>
                <Col span={24}>
                  <Col span={12}>
                    <div>类别：春夏</div>
                    <div>单价：10/件</div>
                  </Col>
                  <Col span={12}>
                    <div>衣服仓储编号：排 柜 位</div>
                    <div>仓储时长：三个月</div>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col span={24}>细节描述图片</Col>
                <Col span={24}>
                  <ImageUploadList />
                </Col>
              </Row>
              <Row>
                <Col span={24}>描述</Col>
                <Col span={24}>
                  
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

PostPicModal.propTypes = {};