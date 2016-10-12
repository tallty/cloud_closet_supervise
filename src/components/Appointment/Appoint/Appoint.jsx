{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import { Tabs, Icon, Row, Col, Input, Button, Table } from 'antd';
import Appointment from '../Appointment';
import styles from './Appoint.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const height = document.body.clientHeight*0.5
const TabPane = Tabs.TabPane;

const number = []
number.push(
  <Row>
    <Col span={24} className={styles.type_clo}>
      <Col span={4} >
        <img src="src/images/t_shirt.svg" alt="" className={styles.ul_icon}/>
      </Col>
      <Col span={14}>
        <label className={styles.number}><label>上衣</label><label>10/件</label></label>
      </Col>
    </Col>
  </Row>
)

const action = []
action.push(
  <div className={styles.link_btn}>
    <ActiveLink to="">详情</ActiveLink> | <ActiveLink to="">删除</ActiveLink>
  </div>
)

const data1 = [];
for (let i = 23; i < 27; i++) {
  data1.push({
    key: i,
    type: `预约衣橱`,
    s_price: number,
    number: `${i}件`,
    price: `2${i}`,
    store_time: `${i}个月`,
    all_price: `10${i}`,
    time: `2016-10-${i}`,
    state: `待付款`,
    action: action
  });
}

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

const columns = [{
  title: '',
  dataIndex: 's21_price',
  render: renderContent,
},{
  title: '类型',
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
  title: '',
  dataIndex: 's1_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's2_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's3_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's4_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's5_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's6_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's7_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's8_price',
  render: renderContent,
},{
  title: '单价(￥)',
  dataIndex: 's0_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's9_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's10_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's11_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's24_price',
  render: renderContent,
},{
  title: '数量',
  dataIndex: 'number',
  render: renderContent,
},{
  title: '服务费',
  dataIndex: 'price',
  render: renderContent,
},{
  title: '仓储时间',
  dataIndex: 'store_time',
  render: renderContent,
},{
  title: '',
  dataIndex: 's22_price',
  render: renderContent,
},{
  title: '总价',
  dataIndex: 'all_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's12_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's20_price',
  render: renderContent,
},{
  title: '下单时间',
  dataIndex: 'time',
  render: renderContent,
},{
  title: '',
  dataIndex: 's13_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's14_price',
  render: renderContent,
},{
  title: '状态',
  dataIndex: 'state',
  render: renderContent,
},{
  title: '',
  dataIndex: 's23_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's15_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's16_price',
  render: renderContent,
},{
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
},{
  title: '',
  dataIndex: 's17_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's18_price',
  render: renderContent,
},{
  title: '',
  dataIndex: 's19_price',
  render: renderContent,
}]

const columns1 = [{
  title: '类型',
  dataIndex: 'type',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = data1.length;
    }
    if (index > 0) {
      obj.props.rowSpan = 0;
    }
    return obj;
  },
},{
  title: '单价(￥)',
  dataIndex: '',
},{
  title: '单价(￥)',
  dataIndex: '',
},{
  title: '单价(￥)',
  dataIndex: '',
},{
  title: '单价(￥)',
  dataIndex: '',
},{
  title: '单价(￥)',
  dataIndex: 's_price',
}, {
  title: '数量',
  dataIndex: 'number',
}, {
  title: '服务费',
  dataIndex: 'price',
}, {
  title: '仓储时间',
  dataIndex: 'store_time',
}, {
  title: '总价',
  dataIndex: 'all_price',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = data1.length;
    }
    if (index > 0) {
      obj.props.rowSpan = 0;
    }
    return obj;
  },
}, {
  title: '下单时间',
  dataIndex: 'time',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = data1.length;
    }
    if (index > 0) {
      obj.props.rowSpan = 0;
    }
    return obj;
  },
}, {
  title: '状态',
  dataIndex: 'state',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = data1.length;
    }
    if (index > 0) {
      obj.props.rowSpan = 0;
    }
    return obj;
  },
}, {
  title: '操作',
  dataIndex: 'action',
  render(value, row, index) {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 0) {
      obj.props.rowSpan = data1.length;
    }
    if (index > 0) {
      obj.props.rowSpan = 0;
    }
    return obj;
  },
},{
  title: '单价(￥)',
  dataIndex: '',
}]


const dateH = []
dateH.push(
  <Row>
    <Col span={24} className={styles.appoint_title}>
      <Col span={4} className={styles.img_content}>
        <label className={styles.ul_icon}>订单号：201610118835</label>
      </Col>
      <Col span={4} offset={1} className={styles.user_tab}>
        <Col span={8} className={styles.img_content}>
          <img src="src/images/user_ava.png" alt="" className={styles.ul_icon}/>
        </Col>
        <Col span={16} className={styles.img_content}>
          <label className={styles.ul_icon}><label>S</label><label>18516590000</label></label>
        </Col>
      </Col>
    </Col>
    <Col span={24}>
      <Table columns={columns1} dataSource={data1} pagination={false} showHeader={false} />
    </Col>
  </Row>
)

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
    };
  }

  callback(key) {
    console.log(key);
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
                <TabPane tab="全部" key="1">
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
                </TabPane>
                <TabPane tab="待付款" key="2">
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
                </TabPane>
                <TabPane tab="待退款" key="3">
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
                </TabPane>
                <TabPane tab="待入库" key="4">
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
                </TabPane>
                <TabPane tab="待确定" key="5">
                  <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
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