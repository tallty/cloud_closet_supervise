{/* 客户管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Customer.less';

class Customer extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    return (
      <MainLayout>
        <h1>客户管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </MainLayout>
    );
  }
}

Customer.propTypes = {};

export default Customer;