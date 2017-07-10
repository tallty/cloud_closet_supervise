import React, { Component, PropTypes } from 'react';
import { Breadcrumb, Table, Row, Col, InputNumber, Button, message } from 'antd';
import SuperAgent from 'superagent'
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import AppointShowNDH from './AppointShowNDH';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink';
import styles from './AppointShow.less';

const height = document.body.clientHeight - 400;
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
  title: '单价（￥）',
  dataIndex: 'name1',
  render: renderContent,
}, {
  title: '服务费',
  dataIndex: 'number1',
  render: renderContent,
}, {
  title: '数量（件）',
  dataIndex: 'address1',
  render: renderContent,
}, {
  title: '仓储时长',
  dataIndex: 'time1',
  render: renderContent,
}, {
  title: '创建时间',
  dataIndex: 's11_price1',
  render: renderContent,
}, {
  title: '总价',
  dataIndex: 's12_price1',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action1',
  render: renderContent,
}]

class AppointShowN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      hanging: 0,
      stacking: 0,
      full_dress: 0,
      user_info: {},
    };
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
    const token = localStorage.token
    const email = localStorage.email
    const id = this.getQueryString('id')
    const url = this.props.type === 'appoints' ? `http://closet-api.tallty.com/admin/appointments/${id}` : `http://closet-api.tallty.com/admin/users/${id}/exhibition_chests`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          const groupsG = this.props.type === 'appoints' ? res.body.appointment_price_groups : res.body.admin_exhibition_chests
          const userInfo = res.body.user_info
          this.getUser(token, email, this.props.user_id)
          this.props.type === 'appoints' ?
            this.setState({
              groups: groupsG,
              // user_info: userInfo,
              hanging: this.props.counts.hanging,
              stacking: this.props.counts.stacking,
              full_dress: this.props.counts.full_dress,
            })
          :
          this.setState({
            groups: groupsG,
            user_info: userInfo,
          })
        } else {
          this.setState({ groups: [], user_info: {} })
        }
      })
  }

  getUser(token, email, id) {
    const url = `http://closet-api.tallty.com/admin/users/${id}`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          const userInfo = res.body
            this.setState({
              user_info: userInfo,
            })
        } else {
          this.setState({ groups: [], user_info: {} })
        }
      })
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  /**
   * 处理不同种类衣服的数量
   */
  handleKindClothesCount(kind, value) {
    this.setState({ [kind]: value });
  }

  reload() {
    console.log('-----------------------')
    this.getList();
  }

  /**
   * 更新衣服的数量
   */
  changeKindClothesCount() {
    console.log();
    const garment_count = {};
    garment_count.hanging = this.state.hanging
    garment_count.stacking = this.state.stacking
    garment_count.full_dress = this.state.full_dress
    const id = this.getQueryString('id')
    console.log(garment_count);
    SuperAgent
      .put(`http://closet-api.tallty.com/admin/appointments/${id}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .send({ appointment: { garment_count_info: garment_count } })
      .end((err, res) => {
        if (!err || err === null) {
          // this.setState({ loading: false });
          message.error('订单更新成功！');
        } else {
          // this.setState({ loading: false })
          message.error('确认失败，请稍后重试');
        }
      })
  }

  render() {
    // 一级表格模拟数据
    const data = [];
    const { groups, user_info } = this.state
    console.log(this.props);
    groups.forEach((group, i, obj) => {
      data.push({
        key: i,
        type: <AppointShowNDH
          key={`${i}a`}
          ap_id={this.getQueryString('id')}
          m={i}
          type={this.props.type}
          group={group}
          reload={this.reload.bind(this)}
        />,
      });
    })
    return (
      <MainLayout active="/stock" active1="/appoint">
        <div className={styles.container}>
          <Row className={styles.header}>
            <Col span={24} className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={styles.bread}>
                  {this.props.type === 'appoints' ? <ActiveLink to="/appoint">订单列表</ActiveLink> : <ActiveLink to="/stock">用户列表</ActiveLink>}
                </Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>
                {this.props.type === 'appoints' ? '订单详情' : '仓储详情'}
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={this.props.type === 'appoints' ? 12 : 24} className={styles.head_right}>
              {this.props.type === 'appoints' ? <label>预约用户姓名： {this.props.name}</label> : ''}
              <label className={styles.userInfo_nickname}>用户昵称：{user_info.nickname ? user_info.nickname : '暂无'}</label>
              <br />
              {this.props.type === 'appoints' ? <div className={styles.address_label}>用户地址：{this.props.address}</div> : ''}
              <label>联系方式：{this.props.type === 'appoints' ? this.props.phone : user_info.phone}</label>
            </Col>
            {this.props.type === 'appoints' ?
              <Col span={12} className={styles.head_right}>
                <Col span={20}>
                  <label>叠放衣物：{this.props.counts.stacking}件</label><br />
                  <label>挂放衣物：{this.props.counts.hanging}件</label><br />
                  <label>礼服：{this.props.counts.full_dress}件</label>
                </Col>
                <Col span={4}>
                  <ActiveLink to={`/stock_closet?id=${this.props.user_id}`}><Button type="primary">衣物入库</Button></ActiveLink>
                </Col>
              </Col> : ''
              }
          </Row>
          {/* 种类件数 */}
          {this.props.type === 'appoints' ?
            <Row className={styles.change_count}>
              <Col xs={{ span: 12 }} sm={{ span: 6 }}>
                <div className={styles.pane_input}>
                  <span>叠放：</span>
                  <InputNumber
                    type="number"
                    min={0}
                    style={{ width: 60, borderColor: '#ECC17D' }}
                    value={this.state.stacking}
                    onChange={this.handleKindClothesCount.bind(this, 'stacking')}
                  />
                  <span> 件 </span>
                </div>
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 6 }} >
                <div className={styles.pane_input}>
                  <span>挂放：</span>
                  <InputNumber
                    type="number"
                    min={0}
                    style={{ width: 60, borderColor: '#ECC17D' }}
                    value={this.state.hanging}
                    onChange={this.handleKindClothesCount.bind(this, 'hanging')}
                  />
                  <span> 件 </span>
                </div>
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 6 }}>
                <div className={styles.pane_input}>
                  <span>礼服：</span>
                  <InputNumber
                    type="number"
                    min={0}
                    style={{ width: 60, borderColor: '#ECC17D' }}
                    value={this.state.full_dress}
                    onChange={this.handleKindClothesCount.bind(this, 'full_dress')}
                  />
                  <span> 件 </span>
                </div>
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 6 }}>
                <div className={styles.pane_input}>
                  <Button onClick={this.changeKindClothesCount.bind(this)}>更新订单</Button>
                </div>
              </Col>
            </Row>
            : ''
          }
          <div className={styles.table}>
            {this.props.type === 'appoints' ?
              <Row className={styles.table_head}>
                <Col span={5}>类别</Col>
                <Col span={4}>数量</Col>
                <Col span={5}>单价</Col>
                <Col span={5}>总价</Col>
                <Col span={5}>预定时长</Col>
              </Row>
              :
              <Row className={styles.table_head}>
                <Col span={4}>类别</Col>
                <Col span={2}>余量（件）</Col>
                <Col span={2}>总容量（件）</Col>
                <Col span={5}>到期时间</Col>
                <Col span={3}>状态</Col>
                <Col span={3}>期限</Col>
                <Col span={5}>操作</Col>
              </Row>
            }
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
              scroll={{ y: height }}
              showHeader={false}
            />
          </div>
        </div>
      </MainLayout>
    );
  }
}

AppointShowN.propTypes = {
};

AppointShowN.defaultProps = {
};

export default AppointShowN;
