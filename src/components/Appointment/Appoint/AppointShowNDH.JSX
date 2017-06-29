{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Modal, Breadcrumb, Table, Row, Col, Button, Collapse, Tag, InputNumber, message, Form, Input } from 'antd';
import AppointShowNDC from './AppointShowNDC';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './AppointShow.less';

const Panel = Collapse.Panel
const height = document.body.clientHeight * 0.56;
const FormItem = Form.Item;
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
}, {
  title: '名称',
  dataIndex: 'name1',
  render: renderContent,
}, {
  title: '类别',
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
  title: '到期时间',
  dataIndex: 's11_price1',
  render: renderContent,
}, {
  title: '仓储编号',
  dataIndex: 's12_price1',
  render: renderContent,
}, {
  title: '操作',
  dataIndex: 'action1',
  render: renderContent,
}]

const CollectionCreateForm = Form.create()(
  (props) => {
    const { title, visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        width="450"
        visible={visible}
        title={title}
        okText="确认"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label={title}>
            {getFieldDecorator('num', {
              rules: [{ required: true, message: '请输入所选数值!' }],
            })(
              <InputNumber />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
class AppointShowNDH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: '数值选择',
      stockId: null,
    };
  }

  date2str(x, y) {
    const z = { y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) { return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2)) });
  }

  showModal = (t, id) => {
    this.setState({
      visible: true,
      title: t,
      stockId: id,
    });
  }

  handleCreate = () => {
    const form = this.form;
    const { stockId, title } = this.state
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      title === '续期时长' ? this.setStockTime(stockId, values.num) : this.setStockNumber(stockId, values.num)
      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  setStockTime(id, time) {
    SuperAgent
    .post(`http://closet-api.tallty.com/admin/exhibition_chests/${id}/lease_renewal`)
    .set('Accept', 'application/json')
    .set('X-Admin-Token', localStorage.token)
    .set('X-Admin-Email', localStorage.email)
    .send({ renewal_month: time })
    .end((err, res) => {
      if (!err || err === null) {
        // this.setState({ loading: false });
        message.error('修改成功！');
        this.props.reload()
      } else {
        // this.setState({ loading: false })
        message.error('确认失败，请稍后重试');
      }
    })
  }

  setStockNumber(id, num) {
    SuperAgent
    .put(`http://closet-api.tallty.com/admin/exhibition_chests/${id}`)
    .set('Accept', 'application/json')
    .set('X-Admin-Token', localStorage.token)
    .set('X-Admin-Email', localStorage.email)
    .send({ exhibition_chest: { max_count: num } })
    .end((err, res) => {
      if (!err || err === null) {
        // this.setState({ loading: false });
        message.error('修改成功！');
        this.props.reload()
      } else {
        // this.setState({ loading: false })
        message.error('确认失败，请稍后重试');
      }
    })
  }

  Panel_H() {
    const group = this.props.group
    const Panel_H = []
    Panel_H.push(
      <Row key={this.props.m}>
        <Col span={24} className={styles.appoint_title}>
          <Col span={24} className={styles.user_tab}>
            <Col span={4} className={styles.img_content}>
              <img src="src/images/skirt.svg" alt="" className={styles.ul_icon} />
              <label>{group.title}</label>
            </Col>
            <Col span={2} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{group.remain_space_count}</label></label>
            </Col>
            <Col span={2} className={styles.img_content}>
              {/*<label className={styles.ul_icon}><label>{group.max_count}</label></label>*/}
              <div className={styles.ul_icon}>
                <label>{group.max_count}</label>
                {/*<InputNumber
                  type="number"
                  className={styles.InputNumber}
                  min={0}
                  style={{ width: 60, borderColor: '#ECC17D' }}
                  value={group.max_count}
                  onChange={this.changeMax.bind(this)}
                />*/}
              </div>
            </Col>
            <Col span={5} className={styles.img_content}>
              <label className={styles.ul_icon}>
                <label>{this.date2str(new Date(group.expire_time), 'yyyy-MM-dd hh:mm:ss')}</label>
              </label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{group.state}</label></label>
            </Col>
            <Col span={3} className={styles.img_content}>
              <div className={styles.ul_icon}>
                {group.is_expired ? (<Tag color="#f50">将到期</Tag>) : (<Tag color="#87d068">使用中</Tag>)}
              </div>
            </Col>
            <Col span={5} className={styles.img_content}>
              <ActiveLink className={styles.play_action} to={`/appoint_show_detail?ap_id=${this.props.ap_id}&&id=${group.id}`}>
                <label className={styles.ul_icon}><label>入库</label></label>
              </ActiveLink>
              <Button className={styles.play_action} onClick={this.showModal.bind(this, '续期时长', group.id)}>
                <label className={styles.ul_icon}><label>续期</label></label>
              </Button>
              <Button onClick={this.showModal.bind(this, '容量修改', group.id)}>
                <label className={styles.ul_icon}><label>容量修改</label></label>
              </Button>
            </Col>
          </Col>
        </Col>
      </Row>
    )
    return Panel_H
  }

  Panel_H1() {
    const group = this.props.group
    const Panel_H = []
    Panel_H.push(
      <Row key={this.props.m}>
        <Col span={24} className={styles.appoint_title}>
          <Col span={24} className={styles.user_tab}>
            <Col span={5} className={styles.img_content}>
              <img src="src/images/skirt.svg" alt="" className={styles.ul_icon} />
              <label>{group.title}</label>
            </Col>
            <Col span={4} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{group.count}</label></label>
            </Col>
            <Col span={5} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{group.unit_price}</label></label>
            </Col>
            <Col span={5} className={styles.img_content}>
              <label className={styles.ul_icon}>
                <label>{this.date2str(new Date(group.expire_time), 'yyyy-MM-dd hh:mm:ss')}</label>
              </label>
            </Col>
            <Col span={5} className={styles.img_content}>
              <label className={styles.ul_icon}><label>{group.store_month}个月</label></label>
            </Col>
          </Col>
        </Col>
      </Row>
    )
    return Panel_H
  }

  render() {
    const data = [];
    // const num = this.props.groupngth
    const that = this
    // for (let i = 0; i < num; i++) {
      data.push({
        key: 1,
        type: that.props.type === 'appoints' ? that.Panel_H1() : that.Panel_H(),
      });
    // }
    return (
      <div className={styles.link_btn}>
        <Table rowKey="number" columns={columns} dataSource={data} showHeader={false} pagination={false} scroll={{ y: height }} />
        <CollectionCreateForm
          ref={this.saveFormRef}
          title={this.state.title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

AppointShowNDH.propTypes = {
  reload: PropTypes.func,
};

AppointShowNDH.defaultProps = {
  reload: () => {},
};

export default AppointShowNDH;
