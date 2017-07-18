{/* 预约订单管理组件 */ }
import React, { Component, PropTypes } from 'react';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import { Tabs, Icon, Row, Col, Input, Button, Table, Modal, message } from 'antd';
import Appointment from '../Appointment';
import SuperAgent from 'superagent'
import styles from './Appoint.less';

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
  title: '',
  dataIndex: 's21_price',
  render: renderContent,
}, {
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
  title: '',
  dataIndex: 's22_price',
  render: renderContent,
}, {
  title: '下单时间',
  dataIndex: 'date',
  render: renderContent,
}, {
  title: '',
  dataIndex: 's23_price',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
}, {
  title: '',
  dataIndex: 's24_price',
  render: renderContent,
}]

class Appoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
    };
  }

  callbackChange(key) {
    this.setState({ activeKey: key })
    key === '1' ? this.props.callback('unpaid') : this.props.callback('paid')
  }

  showConfirm3(th, i) {
    const that = this
    confirm({
      title: '订单取消确认提醒?',
      content: '点击确认，订单取消成功，可在历史订单中查看和恢复！',
      onOk() {
        that.noSureAppoin(th, i)
      },
      onCancel() { },
    });
  }

  showConfirm2(th, i) {
    const that = this
    confirm({
      title: '订单恢复确认提醒?',
      content: '点击确认，订单恢复成功！',
      onOk() {
        that.resetAppoin(th, i)
      },
      onCancel() { },
    });
  }

  showConfirm1(th, i) {
    const that = this
    confirm({
      title: '订单删除确认提醒?',
      content: '点击确认，订单删除成功，订单将无法恢复！',
      onOk() {
        that.deleteAppoin(th, i)
      },
      onCancel() { },
    });
  }

  noSureAppoin(th, i) {
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments/${th}/cancel`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('订单取消成功！');
          this.callbackChange('1')
        } else {
          message.error('订单取消失败，当前订单状态不可操作。');
        }
      })
  }

  resetAppoin(th, i) {
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments/${th}/recover`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('订单恢复成功！');
          this.callbackChange('2')
        } else {
          message.error('订单恢复失败，当前订单状态不可操作。');
        }
      })
  }

  deleteAppoin(th, i) {
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments/${th}`
    SuperAgent
      .delete(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('订单删除成功！');
          this.callbackChange('2')
        } else {
          message.error('订单删除失败，当前订单状态不可操作。');
        }
      })
  }

  pushAppoin(that, i) {
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/appointments/${i}/stored`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('订单上架成功！');
        } else {
          message.error('订单上架失败！');
        }
      })
  }

  render() {
    const app = this.props.appointments
    const that = this
    // const url = this.GetUrlRelativePath()
    // 时间格式转换函数
    function date2str(x, y) {
      const z = {
        y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate(),
        h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()
      };
      return y.replace(/(y+|M+|d+|h+|m+|s+)/g,
        function (v) { return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2)) });
    }
    // 以及表格特殊项样式设置
    function dateH(i) {
      const url = `/appoint_show?id=${app[i].id}`
      const address = app[i].address === '' || null ? '当前地址为空，请联系客户确认！' : app[i].address
      const dateHa = [];
      dateHa.push(
        <Row key={`${i}e`}>
          <Col span={24} className={styles.appoint_title}>
            <Col span={24} className={styles.appoint_id}>
              <Col span={8}><label className={styles.ul_icon}>订单号：{app[i].seq}</label></Col>
              <Col span={3} className={styles.img_content}>
                <img src={app[i].user_avatar} alt="" className={styles.ul_icon} />
                <label>{app[i].name}</label>
              </Col>
              <Col span={5} className={styles.img_content}>
                <label className={styles.ul_icon}><label>{app[i].phone}</label></label>
              </Col>
              <Col span={8} className={styles.img_content}>
                <label className={styles.ul_icon}><label>{address}</label></label>
              </Col>
            </Col>
            <Col span={24} className={styles.user_tab}>
              <Col span={3} className={styles.img_content}>
                <label className={styles.ul_icon}><label>预约衣橱</label></label>
              </Col>
              <Col span={2} className={styles.img_content}>
                <label className={styles.ul_icon}><label>￥{app[i].rent_charge}</label></label>
              </Col>
              <Col span={2} className={styles.img_content}>
                <label className={styles.ul_icon}><label>￥{app[i].price}</label></label>
              </Col>
              <Col span={3} className={styles.img_content}>
                <label className={styles.ul_icon}><label>￥{app[i].service_cost}</label></label>
              </Col>
              <Col span={3} className={styles.img_content}>
                <label className={styles.ul_icon}><label>￥{app[i].care_cost}</label></label>
              </Col>
              <Col span={4} className={styles.img_content}>
                <label className={styles.ul_icon}><label>{app[i].date}</label></label>
              </Col>
              <Col span={4} className={styles.img_content}>
                <div><label>{date2str(new Date(app[i].created_at), 'yyyy-MM-d')}</label></div>
                <div><label>{date2str(new Date(app[i].created_at), 'hh:mm:ss')}</label></div>
              </Col>
              <Col span={3} className={styles.img_content}>
                <div>
                  {that.state.activeKey !== '1' ?
                    <Col span={24}>
                      <Button
                        onClick={that.showConfirm1.bind(that, app[i].id, 'delete')}
                        type="primary"
                        size="small"
                        className={styles.d_btn}
                      >
                        订单删除
                      </Button>
                      <Button
                        onClick={that.showConfirm2.bind(that, app[i].id, 'reset')}
                        type="primary"
                        size="small"
                        className={styles.d_btn}
                      >
                        订单恢复
                      </Button>
                    </Col>
                    :
                    <Button
                      onClick={that.showConfirm3.bind(that, app[i].id, 'noSure')}
                      type="primary"
                      size="small"
                      className={styles.d_btn}
                    >
                      订单取消
                    </Button>
                  }
                  <ActiveLink to={url}>
                    <Button type="primary" size="small" className={styles.d_btn}>查看详情</Button>
                  </ActiveLink>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
      )
      return dateHa
    }
    // 一级表格模拟数据
    const data = [];
    const num = this.props.appointments.length
    for (let i = 0; i < num; i++) {
      data.push({
        key: i,
        type: dateH(i),
      });
    }
    return (
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
            <TabPane tab="入库订单" key="1">
              <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ y: height }}
              />
            </TabPane>
            <TabPane tab="历史订单" key="2">
              <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ y: height }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

Appoint.propTypes = {};

export default Appoint;
