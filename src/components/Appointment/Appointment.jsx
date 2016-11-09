{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import Header from '../Header/Header';
import ActiveLinkC from '../../layouts/ActiveLinkC/ActiveLinkC';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './Appointment.less';

// 获取链接中的子域名
function GetUrlRelativePath(){
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
  if(relUrl.indexOf("?") != -1){
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

const url = GetUrlRelativePath()
const Appointment = ({ children }) => {
  return (
    <MainLayout>
      <div className={styles.normal}>
        <div className={styles.content}>
          <div className={styles.side}>
            <Row>
              <ActiveLinkC to="/distribution" onlyActiveOnIndex={true}>
                <Col span={24}>
                  配送订单
                </Col>
              </ActiveLinkC>
              <ActiveLinkC to="/appoint">
                <Col span={24}>              
                  预约订单
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

export default Appointment;
