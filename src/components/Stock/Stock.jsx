{/* 库存管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Row, Col, Button, Table, Modal, Tag, Radio } from 'antd';
import { UserInfo } from './user_info/UserInfo';
import { ClothesTable } from './clothes_table/ClothesTable';
import { ClosetKinds } from './warehouse/ClosetKinds';
import { CountEditer } from './warehouse/CountEditer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Appoint from '../Appointment/Appoint/Appoint'
import styles from './Stock.less';

const height = document.body.clientHeight - 260
const confirm = Modal.confirm;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    nickname: `Edward King ${i}`,
    phone: `185165811${i}`,
    number: 32,
    any_expiringly_chests: i === 3 || i === 6 || i === 8 ? true : false,
    address: `London, Park Lane no. ${i}`,
  });
}

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      uInfo: {},
      ModalText: [],
      visible: false,
      appointment: null,      // 【Data】服务的订单对象
      types: [],              // 【Data】所有衣服类型
      object: {},
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
      .field('query_state', 'stored')
      .end((err, res) => {
        if (!err || err === null) {
          const appointments = res.body.appointments
          this.setState({ appointments: appointments })
        } else {
          this.setState({ appointments: [] })
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

  showModal = (userInfo) => {
    this.setState({
      visible: true,
      uInfo: userInfo,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancelOne = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
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

  render() {
    const { visible, confirmLoading, ModalText, uInfo, appointment, object, types } = this.state;
    const columns = [{
      title: '账户昵称',
      dataIndex: 'nickname',
      width: 150,
    }, {
      title: '电话',
      dataIndex: 'phone',
      width: 150,
    }, {
      title: '衣柜数量',
      dataIndex: 'number',
      width: 100,
    }, {
      title: '状态',
      dataIndex: 'any_expiringly_chests',
      key: 'any_expiringly_chests',
      filterMultiple: false,
      filters: [{
        text: '即将到期',
        value: 'true',
      }, {
        text: '使用中',
        value: 'false',
      }],
      onFilter: (value, record) => `${record.any_expiringly_chests}` === value,
      render: (text, record, index) => { if (record.any_expiringly_chests) { return <Tag color="#f50">即将到期</Tag> } return <Tag color="#87d068">使用中</Tag> },
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
      render: () => <a href="#">查看详情</a>,
    }];
    return (
      <MainLayout>
        <div className={styles.stock_user_container}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 20 }}
            scroll={{ y: height }}
          />
          <Modal
            title="服务订单"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancelOne}
          >
            <p>昵称：{uInfo.nickname}</p>
            <p>电话：{uInfo.phone}</p>
            <p>*********************</p>
            {/* 仓储类型 */}
            <ClosetKinds kinds={types} active={object.title} handleClick={this.selectClotheType.bind(this)} />
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
            {/*<ClothesTable groups={appointment.appointment_price_groups} itemClickEvent={this.handleGroupClick.bind(this)} />*/}
          </Modal>
        </div>
      </MainLayout>
    );
  }
}

Stock.propTypes = {};

export default Stock;
