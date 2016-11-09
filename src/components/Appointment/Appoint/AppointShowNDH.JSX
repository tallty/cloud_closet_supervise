{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse } from 'antd';
import AppointShowNDC from './AppointShowNDC';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './AppointShow.less';

const Panel = Collapse.Panel
const height = document.body.clientHeight*0.56;
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

class AppointShowNDH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data2: [],
      garments: []
    };
  }

  // 删除确认模态框
  warning() {
    Modal.warning({
      title: '确定删除该订单？',
      content: '订单删除将无法恢复！请知晓。。。',
    });
  }

  date2str(x,y) { 
    var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()}; 
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))}); 
  }

  data2(garments, i, store_month, price, url){
    const num_2 = garments.length
    const data2 = []
    for (let a = 0; a < num_2; a++) {
      var garment = garments[a]
      data2.push({
        key: a,
        type: <AppointShowNDC key={-a} store_month={store_month} price={price} url={url} garment={garment}/>,
        name1: `${a}`,
        number1: `${a}`,
        address1: `${a}个月`,
        time1: `1${a}`,
        s21_price1: `2016-10-${a}`,
        s22_price1: `待付款`,
        action1: `详情`
      });
    }
    this.setState({data2: data2, garments: garments})
  }

  getList(){
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    const i = this.props.m

    var id = this.props.groups[i].id
    var store_month = this.props.groups[i].store_month
    var price = this.props.groups[i].price
    var url = this.props.groups[i].url

    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/appointment_item_groups/"+id+"/garments"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let garments = res.body.garments
          this.data2(garments, i, store_month, price, url)
        }
      })
  }

  Panel_H(){
    const i = this.props.m
    const groups = this.props.groups
    const Panel_H = []
    Panel_H.push(
      <Row key={i}>
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

  render() {  
    return (
      <div className={styles.link_btn}>
        <Collapse onChange={this.getList.bind(this)}>
          <Panel header={this.Panel_H()}>
            <Table rowKey="number" columns={columns} dataSource={this.state.data2} showHeader={false} pagination={false} scroll={{ y: height }} />
          </Panel>
        </Collapse>
      </div>
    );
  }
}

AppointShowNDH.propTypes = {};

export default AppointShowNDH;