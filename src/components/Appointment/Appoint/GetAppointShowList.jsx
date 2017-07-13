/**
 * 保单处理情况滚动图
 */
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import AppointShowN from './AppointShowN'

const timer=0

export class GetAppointShowList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      user_id: '',
      address: '',
      name: '',
      phone: '',
      date: '',
      counts: {},
      type: 'appoints',
      adm: false,
    }
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  componentWillMount() {
    const id = this.getQueryString('id');
    this.getList(id)
  }

  componentDidMount() {
    this.timer = setInterval(this.getList.bind(this), 18000000)
  }

  componentWillUnmount() {
    clearInterval(timer)
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
          const userId = res.body.user_id
          const apId = res.body.id
          const apAddress = res.body.address == null ? '当前地址为空，请联系客户确认！' : res.body.address
          const apName = res.body.name == null ? '当前用户姓名为空，请联系客户确认！！' : res.body.name
          const apPhone = res.body.phone
          const apDate = res.body.date
          const apCounts = res.body.garment_count_info
          const admin = res.body.created_by_admin
          this.setState({ id: apId, address: apAddress, name: apName, phone: apPhone, date: apDate, counts: apCounts, user_id: userId, adm: admin })
        }
      })
  }

  render() {
    return (
      <div>
        <AppointShowN {...this.state} />
      </div>
    );
  }
}

GetAppointShowList.defaultProps = {
}

GetAppointShowList.propTypes = {
}
