{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Row, Col, Modal, Form, Button, Input, Select, Upload } from 'antd';
import { ImageUploadList } from './ImageUploadList';
import SelectC from './SelectC';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './PostPicModal.less';

const FormItem = Form.Item;

class PostPicModal extends Component {
  static defaultProps = {
      onChange: new Function
  }

  static PropTypes = {
      onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      success: this.props.success,
      loading: false,
      visible: false,
      url: '',
      title: '默认信息',
      row: 1,
      carbit: 1,
      place: 1,
      cover_image_attributes: [],
    };
  }

  handleOk(e) {
    e.preventDefault();

    const value = this.props.form.getFieldsValue()

    var title = value.title
    var row = this.state.row
    var carbit = this.state.carbit
    var place = this.state.place
    var cover_image_attributes = this.state.cover_image_attributes
    var visible = this.state.visible
    var id = this.props.garment.id

    console.log(title, row, carbit, place, cover_image_attributes, visible, id);

    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      }else{
        this.pushAppoint(title, row, carbit, place, cover_image_attributes, id, visible)
        setTimeout(() => {
        var visible = this.state.visible
          this.setState({visible}, ()=> this.props.onChange(visible));
        }, 1500);
      }
    });
  }

  handleCancel() {
    var visible = this.state.visible
    this.setState({visible}, ()=> this.props.onChange(visible));
  }

  // 预约
  pushAppoint(title, row, carbit, place, cover_image_attributes, id, visible){
    // this.setState({visible}, ()=> this.props.onChange(visible));
    console.log("----------------");
    console.log(row);
    console.log(carbit);
    console.log(place);

    var token = localStorage.token
    var email = localStorage.email
    var ur = "http://closet-api.tallty.com/admin/garments/"+id
    SuperAgent.put(ur)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .field('garment[title]',title)
              .field('garment[row]',row)
              .field('garment[carbit]',carbit)
              .field('garment[place]',place)
              .field('garment[cover_image_attributes][photo]',cover_image_attributes)
              .end( (err, res) => {
                if (res.ok) {
                  console.log(res.body);
                  console.log('修改成功');

                  var newState = !this.state.success;
                  var new_url = this.state.url;
                  this.setState({
                    success: newState, url: new_url
                  });
                  // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
                  this.props.callbackParent(newState, new_url);
                  
                }else{
                  console.log('修改失败');
                }
              })       
  }

  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  handleChange(info){
    var image = info.file.originFileObj
    var url = this.getObjectURL(info.file.originFileObj)
    this.setState({url: url, cover_image_attributes: image })
  }

  get_pic_content(){
    const pic_content = []
    if (this.props.garment.cover_image!==null && this.state.url ==='' ) {
      pic_content.push(<img key={"g"} src={this.props.garment.cover_image} alt="" className={styles.ul_icon}/>)
    }else{
      if (this.state.url !==''){
        pic_content.push(<img key={"g"} src={this.state.url} alt="" className={styles.ul_icon}/>)
      }else{
        pic_content.push(<img key={"g"} src="src/images/add_pic.svg" alt="" className={styles.ul_icon}/>)
      }
    }
    return pic_content
  }

  chooseRCP(r,c,p){
    this.setState({
      row: r,
      carbit: c,
      place: p,
    });
  }

  render() {
    const title = []
    title.push(
      <div key={"h"} className={styles.modal_title}>编辑入库信息</div>
    )
    const { getFieldDecorator } = this.props.form;

    const props = {
      onChange: this.handleChange.bind(this)
    }
    return (
      <div className={styles.link_btn}>
        
        <Modal
          width="60vw"
          style={{ top: 40 }}
          visible={this.props.visible}
          title={title}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
              提交
            </Button>,
          ]}
        >
          <Row className={styles.modal_content}>
            <Form horizontal>
              <Col span={6} className={styles.left_pic_add}>
                {this.get_pic_content()}
                <br/>
                <Upload {...props}>
                  <label className={styles.main_pic}>商品主图</label>
                </Upload>
              </Col>
              <Col span={18} className={styles.right_content}>
                <Row className={styles.c_detail}>
                  <Col span={24}><label className={styles.col_title}>名称</label>D20160813{this.props.garment.id}</Col>
                  <Col span={24}>
                    <Col span={10}>
                      <div className={styles.c_type}><label className={styles.col_title}>类别</label>春夏</div>
                      <div><label className={styles.col_title}>单价</label>￥{this.props.price}/件</div>
                    </Col>
                    <Col span={14}>
                      <div>
                        <Row className={styles.c_type}>
                          <Col span={8}><label className={styles.col_title}>衣服仓储编号</label></Col>
                          <Col span={16}>
                            <SelectC {...this.state} callbackRCP={this.chooseRCP.bind(this)}/>
                          </Col>
                        </Row>
                      </div>
                      <div><label className={styles.col_title}>仓储时长</label>{this.props.store_month}个月</div>
                    </Col>
                  </Col>
                </Row>
                <Row className={styles.c_detail}>
                  <Col span={24} className={styles.col_title}>细节描述图片</Col>
                  <Col span={24}>
                    <ImageUploadList />
                  </Col>
                </Row>
                <Row className={styles.d_detail}>
                  <Col span={24} className={styles.col_title}>描述</Col>
                  <Col span={24}>
                    <FormItem >
                      {getFieldDecorator('title', {
                        rules: [
                          { required: true, message: '请输入描述信息！' },
                        ],
                      })(
                        <Input id="title" name="title" type="textarea" rows={6} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
            </Form>
          </Row>
        </Modal>
      </div>
    );
  }
}

PostPicModal = Form.create({})(PostPicModal);

export default PostPicModal;