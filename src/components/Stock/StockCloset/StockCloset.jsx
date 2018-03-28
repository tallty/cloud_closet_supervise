import React, { Component, PropTypes } from 'react';
import css from './StockCloset.less';
import SuperAgent from 'superagent'
import AppointShowN from '../../Appointment/Appoint/AppointShowN';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

export class StockCloset extends Component {
  state = {
    count: 1,
    id: '',
    address: '',
    name: '',
    phone: '',
  }

  componentWillMount() {
    this.setState({ count: this.props.defaultCount })
    const id = this.getQueryString('id');
    this.getList(id)
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  getList(id) {
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments/${id}`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          const apId = res.body.id
          const apAddress = res.body.address == null ? '当前地址为空，请联系客户确认！' : res.body.address
          const apName = res.body.name == null ? '当前用户姓名为空，请联系客户确认！！' : res.body.name
          const apPhone = res.body.phone
          this.setState({ id: apId, address: apAddress, name: apName, phone: apPhone })
        }
      })
  }

  render() {
    return (
      <div className={css.form_count}>
        <AppointShowN {...this.state} />
      </div>
    );
  }
}

StockCloset.defaultProps = {
  onChange: () => {},
  count: 1,
}

StockCloset.propTypes = {
  onChange: PropTypes.func,
  count: PropTypes.number,
}
