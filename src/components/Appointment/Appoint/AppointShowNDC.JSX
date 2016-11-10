{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse } from 'antd';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import PostPicModal from './PostPicModal';
import styles from './AppointShow.less';


class AppointShowNDC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      success: false,
      pic_url: '',
      garment: this.props.garment,
      store_month: this.props.store_month,
      price: this.props.price,
      p_url: this.props.p_url,
      row_carbit_place: this.props.row_carbit_place,
      appoint_id: this.props.appoint_id
    };
  }

  // 删除确认模态框
  warning() {
    Modal.warning({
      title: '确定删除该订单？',
      content: '订单删除将无法恢复！请知晓。。。',
    });
  }

  showModal() {
    console.log(this.state.visible);
    this.setState({
      visible: true,
    });
  }

  onChildChanged(newState, new_url, row_carbit_place) {
    console.log('1111111111');
    console.log(new_url);
    this.setState({
      success: newState, pic_url: new_url, row_carbit_place: row_carbit_place
    });
  }

  get_pic_content(){
    const pic_content = []
    if (this.state.pic_url !=='') {
      console.log('22222222222');
      console.log(this.state.pic_url);
      pic_content.push(<img key={"f"} src={this.state.pic_url} alt="" className={styles.ul_icon}/>)
    }else if (this.props.garment.cover_image==null){
      pic_content.push(<img key={"f"} src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>)
    }else{
      pic_content.push(<img key={"f"} src={this.props.garment.cover_image} alt="" className={styles.ul_icon}/>)
    }
    return pic_content
  }

  getRow(){
    const row_carbit_place = []
    if (this.state.row_carbit_place !== 'undefined-undefined-undefined') {
      row_carbit_place.push(<span key="row_carbit_place">{this.state.row_carbit_place}</span>)
    }else{
      row_carbit_place.push(<span key="row_carbit_place">{this.props.garment.row_carbit_place}</span>)
    }
    return row_carbit_place
  }

  render() {
    return (
      <Row>
        <Col span={24} className={styles.appoint_title_c}>
          <Col span={24} className={styles.user_tab}>
            <Col span={4} className={styles.img_content}>
              {this.get_pic_content()}
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>D20160813{this.props.garment.id}</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>春夏</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>1</label></label>
            </Col>
            <Col span={4} offset={6} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{this.getRow()}</label></label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}>
              <ActiveLink onClick={this.showModal.bind(this)}>详情</ActiveLink>{/* | <ActiveLink onClick={this.warning}>删除</ActiveLink> */}
              </label>
            </Col>
          </Col>
        </Col>
        <PostPicModal {...this.state} onChange={val => this.setState({visible: val})} callbackParent={this.onChildChanged.bind(this)}/>
      </Row>
    )
  }
}

AppointShowNDC.propTypes = {};

export default AppointShowNDC;