{/* 库存管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Stock.less';

class Stock extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    return (
      <MainLayout>
        <h1>库存管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </MainLayout>
    );
  }
}

Stock.propTypes = {};

export default Stock;