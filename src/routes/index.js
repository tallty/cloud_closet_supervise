import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import App from '../components/App';

import Customer from '../components/Customer/Customer';
import Advertisement from '../components/Advertisement/Advertisement';
import Appointment from '../components/Appointment/Appointment';
    import Distribution from '../components/Appointment/Distribution/Distribution';
    import Appoint from '../components/Appointment/Appoint/Appoint';
import Service from '../components/Service/Service';
import Stock from '../components/Stock/Stock';
import Statistics from '../components/Statistics/Statistics';
import Staff from '../components/Staff/Staff';

import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    {/* 配置基本状态路由 */}
    <Route path="/" component={App} />
    {/* 配置客户管理路由 */}
    <Route path="/customer" component={Customer} />
    {/* 配置广告管理路由 */}
    <Route path="/advertisement" component={Advertisement} />
    {/* 配置订单管理路由 */}
    <Route path="/appointment" component={Appointment} />
        {/* 配置订单配送管理路由 */}
        <Route path="/distribution" component={Distribution}/>
        {/* 配置订单预约管理路由 */}
        <Route path="/appoint" component={Appoint}/>
    {/* 配置客服管理路由 */}
    <Route path="/service" component={Service} />
    {/* 配置库存管理路由 */}
    <Route path="/stock" component={Stock} />
    {/* 配置统计报表路由 */}
    <Route path="/statistics" component={Statistics} />
    {/* 配置员工权限路由 */}
    <Route path="/staff" component={Staff} />
    {/* 配置不存在路由跳转页面路由 */}
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
