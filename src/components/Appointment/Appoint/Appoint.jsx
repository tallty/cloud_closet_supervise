{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import { Tabs, Icon, Row, Col, Input, Button, Table } from 'antd';
import Appointment from '../Appointment';
import styles from './Appoint.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const height = document.body.clientHeight*0.5
const TabPane = Tabs.TabPane;

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
},{
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
},{
  title: '用户名',
  dataIndex: 'name',
  render: renderContent,
},{
  title: '电话',
  dataIndex: 'number',
  render: renderContent,
},{
  title: '订单地址',
  dataIndex: 'address',
  render: renderContent,
},{
  title: '',
  dataIndex: 's21_price',
  render: renderContent,
},{
  title: '下单时间',
  dataIndex: 'time',
  render: renderContent,
},{
  title: '',
  dataIndex: 's21_price',
  render: renderContent,
},{
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
},{
  title: '',
  dataIndex: 's21_price',
  render: renderContent,
}]

// 以及表格特殊项样式设置
const dateH = []
dateH.push(
  <Row>
    <Col span={24} className={styles.appoint_title}>
      <Col span={24} className={styles.appoint_id}>
        <label className={styles.ul_icon}>订单号：201610118835</label>
      </Col>
      <Col span={24} className={styles.user_tab}>
        <Col span={3} className={styles.img_content}>
          <label className={styles.ul_icon}><label>预约衣橱</label></label>
        </Col>
        <Col span={3} className={styles.img_content}>
          <img src="src/images/user_ava.png" alt="" className={styles.ul_icon}/><label>S</label>
        </Col>
        <Col span={4} className={styles.img_content}>
          <label className={styles.ul_icon}><label>18516590000</label></label>
        </Col>
        <Col span={4} className={styles.img_content}>
          <label className={styles.ul_icon}><label>黄浦区济南路260弄翠湖天地隽荟12栋603号 </label></label>
        </Col>
        <Col span={6} className={styles.img_content}>
          <label className={styles.ul_icon}><label>2015-6-28<br/>13:23:35</label></label>
        </Col>
        <Col span={4} className={styles.img_content}>
          <div><Button type="primary" size="small" className={styles.d_btn}>删除</Button></div>
          <div><ActiveLink to="/appoint_show"><Button type="primary" size="small" className={styles.d_btn}>查看详情</Button></ActiveLink></div>  
        </Col>
      </Col>
    </Col>
  </Row>
)
// 一级表格模拟数据
const data = [];
for (let i = 0; i < 11; i++) {
  data.push({
    key: i,
    type: dateH,
    number: `20${i}`,
    price: `20${i}`,
    store_time: `${i}个月`,
    all_price: `100${i}`,
    time: `2016-10-${i}`,
    state: `待付款`,
    action: `详情|删除`
  });
}

class Appoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
    };
  }

  callback(key) {
    console.log(key);
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel() {
    this.setState({ visible: false });
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
              <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="全部订单" key="1">
                  <Table {...this.props} columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
                </TabPane>
              </Tabs>
            </div>
          </div>
      </Appointment>
    );
  }
}

Appoint.propTypes = {};

export default Appoint;