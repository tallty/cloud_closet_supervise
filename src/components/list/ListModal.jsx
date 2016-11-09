{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent';
import { Row, Col, Modal,Form, Button, Radio, Input, Icon, Select, InputNumber } from 'antd';
import ActiveLink from '../../layouts/ActiveLink/ActiveLink'
import styles from './ListModal.less';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class ListModal extends Component {
  static defaultProps = {
      onChange: new Function
  }

  static PropTypes = {
      onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      name: '',
      type: '',
      price: ''
    };
  }

  handleOk(e) {
    this.setState({ loading: true });

    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    var name = value.name
    var price = value.price
    var type2 = value.type[1]?`、${value.type[1]}`:''
    var type = `${value.type[0]}${type2}`
    var visible = this.state.visible
    console.log(name, price, type);
    this.props.record.id?this.putAppoint(name, price, type, visible ):this.pushAppoint(name, price, type, visible )

    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  }

  handleCancel() {
    var visible = this.state.visible
    this.setState({visible}, ()=> this.props.onChange(visible));
  }

  // 创建价格
  pushAppoint(name, price, type, visible){
    console.log(visible);
    var token = localStorage.token
    var email = localStorage.email
    var url = "http://closet-api.tallty.com/admin/price_systems"
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .send({'price_system': {'name': name, 'price': price , 'season': type}})
              .end( (err, res) => {
                if (res.ok) {
                  console.log(res.body);
                  console.log('修改成功');
                  this.setState({visible}, ()=> this.props.onChange(visible));
                }else{
                  console.log('修改失败');
                }
              })       
  }

  //更新价格
  putAppoint(name, price, type, visible){
    console.log(visible);
    var token = localStorage.token
    var email = localStorage.email
    var url = `http://closet-api.tallty.com/admin/price_systems/${this.props.record.id}`
    SuperAgent.put(url)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .send({'price_system': {'name': name, 'price': price , 'season': type}})
              .end( (err, res) => {
                if (res.ok) {
                  console.log(res.body);
                  console.log('修改成功');
                  this.setState({visible}, ()=> this.props.onChange(visible));
                }else{
                  console.log('修改失败');
                }
              })       
  }

  render() {
    const title = []
    title.push(
      <div key={1} className={styles.modal_title}>编辑清单信息</div>
    )
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    }
    return (
      <div className={styles.link_btn}>
        <Form horizontal >
          <Modal
            width="36vw"
            style={{ top: 40 }}
            visible={this.props.visible}
            title={title}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}
            footer={[<FormItem key={-1}>
              <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>
              <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                提交
              </Button></FormItem>,
            ]}
          >
            <Row className={styles.modal_content}>
              <Col span={8} className={styles.left_pic_add}>
                <img src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>
                <br/><label className={styles.main_pic}>清单图标<Icon type="plus" className={styles.plus_icon} /></label>
              </Col>
              <Col span={16} className={styles.right_content}>
                <Row className={styles.c_detail}>
                  <Col span={24}>
                    <FormItem className={styles.form_item} label="名称" {...formItemLayout} id="control-input1" >
                      {getFieldDecorator('name', {
                        rules: [
                          { required: true, message: '请选择衣服类型' },
                        ], initialValue: this.props.record?this.props.record.name:''
                      })(
                        <Select placeholder="请选择衣服类型" style={{ width: '100%' }}>
                          <Option value="上衣">上衣</Option>
                          <Option value="连衣裙">连衣裙</Option>
                          <Option value="裤装">裤装</Option>
                          <Option value="半裙">半裙</Option>
                          <Option value="外套">外套</Option>
                          <Option value="羽绒服">羽绒服</Option>
                          <Option value="泳装">泳装</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem className={styles.form_item} label="类别" {...formItemLayout}>
                      {getFieldDecorator('type', {
                        rules: [
                          { required: true, message: '请选择所属季节', type: 'array' },
                        ], initialValue: this.props.record?this.props.record.season:''
                      })(
                        <Select multiple placeholder="请选择所属季节" style={{ width: '100%' }}>
                          <Option value="春夏">春夏</Option>
                          <Option value="秋冬">秋冬</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem className={styles.form_item} label="单价" {...formItemLayout} id="control-input2">
                    {getFieldDecorator('price', {
                      initialValue: this.props.record?this.props.record.price:''
                    }) (
                      <InputNumber span={18} id="control-input2" className={styles.email_input} />
                    )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal>
        </Form>
      </div>
    );
  }
}

ListModal = Form.create({})(ListModal);

export default ListModal;