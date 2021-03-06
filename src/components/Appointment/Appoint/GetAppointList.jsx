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
      appointments: [],
    }
  }

  componentWillMount() {
    this.getList('unpaid')
  }

  getList(query_State) {
    var queryStates = []
    queryStates = query_State === 'unpaid' ? ['unpaid', 'paid', 'storing'] : ['stored', 'canceled']
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments?page=1&per_page=100000`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .query({ 'query_state[]': queryStates })
      .end( (err, res) => {
        if (!err || err === null) {
          const appoints = res.body.appointments.filter((appoint) => { return appoint.created_by_admin !== true }).map(apo => apo);
          this.setState({ appointments: appoints })
        } else {
          this.setState({ appointments: [] })
        }
      })
  }

  callbackParent(key) {
    this.getList(key)
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