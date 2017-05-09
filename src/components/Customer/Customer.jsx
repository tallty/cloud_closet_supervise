/* 客户管理组件 */
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Customer.less';

class Customer extends Component {

  onChange(date, dateString) {
  }

  render() {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', paddingTop: '20%' }}>
          <h1 className="dep_one">当前模块正在开发中...</h1>
        </div>
      </MainLayout>
    );
  }
}

Customer.propTypes = {};

export default Customer;
