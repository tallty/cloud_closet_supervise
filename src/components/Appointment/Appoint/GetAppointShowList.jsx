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
      groups: [],
      id: '',
      address: '',
      name: '',
      phone: '',
    }
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  componentWillMount() {
    const id = this.getQueryString("id");
    this.getList(id)
  }

  componentDidMount() {
    this.timer = setInterval(this.getList.bind(this), 18000000)
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  getList(id){
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    var token = localStorage.token
    var email = localStorage.email
    var url = `http://closet-api.tallty.com/admin/appointments/${id}/appointment_item_groups`
    console.log(url);
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let groups = res.body.appointment_item_groups
          this.setState({ groups: groups }) 
        }
      })

    var url = `http://closet-api.tallty.com/admin/appointments/${id}`
    console.log(url);
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let id = res.body.id
          let address = res.body.address.length == 0 ? '当前地址为空，请联系客户确认！':res.body.address
          let name = res.body.name == null ? '当前用户姓名为空，请联系客户确认！！':res.body.name
          let phone = res.body.phone
          this.setState({ id: id, address: address, name: name, phone: phone }) 
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