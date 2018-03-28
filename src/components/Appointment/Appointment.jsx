import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import { withRouter } from 'react-router';
import Header from '../Header/Header';
import ActiveLinkC from '../../layouts/ActiveLinkC/ActiveLinkC';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Appointment.less';

// 获取链接中的子域名
function getUrlRelativePath() {
  const url = document.location.toString();
  const arrUrl = url.split('//');
  const start = arrUrl[1].indexOf('/');
  let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0];
  }
  return relUrl;
}

const url = getUrlRelativePath()
const Appointment = ({ children, active }) => {
  return (
    <MainLayout active1={active}>
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.side}>
            <Row>
              <ActiveLinkC to="/appoint">
                <Col span={24}>
                  预约订单
                </Col>
              </ActiveLinkC>
              <ActiveLinkC to="/distribution">
                <Col span={24}>
                  配送订单
                </Col>
              </ActiveLinkC>
              <ActiveLinkC to="/server">
                <Col span={24}>
                  服务订单
                </Col>
              </ActiveLinkC>
            </Row>
          </div>
          <div className={styles.main}>
            {children}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

Appointment.propTypes = {
};

export default withRouter(Appointment);
