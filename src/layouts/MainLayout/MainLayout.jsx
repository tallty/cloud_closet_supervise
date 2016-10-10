import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header/Header';
import ActiveLink from '../ActiveLink/ActiveLink';
import styles from './MainLayout.less';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <Row>
            <ActiveLink to="/" onlyActiveOnIndex={true}>
              <Col span={24}>
                <Col span={12} className={styles.img_content}><img src="src/images/basic.svg" alt="" className={styles.ul_icon}/></Col>
                <Col span={12}>基本状态</Col>
              </Col>
            </ActiveLink>
            <ActiveLink to="/customer">
              <Col span={24}>              
                <Col span={12} className={styles.img_content}><img src="src/images/customer.svg" alt="" className={styles.ul_icon}/></Col>
                <Col span={12}>客户管理</Col>
              </Col>
            </ActiveLink>
            <ActiveLink to="/appointment">
              <Col span={24}>
                <Col span={12} className={styles.img_content}><img src="src/images/appointment.svg" alt="" className={styles.ul_icon}/></Col>
                <Col span={12}>订单管理</Col> 
              </Col>
            </ActiveLink>
            <ActiveLink to="/stock">
              <Col span={24}>
                <Col span={12} className={styles.img_content}><img src="src/images/stock.svg" alt="" className={styles.ul_icon}/></Col>
                <Col span={12}>库存管理</Col>
              </Col>
            </ActiveLink>
            <ActiveLink to="/statistics">
              <Col span={24}>
                <Col span={12} className={styles.img_content}><img src="src/images/statistics.svg" alt="" className={styles.ul_icon}/></Col>
                <Col span={12}>统计报表</Col>
              </Col>
             </ActiveLink> 
          </Row>
          {/* <ActiveLink to="/advertisement">广告管理</ActiveLink> */}
          {/* <ActiveLink to="/service">客服管理</ActiveLink> */} 
          {/* <ActiveLink to="/staff">员工权限</ActiveLink> */}
          {/* <ActiveLink to="/404">404</ActiveLink> */}
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainLayout;
