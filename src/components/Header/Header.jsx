import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'antd';
import styles from './Header.less';

class Header extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <label className={styles.title}>微信|公众平台<sup className={styles.sup_beat}>Beta</sup></label>
          </Col>
          <Col span={4} offset={16}>
            <Row className={styles.login_info}>
              <Col span={6}>
                <img src="src/images/user_pic.png" alt="" className={styles.user_pic}/>
              </Col>
              <Col span={18} className={styles.login_btn}>
                <div><label className={styles.tag}>公众号</label></div>
                <div>乐存·Chest<sup>+1</sup> | 退出</div>
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