{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import Appointment from '../Appointment';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

class Distribution extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }
  render() {
    return (
      <Appointment>
        <h1>配送订单管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </Appointment>
    );
  }
}

Distribution.propTypes = {};

export default Distribution;