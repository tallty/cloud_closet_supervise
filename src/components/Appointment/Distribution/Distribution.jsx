import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import Appointment from '../Appointment';
import styles from './Distribution.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

class Distribution extends Component {

  onChange(date, dateString) {
    // console.log(date, dateString);
  }
  render() {
    return (
      <Appointment>
        <div style={{ textAlign: 'center', paddingTop: '20%' }}>
          <h1 className="dep_one">配送订单管理组件</h1>
          <p className="dep_two">当前模块正在开发中，敬请期待！</p>
        </div>
      </Appointment>
    );
  }
}

Distribution.propTypes = {};

export default Distribution;
