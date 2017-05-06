import React, { Component, PropTypes } from 'react';
import { Modal, Breadcrumb, Row, Col, Button, Card, Tag, Icon, message } from 'antd';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import PostPicModal from './PostPicModal';
import SuperAgent from 'superagent'
import Appointment from '../Appointment';
import styles from './AppointShow.less';

const { string, number, bool, arrayOf, shape } = PropTypes;
const height = document.body.clientHeight - 230
const confirm = Modal.confirm;

class AppointShowNDC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      success: false,
      garments: [],
      garmentOne: {},
      pic_url: '',
      row_carbit_place: '',
      supportTags: [],
    };
  }

  componentWillMount() {
    this.getDataList();
    this.getTags();
  }

  getDataList() {
    const token = localStorage.token
    const email = localStorage.email
    const idN = this.getQueryString('id')
    const url = `http://closet-api.tallty.com/admin/exhibition_chests/${idN}/garments`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const garmentsN = res.body.garments
          this.setState({ garments: garmentsN })
        }
      })
  }

  getTags() {
    SuperAgent
      .get('http://closet-api.tallty.com/constant_tags')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err || err === null) {
          const obj = res.body;
          sessionStorage.setItem('supportTags', JSON.stringify(obj));
          this.setState({ supportTags: obj.map(item => item.title) });
        } else {
          message.error('获取标签列表失败');
        }
      })
  }

  getOneData(id) {
    const token = localStorage.token
    const email = localStorage.email
    const idN = this.getQueryString('id')
    const url = `http://closet-api.tallty.com/admin/exhibition_chests/${idN}/garments/${id}`
    SuperAgent
      .get(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          const garmentsN = res.body
          this.setState({ garmentOne: garmentsN, visible: true })
        }
      })
  }

  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  // 删除确认模态框
  warning(id) {
    const that = this
    confirm({
      title: '衣服删除确认提醒?',
      content: '点击确认，衣服删除成功，用户端删除衣物信息，无法恢复。。。',
      onOk() {
        that.deleteClo(id)
      },
      onCancel() { },
    });
  }

  deleteClo(id) {
    const token = localStorage.token
    const email = localStorage.email
    const url = `http://closet-api.tallty.com/admin/garments/${id}`
    SuperAgent
      .delete(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('衣服删除成功！');
          this.getDataList()
        } else {
          message.error('衣服删除失败！');
        }
      })
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  onChildChanged() {
    this.getDataList()
  }

  editGarment(id) {
    this.getOneData(id)
  }

  getList() {
    const lists = []
    const { garments } = this.state
    garments.forEach((garment, i, obj) => {
      lists.push(
        <Col key={`gar${i}`} span="6" className={styles.ndc_card}>
          <Card bordered={true} style={{ border: '2px solid #FF9241' }} bodyStyle={{ padding: 0 }} >
            <div className={styles.card_img_content}>
              <img alt="example" src={`${garment.cover_image}`} />
            </div>
            <div className={styles.custom_card}>
              <label>{garment.title ? garment.title : '默认衣服标题'}</label>
              <Tag className={styles.custom_card_tag}>{garment.garment_status}</Tag>
              <p>{garment.row_carbit_place}</p>
              <Button className={styles.edit_btn} onClick={this.editGarment.bind(this, garment.id)}>编辑</Button>
              <Button className={styles.detele_btn} onClick={this.warning.bind(this, garment.id)}>删除</Button>
            </div>
          </Card>
        </Col>
      )
    })
    return lists
  }

  showConfirm() {
    const that = this
    confirm({
      title: '衣柜发布确认提醒?',
      content: '点击确认，衣柜发布成功，用户端将显示发布衣柜及衣物信息。。。',
      onOk() {
        that.pushChests(that)
      },
      onCancel() { },
    });
  }

  pushChests() {
    const token = localStorage.token
    const email = localStorage.email
    const idN = this.getQueryString('id')
    const url = `http://closet-api.tallty.com/admin/exhibition_chests/${idN}/release`
    SuperAgent
      .post(url)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', token)
      .set('X-Admin-Email', email)
      .end((err, res) => {
        if (!err || err === null) {
          message.success('衣柜发布成功！');
        } else {
          message.error('衣柜发布失败！');
        }
      })
  }

  goBack() {
    history.back()
  }

  render() {
    return (
      <Appointment>
        <div className={styles.container}>
          <Row className={styles.header}>
            <Col span={24} className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={styles.bread}><ActiveLink to="/appoint">全部订单</ActiveLink></Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active} onClick={this.goBack.bind(this)}>订单详情</Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>入库</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={16} offset={8} className={styles.head_right}>
              <label>订单号：20161011877834</label>
              <Button className={styles.head_right_btn} onClick={this.showModal.bind(this)} type="dashed" icon="plus" >添加衣服</Button>
              <Button className={styles.head_right_btn} onClick={this.showConfirm.bind(this)} type="dashed" icon="export" >发布</Button>
            </Col>
          </Row>
          <Row className={styles.ndc_card_container} style={{ height: height }}>
            <Col span={22} offset={1}>
              {this.getList()}
            </Col>
          </Row>
        </div>
        <Row>
          <PostPicModal
            {...this.state}
            ap_id={this.getQueryString('ap_id')}
            id={this.getQueryString('id')}
            onChange={val => this.setState({ visible: val, garmentOne: {} })}
            callbackParent={this.onChildChanged.bind(this)}
          />
        </Row>
      </Appointment>
    )
  }
}

AppointShowNDC.defaultProps = {
}

AppointShowNDC.propTypes = {
};

export default AppointShowNDC;
