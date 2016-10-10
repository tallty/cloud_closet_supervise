{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Appointment.less';

class Appointment extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }
  render() {
    return (
      <MainLayout>
        <h1>预约订单管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </MainLayout>
    );
  }
}

Appointment.propTypes = {};

export default Appointment;