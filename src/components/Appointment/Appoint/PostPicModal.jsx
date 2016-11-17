{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Row, Col, Modal, Form, Button, Input, Select, Upload, Icon } from 'antd';
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
      for_url: [],
      car_url: [],
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

    console.log(title, row, carbit, place);

    this.props.garment.cover_image||this.state.url
      ?
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
      })
      :
      console.log("请上传商品主图！");
  }

  img_push(){
    var lists = []
    for (let item of this.state.car_url) {
      var list_m = {photo: item}
      lists.push(list_m)
    }
    console.log("我是细节图组");
    console.log(lists);
    return lists
  }

  handleCancel() {
    var visible = this.state.visible
    this.setState({visible}, ()=> this.props.onChange(visible));
  }

  error_label(){
    const pic_erro_info= []
    this.props.garment.cover_image||this.state.url?"":pic_erro_info.push(<div key="err_image_info" className={styles.err_image_info}>请上传商品主图！</div>)
    return pic_erro_info
  }

  // 提交订单修改
  pushAppoint(title, row, carbit, place, cover_image_attributes, id, visible){
    // this.setState({visible}, ()=> this.props.onChange(visible));

    var token = localStorage.token
    var email = localStorage.email
    var appointment_id = this.props.appoint_id
    var store_month = this.props.store_month
    var lists = this.img_push()
    console.log("====-----======-----======");
    console.log(lists);
    var ur = "http://closet-api.tallty.com/admin/garments/"+id

    console.log(row, carbit, place);
    console.log("我是主图");
    console.log(cover_image_attributes);

    SuperAgent.patch(ur)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .field('appointment_id',appointment_id)
              .field('store_month',store_month)
              .field('garment[title]',title)
              .field('garment[row]',row)
              .field('garment[carbit]',carbit)
              .field('garment[place]',place)
              .field('garment[cover_image_attributes][photo]',cover_image_attributes)
              .field('garment[detail_images_attributes][]', lists)
              .end( (err, res) => {
                var newState = !this.state.success;
                var new_url = this.state.url;
                var row_carbit_place = `${row}-${carbit}-${place}`
                this.setState({
                  success: newState, url: new_url
                });
                console.log(row_carbit_place);
                // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
                this.props.callbackParent(newState, new_url, row_carbit_place);
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

  handleChangeMore(info) {
    console.log("================");
    const fileList = this.state.for_url
    const fileList_d = this.state.car_url

    const file_url = this.getObjectURL(info.target.files[0])
    fileList.push(
      file_url
    )
    fileList_d.push(
      info.target.files[0]
    )
    console.log(fileList);
    this.setState({for_url: fileList, car_url: fileList_d })
  }

  delete_detail_pic(i){
    let fileList = this.state.for_url;
    fileList.splice(i,1);//splice返回的是删掉的部分
    this.setState({for_url: fileList });
  }

  get_pic_content_more(){
    const urls = this.state.for_url
    const pic_content = []
    for (let i=0; i < urls.length; i++) {
      pic_content.push(<li key={-i} className={styles.img_ul_icon}><img src={`${urls[i]}`} alt="" className={styles.ul_icon}/><Icon onClick={this.delete_detail_pic.bind(this, i)} type="close-circle-o" className={styles.delete_icon} /></li>)
    }
    return pic_content
  }

  handleChange(info){
    var image = info.file.originFileObj
    var url = this.getObjectURL(info.file.originFileObj)
    console.log('in modal show');
    console.log(url);
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

  chooseRCP1(r){
    console.log("================");
    console.log(r);
    this.setState({
      row: r,
    });
  }
  chooseRCP2(c){
    console.log("================");
    console.log(c);
    this.setState({
      carbit: c,
    });
  }
  chooseRCP3(p){
    console.log("================");
    console.log(p);
    this.setState({
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
    console.log("+++++++++++++++++++++++=");
    console.log(this.props.garment);
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

                <Upload {...props}>
                  {this.get_pic_content()}
                  <br/>
                  <label className={styles.main_pic}>商品主图</label>
                  {this.error_label()}
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
                            <SelectC {...this.state} callbackRCP1={this.chooseRCP1.bind(this)} callbackRCP2={this.chooseRCP2.bind(this)} callbackRCP3={this.chooseRCP3.bind(this)}/>
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
                    <div className="clearfix">
                      {this.get_pic_content_more()}
                      <span className={styles.inputContainer}>
                        <input onChange={this.handleChangeMore.bind(this)} multiple={true} type="file" />
                        <div className={styles.btn_add}><Icon type="plus" />添加</div>
                      </span>
                    </div>

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