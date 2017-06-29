{/* 库存管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Link, withRouter } from 'react-router'
import { Row, Col, Button, Table, Modal, Tag, Radio, message, InputNumber } from 'antd';
import { UserInfo } from './user_info/UserInfo';
import { ClothesTable } from './clothes_table/ClothesTable';
import { ClosetKinds } from './warehouse/ClosetKinds';
import { CountEditer } from './warehouse/CountEditer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Appoint from '../Appointment/Appoint/Appoint'
import styles from './Stock.less';

const height = document.body.clientHeight - 260
const width = document.body.clientWidth - 260
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// 记录点击表格条目的对象
const editItem = {
  index: null,
  item: null,
};
// 入库列表操作事件类别：
const NEW = 'new';
const EDIT = 'edit';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      uInfo: {},
      ModalText: [],
      visible: false,
      appointment: null,      // 【Data】服务的订单对象
      types: [],              // 【Data】所有衣服类型
      object: {},
      grop: [],
      care_cost: 0,
      service_cost: 0,
      remark: '空',
      allPrice: 0,
    }
  }

  componentWillMount() {
    this.getList()
    this.getTypes();
  }

  getList() {
    // var token = 'wgRrN_1yUzQhe3SAbDkx'
    // var email = 'admin@tallty.com'
    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/users?page=1&per_page=100000"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const users = res.body.users
          this.setState({ users: users })
        } else {
          this.setState({ users: [] })
        }
      })
  }

  /**
   * [onLengthChange 改变仓储时长]
   * @param  {[node]} e [选择的radio按钮]
   */
  onLengthChange(e) {
    const obj = this.state.object;
    obj.store_month = parseInt(e.target.value, 10);
    this.setState({ object: obj });
  }

  /**
   * [handleCountChange] 处理数量改变
   */
  handleCountChange(count) {
    const obj = this.state.object;
    obj.count = count;
    this.setState({ object: obj });
  }

  /**
   * [getTypes 获取衣服种类的列表]
   */
  getTypes() {
    SuperAgent
      .get('http://closet-api.tallty.com/worker/price_systems')
      .set('Accept', 'application/json')
      .set('X-Worker-Token', '5DRnB4zrGeLkrkRsK92X')
      .set('X-Worker-Phone', '12312312311')
      .end((err, res) => {
        if (!err || err === null) {
          const data = res.body.price_systems;
          this.setState({ types: data });
        } else {
          this.setState({ types: [] });
        }
      })
  }
  /**
   * [showModal 弹出新增服务订单模态框]
   */
  showModal = (userInfo) => {
    this.setState({
      visible: true,
      uInfo: userInfo,
    });
  }
  /**
   * [goStock 弹出新增服务订单模态框]
   */
  goStock = (userInfo) => {
    console.log(userInfo);
    this.props.router.replace(`/stock_closet?id=${userInfo.id}`)
  }
  /**
   * [handleOk 点击模态框确定按钮响应事件]
   */
  handleOk = () => {
    console.log(this.state.object)
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  /**
   * [handleCancelOne 点击模态框取消按钮响应事件]
   */
  handleCancelOne = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
      confirmLoading: false,
      grop: [],
      care_cost: 0,
      service_cost: 0,
      remark: '空',
      allPrice: 0,
    });
  }

   /**
   * [getTotalPrice 计算本次入库的总价格]
   */
  getTotalPrice(grop, val1, val2) {
    // 入库衣服总价格(无运费、服务费)
    let total = 0;
    grop.forEach((item, i, obj) => {
      total += item.price;
    });
    total += val1
    total += val2
    this.setState({ grop: grop, allPrice: total })
  }

   // 添加衣服到列表
  addClotheEvent() {
    const { object, grop, care_cost, service_cost } = this.state;
    object.price = object.count * object.store_month * object.unit_price;
    grop.rent_charge += object.price;
    object.price ? grop.push(object) : ''
    // 增加一条入库记录
    object.price ? this.getTotalPrice(grop, care_cost, service_cost) : message.error('请确认已设置衣柜属性！');
  }

  /**
   * [handleGroupClick 【衣柜记录】列表的点击事件]
   * @param  {[type]} index [点击的条目在appointment.appointment_price_groups中的索引]
   * @param  {[type]} item  [点击的条目对象]
   */
  handleGroupClick(index, item) {
    editItem.item = item;
    editItem.index = index;
    this.setState({
      object: item,
      pop: true,
      event: EDIT,
    });
  }

  /**
   * [selectClotheType 显示弹出窗]
   * @param  {[object]} type [选择的衣服种类、价格]
   */
  selectClotheType(type) {
    const month = type.is_chest ? 3 : 1;
    // 创建一个临时对象
    const obj = {
      price_system_id: type.id,
      title: type.title,
      count: 1,
      price: 0,
      unit_price: type.price,
      store_month: month,
      is_chest: type.is_chest,
    }
    this.setState({ object: obj });
  }

  /**
   * 处理服务费
   */
  handleKindClothesCount(kind, value) {
    const { grop, care_cost, service_cost } = this.state
    const val1 = kind === 'care_cost' ? value : care_cost
    const val2 = kind === 'service_cost' ? value : service_cost
    this.getTotalPrice(grop, val1, val2)
    this.setState({ [kind]: value });
  }

   /**
   * [handleWarehouse 入库生成订单逻辑]
   * @return {[type]} [description]
   */
  handleWarehouse() {
    this.setState({ confirmLoading: true });
    // 缓存数据
    const { care_cost, service_cost, remark, uInfo, grop } = this.state;
    // appointment.price = this.getAppointmentTotal();
    //存入storage
    // sessionStorage.setItem('appointment', JSON.stringify(appointment));
    // 开始提交，封装更新的数据包
    let cache = `user_id=${uInfo.id}`;
    cache += `&service_order[remark]=${remark}`;
    cache += `&service_order[care_cost]=${care_cost}`;
    cache += `&service_order[service_cost]=${service_cost}`;
    grop.forEach((item, index, obj) => {
      cache += `&service_order_groups[price_groups][][count]=${item.count}`;
      cache += `&service_order_groups[price_groups][][price_system_id]=${item.price_system_id}`;
      cache += `&service_order_groups[price_groups][][store_month]=${item.store_month}&`;
    });
    const params = cache.substring(0, cache.length - 1);

    // if (!this.validateForm()) {
    //   this.setState({ loading: false });
    //   return;
    // }
    console.log('====+++++++++++++++++++=========++++++++++++====');
    console.log(params);

    var token = localStorage.token
    var email = localStorage.email
    const that = this
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/users/${uInfo.id}/service_orders`)
      .set('Accept', 'application/json')
       .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .send(params)
      .end((err, res) => {
        if (res.status === 422) {
          message.error(res.body.error);
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
              grop: [],
              care_cost: 0,
              service_cost: 0,
              remark: '空',
              allPrice: 0,
            });
          }, 2000);
        } else if (res.status < 300 && res.status >= 200) {
          message.warning('服务订单创建成功！')
          this.getList()
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
            });
          }, 2000);
        } else {
          message.warning('提交订单失败，工程师正在紧急修复')
          setTimeout(() => {
            this.setState({
              visible: false,
              confirmLoading: false,
              grop: [],
              care_cost: 0,
              service_cost: 0,
              remark: '空',
              allPrice: 0,
            });
          }, 2000);
        }
      })
  }

  render() {
    const { visible, confirmLoading, ModalText, uInfo, appointment, object, types, users, grop, allPrice } = this.state;
    const columns = [{
      title: '账户昵称',
      dataIndex: 'nickname',
      width: 150,
      render: (text, record) => {
        return (
          text ? <label>{text}</label> : <label>暂无昵称</label>
        )
      },
    }, {
      title: '电话',
      dataIndex: 'phone',
      width: 150,
    }, {
      title: '衣柜数量',
      dataIndex: 'chest_count',
      width: 100,
    }, {
      title: '状态',
      dataIndex: 'any_chests_about_to_expire',
      key: 'any_chests_about_to_expire',
      filterMultiple: false,
      filters: [{
        text: '即将到期',
        value: 'true',
      }, {
        text: '使用中',
        value: 'false',
      }],
      onFilter: (value, record) => `${record.any_chests_about_to_expire}` === value,
      render: (text, record, index) => { if (record.any_chests_about_to_expire) { return <Tag color="#f50">即将到期</Tag> } return <Tag color="#87d068">使用中</Tag> },
    }, {
      title: '订单操作',
      key: 'order',
      width: 100,
      render: (text, record, index) => <Button type="dashed" onClick={this.showModal.bind(this, record)} style={{ fontSize: 12 }} icon="plus">新增服务订单</Button>,
    }, {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => <a onClick={this.goStock.bind(this, record)}>查看详情</a>,
    }];
    return (
      <MainLayout active="/stock">
        <div className={styles.stock_user_container}>
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 20 }}
            scroll={{ y: height }}
          />
          <Modal
            title="服务订单"
            visible={visible}
            width={width}
            style={{ top: 40 }}
            onOk={this.handleWarehouse.bind(this)}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancelOne}
          >
            <Row type="flex" justify="space-around" align="middle">
              <Col span={5}>
                <p>昵称：{uInfo.nickname}</p>
                <p>电话：{uInfo.phone}</p>
                <p>*********************</p>
              </Col>
              <Col span={5} style={{ textAlign: 'right', color: '#FC9421' }}>
                <h2>订单总价：{allPrice}元</h2>
              </Col>
              <Col offset={4} span={5}>
                <lable>护理费：</lable>
                <InputNumber
                  type="number"
                  min={0}
                  style={{ width: 60, borderColor: '#ECC17D' }}
                  value={this.state.care_cost}
                  onChange={this.handleKindClothesCount.bind(this, 'care_cost')}
                />
              </Col>
              <Col span={5}>
                <lable>服务费：</lable>
                <InputNumber
                  type="number"
                  min={0}
                  style={{ width: 60, borderColor: '#ECC17D' }}
                  value={this.state.service_cost}
                  onChange={this.handleKindClothesCount.bind(this, 'service_cost')}
                />
              </Col>
            </Row>
            {/* 仓储类型 */}
            <Row className={styles.stock_modal_contanier}>
              <Col span={10}>
                <ClosetKinds
                  kinds={types}
                  active={object.title}
                  handleClick={this.selectClotheType.bind(this)}
                />
                <div className={styles.stock_time_contanier}>
                  <h3>仓储时长：</h3>
                  <RadioGroup
                    className={styles.stock_time_radioGroup}
                    onChange={this.onLengthChange.bind(this)}
                    value={`${object.store_month}`}
                    defaultValue="3"
                  >
                    <RadioButton value="3">三个月</RadioButton>
                    <RadioButton value="6">六个月</RadioButton>
                    <RadioButton value="9">九个月</RadioButton>
                    <RadioButton value="12">一年</RadioButton>
                    <RadioButton value="24">两年</RadioButton>
                  </RadioGroup>
                </div>
                {/* 衣柜数量 */}
                <CountEditer count={object.count} onChange={this.handleCountChange.bind(this)} />
              </Col>
              <Col span={4} style={{ height: height - 60 }} className={styles.stockButtonCol}>
                <Button type="primary" icon="swap" onClick={this.addClotheEvent.bind(this)}>添加</Button>
              </Col>
              <Col
                span={10}
                style={{ height: height - 60 }}
                className={styles.stock_table_contanier}
              >
                <h3>已选择衣柜</h3>
                <ClothesTable
                  groups={grop}
                  itemClickEvent={this.handleGroupClick.bind(this)}
                />
              </Col>
            </Row>
          </Modal>
        </div>
      </MainLayout>
    );
  }
}

Stock.propTypes = {};

export default withRouter(Stock);
