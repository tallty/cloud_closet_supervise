import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Table, Row, Col } from 'antd';
import SuperAgent from 'superagent'
import Appointment from '../Appointment';
import AppointShowNDH from './AppointShowNDH';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink';
import styles from './AppointShow.less';

const height = document.body.clientHeight - 290;
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
  title: '类别',
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
  title: '单价（￥）',
  dataIndex: 'name1',
  render: renderContent,
}, {
  title: '服务费',
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
  title: '总价',
  dataIndex: 's12_price1',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action1',
  render: renderContent,
}]

class AppointShowN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  componentWillMount() {
    const token = localStorage.token
    const email = localStorage.email
    console.log(this.props)
    const id = this.getQueryString('id')
    const url = `http://closet-api.tallty.com/admin/appointments/${id}/its_chests`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          const groupsG = res.body.admin_exhibition_chests
          this.setState({ groups: groupsG })
        } else {
          this.setState({ groups: [] })
        }
      })
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  render() {
    // 一级表格模拟数据
    const data = [];
    const groups = this.state.groups
    groups.forEach((group, i, obj) => {
      data.push({
        key: i,
        type: <AppointShowNDH key={`${i}a`} ap_id={this.getQueryString('id')} m={i} group={group} />,
      });
    })
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
              <Col span={4}>类别</Col>
              <Col span={3}>单价（￥）</Col>
              <Col span={3}>服务费</Col>
              <Col span={2}>数量（件）</Col>
              <Col span={2}>仓储时长</Col>
              <Col span={4}>创建时间</Col>
              <Col span={3}>总价</Col>
              <Col span={3}>操作</Col>
            </Row>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} showHeader={false} />
          </div>
        </div>
      </Appointment>
    );
  }
}

AppointShowN.propTypes = {
};

AppointShowN.defaultProps = {
};

export default AppointShowN;
