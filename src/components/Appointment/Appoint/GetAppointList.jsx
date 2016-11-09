/**
 * 保单处理情况滚动图
 */
import React, { Component, PropTypes } from 'react'
import SuperAgent from 'superagent'
import Appoint from './Appoint'
import Appointment from '../Appointment';

const timer=0
export class GetAppointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  componentWillMount() {
    this.getList()
  }

  componentDidMount() {
    this.timer = setInterval(this.getList.bind(this), 18000000)
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  getList(){
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/appointments?page=1&per_page=100000"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .field('query_state','storing')
      .end( (err, res) => {
        if (!err || err === null) {
          let appointments = res.body.appointments
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
          <Appoint {...this.state} />
        </Appointment>
      </div>
    );
  }
}

GetAppointList.defaultProps = {
}

GetAppointList.propTypes = {
}