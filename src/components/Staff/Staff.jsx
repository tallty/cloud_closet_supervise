{/* 员工权限管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Staff.less';

class Staff extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    return (
      <MainLayout>
        <h1>员工权限管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </MainLayout>
    );
  }
}

Staff.propTypes = {};

export default Staff;