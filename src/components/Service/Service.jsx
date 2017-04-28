{/* 客服管理组件 */}
import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Service.less';

class Service extends Component {

  onChange(date, dateString) {
  }

  render() {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', paddingTop: '20%' }}>
          <h1 className="dep_one">客服管理组件</h1>
          <p className="dep_two">当前模块正在开发中，敬请期待！</p>
        </div>
      </MainLayout>
    );
  }
}

Service.propTypes = {};

export default Service;