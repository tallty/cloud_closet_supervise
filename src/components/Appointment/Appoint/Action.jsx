{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import { Modal } from 'antd';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './Action.less';

class Action extends Component {

  // 删除确认模态框
  warning() {
    Modal.warning({
      title: '确定删除该订单？',
      content: '订单删除将无法恢复！请知晓。。。',
    });
  }
  render() {
    return (
      <div className={styles.link_btn}>
        <ActiveLink onClick={this.showModal}>详情</ActiveLink> | <ActiveLink onClick={this.warning}>删除</ActiveLink>
      </div>
    );
  }
}

Action.propTypes = {};

export default Action;