{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Table, Row, Col } from 'antd';
import Appointment from '../Appointment';
import AppointShowNDH from './AppointShowNDH';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink';
import styles from './AppointShow.less';

const height = document.body.clientHeight*0.56;
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
},{
  title: '名称',
  dataIndex: 'name1',
  render: renderContent,
},{
  title: '类别',
  dataIndex: 'number1',
  render: renderContent,
},{
  title: '数量（件）',
  dataIndex: 'address1',
  render: renderContent,
},{
  title: '仓储时长',
  dataIndex: 'time1',
  render: renderContent,
},{
  title: '创建时间',
  dataIndex: 's11_price1',
  render: renderContent,
},{
  title: '仓储编号',
  dataIndex: 's12_price1',
  render: renderContent,
},{
  title: '操作',
  dataIndex: 'action1',
  render: renderContent,
}]

class AppointShowN extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // 一级表格模拟数据
    const data = [];
    const num = this.props.groups.length
    for (let i = 0; i < num; i++) {
      data.push({
        key: i,
        type: <AppointShowNDH key={i+"a"} m={i} groups={this.props.groups}/>,
        number1: `20${i}`,
        price1: `20${i}`,
        store_time1: `${i}个月`,
        all_price1: `100${i}`,
        time1: `2016-10-${i}`,
        state1: `待付款`,
        action1: `详情|删除`
      });
    }
    return (
      <Appointment>
        <div className={styles.container}>
          <Row className={styles.header}>
            <Col span={8} className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={styles.bread}><ActiveLink to="/appoint">全部订单</ActiveLink></Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>订单详情</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={16} className={styles.head_right}>
              <label>订单号：201610118{this.props.id}</label>
              <label className={styles.address_label}>订单地址：{this.props.address} </label>
              <label>{this.props.phone}</label>
            </Col>
          </Row>
          <div className={styles.table}>
            <Row className={styles.table_head}>
              <Col span={4}>商品</Col>
              <Col span={3}>名称</Col>
              <Col span={2}>类别</Col>
              <Col span={2}>数量（件）</Col>
              <Col span={2}>仓储时长</Col>
              <Col span={4}>创建时间</Col>
              <Col span={4}>仓储编号</Col>
              <Col span={3}>操作</Col>
            </Row>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} showHeader={false} />
          </div>
        </div>
      </Appointment>
    );
  }
}

AppointShowN.propTypes = {};

export default AppointShowN;