{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse } from 'antd';
import SuperAgent from 'superagent';
import Appointment from '../Appointment';
import { PostPicModal } from './PostPicModal';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './AppointShow.less';

const height = document.body.clientHeight*0.56;
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

class AppointShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      garments: []
    };
  }

  date2str(x,y) { 
    var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()}; 
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))}); 
  }

  getList(i){
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/appointment_item_groups/"+i+"/garments"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let garments = res.body.garments
          this.setState({ garments: garments })
        }
      })
  }

  dateC(a){
    const garment = this.state.garments[a];
    const dateC = [];
    dateC.push(
      <Row key={a+"d"}>
        <Col span={24} className={styles.appoint_title_c}>
          <Col span={24} className={styles.user_tab}>
            <Col span={4} className={styles.img_content}>
              <img src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>D20160898</label></label>
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
              <label className={styles.ul_icon}>
                <PostPicModal />
              </label>
            </Col>
          </Col>
        </Col>
      </Row>
    )
    return dateC
  }

  Panel_H(i){
    const groups = this.props.groups
    const Panel_H = []
    Panel_H.push(
      <Row key={i+"b"}>
        <Col span={24} className={styles.appoint_title}>
          <Col span={24} className={styles.user_tab}>
            <Col span={4} className={styles.img_content}>
              <img src="src/images/skirt.svg" alt="" className={styles.ul_icon}/><label>上衣{groups[i].price}/件</label>
            </Col>
            <Col span={2} offset={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>春夏</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{groups[i].count}</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{groups[i].store_month}个月</label></label>
            </Col>
            <Col span={4} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{this.date2str(new Date(groups[i].updated_at), "yyyy-MM-dd hh:mm:ss")}</label></label>
            </Col>
            <Col span={3} offset={4} className={styles.img_content}>
              <label className={styles.ul_icon}><label>入库</label></label>
            </Col>
          </Col>
        </Col>
      </Row>
    )
    return Panel_H
  }

  data2(i){
    const data2 = [];
    const num_2 = this.props.groups[i].count
    for (let a = 0; a < num_2; a++) {
      data2.push({
        key: a,
        type: this.dateC(a),
        name1: `${a}`,
        number1: `${a}`,
        address1: `${a}个月`,
        time1: `1${a}`,
        s21_price1: `2016-10-${a}`,
        s22_price1: `待付款`,
        action1: `详情`
      });
    }
    return data2
  }

  // 以及表格特殊项样式设置
  dateH(i){
    const id = this.props.groups[i].id
    const dateH = []
    dateH.push(
      <Collapse key={i+"c"} onChange={this.getList.bind(this, id)}>
        <Panel header={this.Panel_H(i)} key={i}>
          <Table rowKey="number" columns={columns} dataSource={this.data2(i)} showHeader={false} pagination={false} scroll={{ y: height }} />
        </Panel>
      </Collapse>
    )
    return dateH
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
    // 一级表格模拟数据
    const data = [];
    const num = this.props.groups.length
    for (let i = 0; i < num; i++) {
      data.push({
        key: i,
        type: this.dateH(i),
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

AppointShow.propTypes = {};

export default AppointShow;