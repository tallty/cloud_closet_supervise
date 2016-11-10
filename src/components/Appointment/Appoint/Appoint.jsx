{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import { Tabs, Icon, Row, Col, Input, Button, Table } from 'antd';
import Appointment from '../Appointment';
import styles from './Appoint.less';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const height = document.body.clientHeight*0.6
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
  dataIndex: 'phone',
  render: renderContent,
},{
  title: '订单地址',
  dataIndex: 'address',
  render: renderContent,
},{
  title: '',
  dataIndex: 's22_price',
  render: renderContent,
},{
  title: '下单时间',
  dataIndex: 'date',
  render: renderContent,
},{
  title: '',
  dataIndex: 's23_price',
  render: renderContent,
},{
  title: '操作',
  dataIndex: 'action',
  render: renderContent,
},{
  title: '',
  dataIndex: 's24_price',
  render: renderContent,
}]


class Appoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  callbackChange(key) {
    key == "1"?this.props.callback("storing"):this.props.callback("stored")
    console.log(key);
  }

  render() {
    const app = this.props.appointments
    // const url = this.GetUrlRelativePath()
    // 时间格式转换函数
    function date2str(x,y) { 
      var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()}; 
      return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))}); 
    }
      // 以及表格特殊项样式设置
    function dateH(i){
      const url = `/appoint_show?id=${app[i].id}`
      const address = app[i].address==""||null?'当前地址为空，请联系客户确认！':app[i].address
      console.log(app[i].address);
      const dateH = [];
      dateH.push(
        <Row key={i+"e"}>
          <Col span={24} className={styles.appoint_title}>
            <Col span={24} className={styles.appoint_id}>
              <label className={styles.ul_icon}>订单号：{app[i].seq}</label>
            </Col>
            <Col span={24} className={styles.user_tab}>
              <Col span={3} className={styles.img_content}>
                <label className={styles.ul_icon}><label>预约衣橱</label></label>
              </Col>
              <Col span={3} className={styles.img_content}>
                <img src="src/images/user_ava.png" alt="" className={styles.ul_icon}/><label>{app[i].name}</label>
              </Col>
              <Col span={4} className={styles.img_content}>
                <label className={styles.ul_icon}><label>{app[i].phone}</label></label>
              </Col>
              <Col span={4} className={styles.img_content}>
                <label className={styles.ul_icon}><label>{address}</label></label>
              </Col>
              <Col span={6} className={styles.img_content}>
                <div><label>{date2str(new Date(app[i].created_at), "yyyy-MM-d")}</label></div>
                <div><label>{date2str(new Date(app[i].created_at), "hh:mm:ss")}</label></div>
              </Col>
              <Col span={4} className={styles.img_content}>
                {/*<div><Button type="primary" size="small" className={styles.d_btn}>订单归档</Button></div>*/}
                <div><ActiveLink to={url}><Button type="primary" size="small" className={styles.d_btn}>查看详情</Button></ActiveLink></div>  
              </Col>
            </Col>
          </Col>
        </Row>
      )
      return dateH
    }
    // 一级表格模拟数据
    const data = [];
    const num = this.props.appointments.length
    for (let i = 0; i < num; i++) {
      data.push({
        key: i,
        type: dateH(i),
        phone: `20${i}`,
        address: `20${i}`,
        date: `${i}个月`,
        all_price: `100${i}`,
        time: `2016-10-${i}`,
        state: `待付款`,
        action: `详情|删除`
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
              <Table {...this.props} columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
            </TabPane>
            <TabPane tab="历史订单" key="2">
              <Table {...this.props} columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: height }} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

Appoint.propTypes = {};

export default Appoint;