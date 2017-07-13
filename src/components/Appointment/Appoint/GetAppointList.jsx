/**
 * 保单处理情况滚动图
 */
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import Appoint from './Appoint'
import Appointment from '../Appointment';

export class GetAppointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  componentWillMount() {
    this.getList("storing")
  }

  callbackParent(key){
    this.getList(key)
  }

  getList(query_state){
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    var token = localStorage.token
    var email = localStorage.email
    var url = `http://closet-api.tallty.com/admin/appointments?query_state=${query_state}&page=1&per_page=100000`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let appointments = res.body.appointments.filter((appoint) => { return appoint.created_by_admin !== true }).map(apo => apo);
          this.setState({ appointments: appointments })
        } else {
          this.setState({ appointments: [] })
        }
      })
  }

  render() {
    return (
      <div>
        <Appointment>
          <Appoint {...this.state} callback={this.callbackParent.bind(this)}/>
        </Appointment>
      </div>
    );
  }
}

GetAppointList.defaultProps = {
}

GetAppointList.propTypes = {
}