import React, { Component, PropTypes } from 'react';
import { Modal, Breadcrumb, Row, Col, Button, Card, Tag, Icon } from 'antd';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import PostPicModal from './PostPicModal';
import Appointment from '../Appointment';
import styles from './AppointShow.less';

const { string, number, bool, arrayOf, shape } = PropTypes;

class AppointShowNDC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      success: false,
      garments: this.props.garments,
      pic_url: '',
      row_carbit_place: '',
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

  getList() {
    const lists = []
    const { garments } = this.state
    garments.forEach((garment, i, obj) => {
      lists.push(
        <Col span="5" className={styles.ndc_card}>
          <Card bordered={true} style={{ border: '2px solid #FF9241' }} bodyStyle={{ padding: 0 }} >
            <div className={styles.card_img_content}>
              <img alt="example" src={`${garment.cover_image}`} />
            </div>
            <div className={styles.custom_card}>
              <h3>{garment.title}</h3>
              <Tag className={styles.custom_card_tag}>{garment.type[0]}</Tag>
              <p>{garment.closet_number}</p>
              <Button className={styles.edit_btn} >编辑</Button><Button className={styles.detele_btn}>删除</Button>
            </div>
          </Card>
        </Col>
      )
    })
    return lists
  }

  render() {
    return (
      <Appointment>
        <div className={styles.container}>
          <Row className={styles.header}>
            <Col span={24} className={styles.breadcrumb}>
              <Breadcrumb>
                <Breadcrumb.Item className={styles.bread}><ActiveLink to="/appoint">全部订单</ActiveLink></Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>订单详情</Breadcrumb.Item>
                <Breadcrumb.Item className={styles.active}>入库</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col span={16} offset={8} className={styles.head_right}>
              <label>订单号：20161011877834</label>
              <Button className={styles.head_right_btn} onClick={this.showModal.bind(this)} type="dashed" icon="plus" ghost>添加衣服</Button>
            </Col>
          </Row>
          <Row className={styles.ndc_card_container}>
            {this.getList()}
          </Row>
        </div>
        <Row>
          <PostPicModal {...this.state} onChange={val => this.setState({ visible: val })} callbackParent={this.onChildChanged.bind(this)} />
        </Row>
      </Appointment>
    )
  }
}

AppointShowNDC.defaultProps = {
  garments: [{ id: 1, title: '连衣裙', cover_image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', type: ['夏装'], closet_number: '12-2-34', describe: 'meilidongren', pics: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'] }, { id: 1, title: '连衣裙', cover_image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', type: ['下装', '夏装'], closet_number: '12-2-34', describe: 'meilidongren', pics: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'] }, { id: 1, title: '连衣裙', cover_image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', type: ['上装', '夏装'], closet_number: '12-2-34', describe: 'meilidongren', pics: ['https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'] }],
}

AppointShowNDC.propTypes = {
  garments: arrayOf(
    shape({
      id: number,
      title: string,
      cover_image: string,
      type: arrayOf,
      closet_number: string,
      describe: string,
      pics: arrayOf,
    })
  ),
};

export default AppointShowNDC;
