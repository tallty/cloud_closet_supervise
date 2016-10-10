import React, { Component, PropTypes } from 'react';
import styles from './Header.less';

class Header extends Component {
  render() {
    return (
      <div>
        <label className={styles.title}>微信|公众平台<sup className={styles.sup_beat}>Beta</sup></label>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;