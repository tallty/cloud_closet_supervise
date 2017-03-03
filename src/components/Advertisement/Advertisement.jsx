{/* 广告管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Advertisement.less';

class Advertisement extends Component {

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    return (
      <MainLayout>
        <h1>广告管理组件</h1>
        <p>当前模块正在开发中，敬请期待！</p>
      </MainLayout>
    );
  }
}

Advertisement.propTypes = {};

export default Advertisement;