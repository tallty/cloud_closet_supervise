{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import Appointment from '../Appointment';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

class Appoint extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }
  render() {
    return (
      <Appointment>
        <h1>预约管理组件</h1>
        <DatePicker onChange={this.onChange} />
      </Appointment>
    );
  }
}

Appoint.propTypes = {};

export default Appoint;