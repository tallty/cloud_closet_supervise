{ /* 客服管理组件 */ }
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Link } from 'react-router';
import { Tabs, Icon, Row, Col, Input, Button, Table, Modal, message } from 'antd';
import Appointment from '../Appointment';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import styles from './AppointServer.less';


const height = document.body.clientHeight - 350
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

class AppointServer extends Component {
  state = {
    deliveryData: [],
    loading: true,
  }

  columns = [{
    title: '订单类型',
    dataIndex: 'operation',
    key: 'operation',
    width: 150,
    render: (text, record) => {
      return (
        text ? <label>{text}</label> : <label>服务订单</label>
      )
    },
  }, {
    title: '订单标识',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  }, {
    title: '花费',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  }, {
    title: '服务费',
    dataIndex: 'service_cost',
    key: 'service_cost',
    width: 100,
  }, {
    title: '护理费',
    dataIndex: 'care_cost',
    key: 'care_cost',
    width: 100,
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 150,
  }];
/*, {
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => {
      return (
        <div>
          <Button type="primary" size="small" className={styles.showBtn}>
            <Link to={`/delivery_detail?id=${record.id}`}>查看详情</Link>
          </Button>
        </div>
      )
    },
  }*/
  componentWillMount() {
    this.getList()
  }

  getList() {
    this.setState({ loading: true });
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/service_orders`;
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const data = res.body.service_orders
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

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <Appointment active="/server">
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
              <TabPane tab="服务订单" key="1">
                <Table
                  scroll={{ y: height }}
                  rowKey="id"
                  columns={this.columns}
                  dataSource={this.state.deliveryData}
                  loading={this.state.loading}
                  pagination={{ pageSize: 10 }} s
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Appointment>
    );
  }
}

AppointServer.propTypes = {};

export default AppointServer;
