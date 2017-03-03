{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse } from 'antd';
import AppointShowNDC from './AppointShowNDC';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './AppointShow.less';

const Panel = Collapse.Panel
const height = document.body.clientHeight * 0.56;
// 表格合并列
const renderContent = function (value, row, index) {
  const obj = {
    children: value,
    props: {},
  };
  if (index >= 0) {
    obj.props.colSpan = 0;
  }
  return obj;
}
// 一级表格定义列属性
const columns = [{
  title: '商品',
  dataIndex: 'type',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index >= 0) {
      obj.props.colSpan = 8;
    }
    return obj;
  },
}, {
  title: '名称',
  dataIndex: 'name1',
  render: renderContent,
}, {
  title: '类别',
  dataIndex: 'number1',
  render: renderContent,
}, {
  title: '数量（件）',
  dataIndex: 'address1',
  render: renderContent,
}, {
  title: '仓储时长',
  dataIndex: 'time1',
  render: renderContent,
}, {
  title: '创建时间',
  dataIndex: 's11_price1',
  render: renderContent,
}, {
  title: '仓储编号',
  dataIndex: 's12_price1',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action1',
  render: renderContent,
}]

class AppointShowNDH extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  date2str(x, y) { 
    const z = { y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) { return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2)) });
  }

  Panel_H() {
    const i = this.props.m
    const groups = this.props.groups
    const Panel_H = []
    Panel_H.push(
      <Row key={i}>
        <Col span={24} className={styles.appoint_title}>
          <Col span={24} className={styles.user_tab}>
            <Col span={4} className={styles.img_content}>
              <img src="src/images/skirt.svg" alt="" className={styles.ul_icon} />
              <label>上衣{groups[i].price}/件</label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>单价</label></label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>服务费</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{groups[i].count}</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{groups[i].store_month}个月</label></label>
            </Col>
            <Col span={4} className={styles.img_content}>
              <label className={styles.ul_icon}>
                <label>{this.date2str(new Date(groups[i].updated_at), 'yyyy-MM-dd hh:mm:ss')}</label>
              </label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>总价</label></label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <ActiveLink to="/appoint_show_detail">
                <label className={styles.ul_icon}><label>入库</label></label>
              </ActiveLink>
            </Col>
          </Col>
        </Col>
      </Row>
    )
    return Panel_H
  }

  render() {
    const data = [];
    // const num = this.props.groups.length
    const that = this
    // for (let i = 0; i < num; i++) {
      data.push({
        key: 1,
        type: that.Panel_H(),
      });
    // }
    return (
      <div className={styles.link_btn}>
        <Table rowKey="number" columns={columns} dataSource={data} showHeader={false} pagination={false} scroll={{ y: height }} />
      </div>
    );
  }
}

AppointShowNDH.propTypes = {};

export default AppointShowNDH;