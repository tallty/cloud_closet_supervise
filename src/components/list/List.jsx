{/* 库存管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import { Breadcrumb, Table, Modal, Row, Col, Icon, Button } from 'antd';
import ListModal from './ListModal';
import ActiveLink from '../../layouts/ActiveLink/ActiveLink';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import styles from './List.less';

const image_name ={'上衣':'t_shirt','连衣裙':'skirt','裤装':'pants','半裙':'skirts','外套':'jacket','羽绒服':'feather','泳装':'swimsuit'}
const confirm = Modal.confirm;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      record: {},
      data: []
    };
  }

  componentWillMount() {
    this.getData()
  }

  getData(){
    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/price_systems?page=1&per_page=100000"
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end( (err, res) => {
        if (!err || err === null) {
          let data = res.body.price_systems
          this.setState({ data: data })
        }
      })
  }

  deleteList(val){
    this.setState({visible: val})
    this.getData()
  }

  getColumns(){
    const columns = [{
      title: '类别图标',
      dataIndex: 'icon',
      key: 'y',
      render: (text, record, index) => this.icon(record.name)
    },{
      title: '名称',
      dataIndex: 'name',
    },{
      title: '季节',
      dataIndex: 'season',
    }, {
      title: '单价(元/月)',
      dataIndex: 'price',
    }, {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (text, record, index) => this.change_icon(record)
    }]
    return columns
  }

  // 删除确认模态框
  warning(record) {
    // confirm({
    //   title: '确定删除该订单？',
    //   content: '订单删除将无法恢复！请知晓。。。',
    //   onOk() {
        var token = localStorage.token
        var email = localStorage.email
        var url = `http://closet-api.tallty.com/admin/price_systems/${record.id}`
        SuperAgent
          .delete(url)
          .set('Accept', 'application/json')
          .set('X-Admin-Token', token)
          .set('X-Admin-Email', email)
          .end( (err, res) => {
            if (!err || err === null) {
              this.getData()
            }
          })
    //   },
    //   onCancel() {},
    // });
  }

  showModal(record) {
    this.setState({
      visible: true,
      record: record
    });
  }

  icon(name){
    const icon = []
    var url = "src/images/"+image_name[name]+'.svg'
    icon.push(
      <div key={-1} className={styles.icon_content}>
        <img src={url} className={styles.icon} alt=""/>
      </div>
    )
    return icon
  }

  change_icon(record){
    const change_icon = []
    change_icon.push(
      <div key='icon' className={styles.icon_content}>
        <ActiveLink onClick={this.showModal.bind(this, record)}>详情</ActiveLink> | <ActiveLink onClick={this.warning.bind(this, record)}>删除</ActiveLink>
      </div>
    )
    return change_icon
  }

  render() {
    return (
      <MainLayout>
        <div className={styles.container}>
          <Row className={styles.header}>
            <Col span={21} className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={styles.bread}><ActiveLink to="/appoint">全部清单</ActiveLink></Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>清单详情</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={3}>
              <ActiveLink onClick={this.showModal.bind(this)} className={styles.add_col}><Icon type="plus" />添加</ActiveLink>
            </Col>
          </Row>
          <Row className={styles.table_content}>
            <Table columns={this.getColumns()} dataSource={this.state.data} pagination={{ pageSize: 7 }} />
          </Row>
          <ListModal {...this.state} onChange={val => this.deleteList(val)} />
        </div>
      </MainLayout>
    );
  }
}

List.propTypes = {};

export default List;