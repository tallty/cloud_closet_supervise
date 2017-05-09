import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router'
import styles from './Header.less';

class Header extends Component {
  render() {
    return (
      <div>
        <Row className={styles.head_content}>
          <Col span={4}>
            <label className={styles.title}>&nbsp;&nbsp;乐存好衣 | <small>后台管理</small></label>
          </Col>
          <Col span={4} offset={16}>
            <Row className={styles.login_info}>
              <Col span={6}>
                <img src="src/images/logo.svg" alt="" className={styles.user_pic} />
              </Col>
              <Col span={18} className={styles.login_btn}>
                <div><label className={styles.tag}>公众号</label></div>
                <div>乐存好衣 | <Link to="/">退出</Link></div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
