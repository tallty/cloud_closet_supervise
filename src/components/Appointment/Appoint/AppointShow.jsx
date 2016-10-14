{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse } from 'antd';
import Appointment from '../Appointment';
import { PostPicModal } from './PostPicModal';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './AppointShow.less';

const height = document.body.clientHeight*0.5;
const Panel = Collapse.Panel
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
  dataIndex: 'name',
  render: renderContent,
},{
  title: '类别',
  dataIndex: 'number',
  render: renderContent,
},{
  title: '数量（件）',
  dataIndex: 'address',
  render: renderContent,
},{
  title: '仓储时长',
  dataIndex: 'time',
  render: renderContent,
},{
  title: '创建时间',
  dataIndex: 's11_price',
  render: renderContent,
},{
  title: '仓储编号',
  dataIndex: 's12_price',
  render: renderContent,
},{
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
}]

const dateC = []
dateC.push(
  <Row>
    <Col span={24} className={styles.appoint_title_c}>
      <Col span={24} className={styles.user_tab}>
        <Col span={4} className={styles.img_content}>
          <img src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>
        </Col>
        <Col span={3} className={styles.img_content}>
          <label className={styles.ul_icon}><label>D201608988867</label></label>
        </Col>
        <Col span={2} className={styles.img_content}>
          <label className={styles.ul_icon}><label>春夏</label></label>
        </Col>
        <Col span={2} className={styles.img_content}>
          <label className={styles.ul_icon}><label>1</label></label>
        </Col>
        <Col span={4} offset={6} className={styles.img_content}>
          <label className={styles.ul_icon}><label>10-7-5</label></label>
        </Col>
        <Col span={3} className={styles.img_content}>
          <label className={styles.ul_icon}><PostPicModal /></label>
        </Col>
      </Col>
    </Col>
  </Row>
)

const data2 = [];
for (let i = 0; i < 11; i++) {
  data2.push({
    key: i,
    type: dateC,
    name: `${i}`,
    number: `${i}`,
    address: `${i}个月`,
    time: `1${i}`,
    s21_price: `2016-10-${i}`,
    s22_price: `待付款`,
    action: `详情`
  });
}

const Panel_H = []
Panel_H.push(
  <Row>
    <Col span={24} className={styles.appoint_title}>
      <Col span={24} className={styles.user_tab}>
        <Col span={4} className={styles.img_content}>
          <img src="src/images/skirt.svg" alt="" className={styles.ul_icon}/><label>上衣10/件</label>
        </Col>
        <Col span={2} offset={3} className={styles.img_content}>
          <label className={styles.ul_icon}><label>春夏</label></label>
        </Col>
        <Col span={2} className={styles.img_content}>
          <label className={styles.ul_icon}><label>10</label></label>
        </Col>
        <Col span={2} className={styles.img_content}>
          <label className={styles.ul_icon}><label>三个月</label></label>
        </Col>
        <Col span={4} className={styles.img_content}>
          <label className={styles.ul_icon}><label>2015-6-28 13:23:35</label></label>
        </Col>
      </Col>
    </Col>
  </Row>
)

// 以及表格特殊项样式设置
const dateH = []
dateH.push(
  <Collapse>
    <Panel header={Panel_H} key="1">
      <Table rowKey="number" columns={columns} dataSource={data2} showHeader={false} pagination={false} scroll={{ y: height }} />
    </Panel>
  </Collapse>
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

class AppointShow extends Component {
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
          <div>
            <Breadcrumb>
              <Breadcrumb.Item><ActiveLink to="/appoint">全部订单</ActiveLink></Breadcrumb.Item>
              <Breadcrumb.Item>订单详情</Breadcrumb.Item>
            </Breadcrumb>
            <div className={styles.head_right}>
              <label>订单号：2015628835</label><label>订单地址：黄浦区济南路260弄翠湖天地隽荟12栋603号 </label><label>18675346566</label>
            </div>
          </div>
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

AppointShow.propTypes = {};

export default AppointShow;