import React, { Component } from 'react';
import css from './DeliveryDetail.less';
import { Link } from 'react-router';
import SuperAgent from 'superagent'
import { Row, Col, Button, Table, Modal, message, Breadcrumb } from 'antd';
import Appointment from '../Appointment';

class DeliveryDetail extends Component {

  state = {
    order: {},
    loading: false,
  }

  columns = [{
    title: '照片',
    dataIndex: 'cover_image',
    render: (text, record) => (
      <img src={text} alt="" className={css.table_image} />
    ),
  }, {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  }, {
    title: '存放位置',
    dataIndex: 'row_carbit_place',
    key: 'row_carbit_place',
  }, {
    title: '入库时间',
    dataIndex: 'put_in_time',
    key: 'put_in_time',
    render: (text) => <span>{text.slice(0, -10).split('T').join(' ')}</span>,
  }];

  componentWillMount() {
    this.setState({ loading: true });
    const id = this.props.location.query.id;
    SuperAgent
      .get(`http://closet-api.tallty.com/admin/delivery_orders/${id}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ order: res.body, loading: false });
        } else {
          this.setState({ order: {}, loading: false });
        }
      })
  }

  handleDelivery(record) {
    this.setState({ loading: true });
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/delivery_orders/${this.state.order.id}/send_out`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .end((err, res) => {
        if (!err || err === null) {
          this.setState({ loading: false, order: res.body });
          this.getList('paid');
          message.success('确认发货成功');
        } else {
          this.setState({ loading: false })
          message.error('确认失败，请稍后重试');
        }
      })
  }

  handleCancel(record) {
    this.setState({ loading: true });
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/delivery_orders/${this.state.order.id}/cancel`)
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

  render() {
    const { order, loading } = this.state;
    return (
      <Appointment>
        <div className={css.container}>
          <Row className={css.header}>
            <Col span={8} className={css.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={css.bread}>
                  <Link to="/distribution">配送订单</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className={css.active}>订单详情</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={16} className={css.head_right}>
              {
                order.aasm_state === 'paid' ?
                  <div>
                    <Button type="primary" onClick={this.handleDelivery.bind(this)}>确认送出</Button>
                    <Button type="danger" onClick={this.handleCancel.bind(this)}>取消订单</Button>
                  </div> : null
              }
            </Col>
          </Row>
          <div className={css.order_info}>
            <Row>
              <Col span={12}>
                <p><span>订单号：</span>{order.seq}</p>
                <p><span>订单状态：</span>{order.state}</p>
                <p><span>订单费用：</span>￥ {order.service_cost} </p>
              </Col>
              <Col span={12}>
                <p><span>联系人：</span>{order.name}</p>
                <p><span>联系电话：</span>{order.phone}</p>
                <p><span>订单地址：</span>{order.address} </p>
              </Col>
            </Row>
          </div>
          <div className={css.table}>
            <h2 className={css.table_title}>订单配送清单：</h2>
            <Table
              columns={this.columns}
              rowKey="id"
              loading={loading}
              dataSource={order.garments}
              pagination={{ pageSize: 10 }}
            />
          </div>
        </div>
      </Appointment>
    );
  }
}

export default DeliveryDetail;
