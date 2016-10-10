{/* 统计报表管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Statistics.less';

class Statistics extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    return (
      <MainLayout>
        <h1>统计报表管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </MainLayout>
    );
  }
}

Statistics.propTypes = {};

export default Statistics;