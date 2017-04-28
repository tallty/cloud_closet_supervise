import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Tabs, Icon, Row, Col, Input, Button, Table, Modal, message } from 'antd';
import Appointment from '../Appointment';
import styles from './Distribution.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const height = document.body.clientHeight - 350
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

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
  render: renderContent,
}, {
  title: '租金',
  dataIndex: 'phone',
  render: renderContent,
}, {
  title: '总价',
  dataIndex: 'phwwone',
  render: renderContent,
}, {
  title: '服务费',
  dataIndex: 'nasdsfme',
  render: renderContent,
}, {
  title: '护理费',
  dataIndex: 'ph232one',
  render: renderContent,
}, {
  title: '预约日期',
  dataIndex: 'addffffress',
  render: renderContent,
}, {
  title: '下单时间',
  dataIndex: 'date',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
}]
class Distribution extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    }
  }
  componentWillMount() {
    this.getList('paid')
  }
  getList(state) {
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    const token = localStorage.token
    const email = localStorage.email
    const url = 'http://closet-api.tallty.com/admin/delivery_orders?page=1&per_page=1000&need_garment_info=false'
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const data = res.body.delivery_orders
          this.setState({ appointments: data })
          console.log(data)
        } else {
          this.setState({ appointments: [] })
          console.log('==========接口报错===========')
        }
      })
  }
  callbackChange(key) {
    if (key === '1') {
      this.getList('paid')
    } else if (key === '2') {
      this.getList('delivering')
    } else {
      this.getList('finished')
    }
  }
  render() {
    return (
      <Appointment>
        <div className={styles.container}>
          <div >
            <Row className={styles.search}>
              <Col span={13}>
                <Input placeholder="关键字" />
              </Col>
              <Col span={4}>
                <Button type="ghost" shape="circle-outline" icon="search" />
              </Col>
            </Row>
          </div>
          <div className={styles.table}>
            <Tabs defaultActiveKey="1" onChange={this.callbackChange.bind(this)}>
              <TabPane tab="已支付订单" key="1">
                <Table
                  {...this.props}
                  columns={columns}
                  dataSource={this.appointments}
                  pagination={{ pageSize: 10 }}
                  scroll={{ y: height }}
                />
              </TabPane>
              <TabPane tab="已发出订单" key="2">
                <Table
                  {...this.props}
                  columns={columns}
                  dataSource={this.appointments}
                  pagination={{ pageSize: 10 }}
                  scroll={{ y: height }}
                />
              </TabPane>
              <TabPane tab="已完成订单" key="3">
                <Table
                  {...this.props}
                  columns={columns}
                  dataSource={this.appointments}
                  pagination={{ pageSize: 10 }}
                  scroll={{ y: height }}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Appointment>
    );
  }
}

Distribution.propTypes = {};

export default Distribution;
