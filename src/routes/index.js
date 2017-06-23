import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory, withRouter } from 'react-router';
import wrapApp from '../components/App';
import Customer from '../components/Customer/Customer';
import Advertisement from '../components/Advertisement/Advertisement';
import Appointment from '../components/Appointment/Appointment';
import Distribution from '../components/Appointment/Distribution/Distribution';
import AppointServer from '../components/Appointment/AppointServer/AppointServer';
import DeliveryDetail from '../components/Appointment/Distribution/DeliveryDetail';
import { GetAppointList } from '../components/Appointment/Appoint/GetAppointList';
import AppointShowNDC from '../components/Appointment/Appoint/AppointShowNDC';
import { GetAppointShowList } from '../components/Appointment/Appoint/GetAppointShowList';

import Service from '../components/Service/Service';
import Stock from '../components/Stock/Stock';
import { GetList } from '../components/list/GetList';
import Statistics from '../components/Statistics/Statistics';
import Staff from '../components/Staff/Staff';

import NotFound from '../components/NotFound';

export class Routes extends Component {
  requireAuth() {
    if (localStorage.authentication_token === undefined) {
      const url = location.host;
      window.location.href = 'http://closet-admin.tallty.com/';
    }
  }
  render() {
    return (
      <Router history={this.props.history}>
        {/* 配置基本状态路由 */}
        <Route path="/" component={wrapApp} />
        {/* 配置基本管理路由 */}
        <Route path="/basic" component={Customer} />
        {/* 配置客户管理路由 */}
        <Route path="/customer" component={Customer} />
        {/* 配置广告管理路由 */}
        <Route path="/advertisement" component={Advertisement} />
        {/* 配置订单管理路由 */}
        <Route path="/appointment" component={Appointment} />
        {/* 配置订单配送管理路由 */}
        <Route path="/distribution" component={Distribution} />
        {/* 配送订单详情 */}
        <Route path="/delivery_detail" component={DeliveryDetail} />
        {/* 配置订单预约管理路由 */}
        <Route path="/appoint" component={GetAppointList} />
        {/* 配置服务订单管理路由 */}
        <Route path="/server" component={AppointServer} />
        {/* 配置订单预约详情管理路由 */}
        <Route path="/appoint_show" component={GetAppointShowList} />
        {/* 配置订单上架管理路由 */}
        <Route path="/appoint_show_detail" component={AppointShowNDC} />
        {/* 配置客服管理路由 */}
        <Route path="/service" component={Service} />
        {/* 配置库存管理路由 */}
        <Route path="/stock" component={Stock} />
        {/* 配置库存管理路由 */}
        <Route path="/list" component={GetList} />
        {/* 配置统计报表路由 */}
        <Route path="/statistics" component={Statistics} />
        {/* 配置员工权限路由 */}
        <Route path="/staff" component={Staff} />
        {/* 配置不存在路由跳转页面路由 */}
        <Route path="*" component={NotFound} />
      </Router>
    )
  }
}

Routes.propTypes = {
  history: PropTypes.any,
};
