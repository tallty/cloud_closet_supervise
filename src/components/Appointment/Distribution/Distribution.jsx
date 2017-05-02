import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Link } from 'react-router';
import { Tabs, Icon, Row, Col, Input, Button, Table, Modal, message } from 'antd';
import Appointment from '../Appointment';
import styles from './Distribution.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const height = document.body.clientHeight - 350
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class Distribution extends Component {
  state = {
    deliveryData: [],
    loading: true,
  }

  columns = [{
    title: '订单状态',
    dataIndex: 'state',
    key: 'id',
  }, {
    title: '订单号',
    dataIndex: 'seq',
    key: 'seq',
  }, {
    title: '收件人',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '服务费',
    dataIndex: 'service_cost',
    key: 'service_cost',
  }, {
    title: '配送方式',
    dataIndex: 'delivery_method',
    key: 'delivery_method',
  }, {
    title: '配送时间',
    dataIndex: 'delivery_time',
    key: 'delivery_time',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => {
      let value;
      if (record.aasm_state === 'paid') {
        value = [
          <Button
            type="primary"
            size="small"
            key="1"
            onClick={this.handleDelivery.bind(this, record)}
            className={styles.actionBtn}>
            确认送出
          </Button>,
          <Button
            type="primary"
            size="small"
            key="2"
            onClick={this.handleCancel.bind(this, record)}
            className={styles.actionBtn}>
            取消订单
          </Button>
        ]
      }
      return (
        <div>
          {value}
          <Button type="primary" size="small" className={styles.showBtn}>
            <Link to={`/delivery_detail?id=${record.id}`}>查看详情</Link>
          </Button>
        </div>
      )
    },
  }];

  componentWillMount() {
    this.getList('paid')
  }

  getList(state) {
    this.setState({ loading: true });
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/delivery_orders?page=1&per_page=1000&need_garment_info=false&state=${state}`;
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const data = res.body.delivery_orders
          this.setState({ deliveryData: data, loading: false })
        } else {
          this.setState({ deliveryData: [], loading: false })
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

  handleDelivery(record) {
    this.setState({ loading: true });
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/delivery_orders/${record.id}/send_out`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false });
          this.getList('paid');
        } else {
          this.setState({ loading: false })
          message.error('确认失败，请稍后重试');
        }
      })
  }

  handleCancel(record) {
    this.setState({ loading: true });
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/delivery_orders/${record.id}/cancel`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false });
          this.getList('paid');
        } else {
          this.setState({ loading: false })
          message.error('取消失败，请稍后重试');
        }
      })
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
                  rowKey="id"
                  columns={this.columns}
                  dataSource={this.state.deliveryData}
                  loading={this.state.loading}
                  pagination={{ pageSize: 10 }} s
                />
              </TabPane>
              <TabPane tab="已发出订单" key="2">
                <Table
                  rowKey="id"
                  columns={this.columns}
                  dataSource={this.state.deliveryData}
                  loading={this.state.loading}
                  pagination={{ pageSize: 10 }}
                />
              </TabPane>
              <TabPane tab="已完成订单" key="3">
                <Table
                  rowKey="id"
                  columns={this.columns}
                  dataSource={this.state.deliveryData}
                  loading={this.state.loading}
                  pagination={{ pageSize: 10 }}
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
