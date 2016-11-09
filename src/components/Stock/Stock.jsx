{/* 库存管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Appoint from '../Appointment/Appoint/Appoint'
import styles from './Stock.less';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  componentWillMount() {
    this.getList()
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
      .field('query_state','stored')
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
      <MainLayout>
        {/*<Appoint {...this.state} />*/}
      </MainLayout>
    );
  }
}

Stock.propTypes = {};

export default Stock;