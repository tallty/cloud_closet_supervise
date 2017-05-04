{/* 预约订单管理组件 */}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Row, Col, Modal, Form, Button, Input, Select, Upload, Icon, Tag, Menu, Dropdown } from 'antd';
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
      tags: ['Tag 1', 'Tag 2'],
      loading: false,
      visible: false,
      url: '',
      for_url: this.props.garmentOne.detail_image,
      car_url: [],
      title: '默认信息',
      row: 0,
      carbit: 0,
      place: 0,
      cover_image_attributes: [],
    };
  }

  componentDidMount() {

  }

  handleOk(e) {
    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    const { row, carbit, place, cover_image_attributes, url } = this.state
    const rowO = row === 0 && this.props.garmentOne !== undefined ? this.props.garmentOne.row_carbit_place.split('-')[0] : row
    const carbitO = carbit === 0 && this.props.garmentOne !== undefined ? this.props.garmentOne.row_carbit_place.split('-')[1] : carbit
    const placeO = place === 0 && this.props.garmentOne !== undefined ? this.props.garmentOne.row_carbit_place.split('-')[2] : place
    const titleO = value.title ? value.title : this.props.garmentOne.title
    const cover_image_attributesO = cover_image_attributes ?  cover_image_attributes : this.props.garmentOne.cover_image
    const idO = this.props.garmentOne.id ? this.props.garmentOne.id : null
    const description = value.description
    const id = 0

    console.log(title, row, carbit, place);

    url ?
      this.props.form.validateFields((errors, values) => {
        if (errors) {
          console.log('Errors in form!!!');
        } else {
          console.log(this.props.garmentOne);
          this.props.garmentOne !== undefined && idO !== null ?
          this.pushOneAppoint(titleO, rowO, carbitO, placeO, cover_image_attributesO, idO)
          :
          this.pushAppoint(titleO, rowO, carbitO, placeO, cover_image_attributesO, idO)
          setTimeout(() => {
            const visibleN = this.state.visible
            this.setState({ visibleN }, () => this.props.onChange(visibleN));
          }, 1500);
        }
      })
      :
      console.log("请上传商品主图！");
  }

  img_push() {
    const lists = []
    for (let item = 0; item < this.state.car_url.length; item++) {
      lists.push(`garment[detail_images_${item}_attributes][photo]`)
      // lists[`garment[detail_images_${item}_attributes][photo]`] = listM
    }
    console.log('我是细节图组');
    console.log(lists);
    return lists
  }

  handleCancel() {
    const visible = this.state.visible
    this.setState({ visible }, () => this.props.onChange(visible));
  }

  error_label() {
    const picErroInfo = []
    const { url } = this.state
    url ? '' : picErroInfo.push(<div key="err_image_info" className={styles.err_image_info}>请上传商品主图！</div>)
    return picErroInfo
  }

  // 提交订单修改
  pushAppoint(title, row, carbit, place, coverImageAttributes, id) {
    // this.setState({visible}, ()=> this.props.onChange(visible));
    const ur = `http://closet-api.tallty.com/admin/exhibition_chests/${this.props.id}/garments`
    const token = localStorage.token
    const email = localStorage.email
    const appointmentId = this.props.ap_id
    console.log('====-----======-----======');
    console.log(row, carbit, place);
    console.log('我是主图');
    console.log(coverImageAttributes);
    SuperAgent.post(ur)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .field('appointment_id', appointmentId)
              .field('garment[title]', title)
              .field('garment[row]', row)
              .field('garment[carbit]', carbit)
              .field('garment[place]', place)
              .field('garment[cover_image_attributes][photo]', coverImageAttributes)
              .end((err, res) => {
                console.log('我在处理提交请求');
                console.log(res)
                const newState = !this.state.success;
                const newUrl = this.state.url;
                const rowCarbitPlace = `${row}-${carbit}-${place}`
                this.pushDetailPics(res.body.id)
                this.setState({
                  success: newState, url: '',
                });
                // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
                this.props.callbackParent();
              })
  }

  // 提交订单修改
  pushOneAppoint(title, row, carbit, place, coverImageAttributes, id) {
    // this.setState({visible}, ()=> this.props.onChange(visible));
    const ur = `http://closet-api.tallty.com/admin/exhibition_chests/${this.props.id}/garments/${id}`
    const token = localStorage.token
    const email = localStorage.email
    const appointmentId = this.props.ap_id
    console.log('====-----======-----======');
    console.log(row, carbit, place);
    console.log('我是主图');
    console.log(coverImageAttributes);
    SuperAgent.put(ur)
              .set('Accept', 'application/json')
              .set('X-Admin-Token', token)
              .set('X-Admin-Email', email)
              .field('appointment_id', appointmentId)
              .field('garment[title]', title)
              .field('garment[row]', row)
              .field('garment[carbit]', carbit)
              .field('garment[place]', place)
              .field('garment[cover_image_attributes][photo]', coverImageAttributes)
              .end((err, res) => {
                console.log('我在处理修改的提交请求');
                console.log(res)
                const newState = !this.state.success;
                const newUrl = this.state.url;
                const rowCarbitPlace = `${row}-${carbit}-${place}`
                this.pushDetailPics(res.body.id)
                this.setState({
                  success: newState, url: '',
                });
                // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
                this.props.callbackParent();
              })
  }

  pushDetailPics(id) {
    const lists = this.img_push()
    console.log(lists)
    const token = localStorage.token
    const email = localStorage.email
    const appointmentId = this.props.ap_id
    const ur = `http://closet-api.tallty.com/admin/exhibition_chests/${this.props.id}/garments/${id}`
    lists.forEach((list, i, obj) => {
      SuperAgent.post(ur)
                .set('Accept', 'application/json')
                .set('X-Admin-Token', token)
                .set('X-Admin-Email', email)
                .field('appointment_id', appointmentId)
                .field(list, this.state.car_url[i])
                .end((err, res) => {
                  console.log(res);
                })
    })
  }

  getObjectURL(file) {
    var url = null;
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file);
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  handleChangeMore(info) {
    console.log('================');
    const fileList = this.state.for_url === undefined ? [] : this.state.for_url
    const fileListD = this.state.car_url

    const fileUrl = this.getObjectURL(info.target.files[0])
    fileList.push(
      fileUrl
    )
    fileListD.push(
      info.target.files[0]
    )
    console.log(fileList);
    this.setState({ for_url: fileList, car_url: fileListD })
  }

  delete_detail_pic(i) {
    const fileList = this.state.for_url === undefined ? [] : this.state.for_url
    fileList.splice(i, 1);//splice返回的是删掉的部分
    this.setState({ for_url: fileList });
  }

  get_pic_content_more() {
    const urls = this.state.for_url === undefined ? [] : this.state.for_url
    const picContent = []
    for (let i = 0; i < urls.length; i++) {
      picContent.push(<li key={-i} className={styles.img_ul_icon}>
        <img src={`${urls[i]}`} alt="" className={styles.ul_icon} />
        <Icon onClick={this.delete_detail_pic.bind(this, i)} type="close-circle-o" className={styles.delete_icon} />
      </li>)
    }
    return picContent
  }

  handleChange(info){
    var image = info.file.originFileObj
    var url = this.getObjectURL(info.file.originFileObj)
    console.log('in modal show');
    console.log(url);
    this.setState({ url: url, cover_image_attributes: image })
  }

  get_pic_content() {
    const pic_content = []
    if (this.state.url === '' && this.props.garmentOne.cover_image !== undefined) {
      console.log(this.props.garmentOne.cover_image)
      console.log("nnnnnnnnnnnnnnnnnnnn")
      pic_content.push(<img key={'g'} src={this.props.garmentOne.cover_image} alt="" className={styles.ul_icon} />)
    } else {
      if (this.state.url !== '') {
        pic_content.push(<img key={'g'} src={this.state.url} alt="" className={styles.ul_icon} />)
      } else {
        pic_content.push(<img key={'g'} src="src/images/add_pic.svg" alt="" className={styles.ul_icon} />)
      }
    }
    return pic_content
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  }

  handleMenuClick(e) {
    const tags = this.state.tags;
    const new_tags = [...tags, e.key];
    console.log(tags);
    this.setState({
      tags: new_tags
    });
  }

  chooseRCP1(r) {
    console.log('================');
    console.log(r);
    this.setState({
      row: r,
    });
  }
  chooseRCP2(c) {
    console.log('================');
    console.log(c);
    this.setState({
      carbit: c,
    });
  }
  chooseRCP3(p) {
    console.log('================');
    console.log(p);
    this.setState({
      place: p,
    });
  }

  render() {
    const title = []
    title.push(
      <div key={'h'} className={styles.modal_title}>编辑入库信息</div>
    )
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { tags } = this.state;
    const props = {
      onChange: this.handleChange.bind(this)
    }
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        <Menu.Item key="礼服">礼服</Menu.Item>
        <Menu.Item key="连衣裙">连衣裙</Menu.Item>
        <Menu.Item key="短裙">短裙</Menu.Item>
        <Menu.Item key="套装">套装</Menu.Item>
        <Menu.Item key="衬衫">衬衫</Menu.Item>
        <Menu.Item key="T恤">T恤</Menu.Item>
        <Menu.Item key="裤子">裤子</Menu.Item>
        <Menu.Item key="西服">西服</Menu.Item>
        <Menu.Item key="外套">外套</Menu.Item>
        <Menu.Item key="羽绒服">羽绒服</Menu.Item>
        <Menu.Item key="卫衣棉服">卫衣棉服</Menu.Item>
        <Menu.Item key="针织衫毛衣">针织衫毛衣</Menu.Item>
      </Menu>
    );    
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
                  <br />
                  <label className={styles.main_pic}>商品主图</label>
                  {this.error_label()}
                </Upload>

              </Col>
              <Col span={18} className={styles.right_content}>
                <Row className={styles.c_detail}>
                  <Col span={2} className={styles.name_label}>
                    名称
                  </Col>
                  <Col span={22}>
                    <FormItem>
                      {getFieldDecorator('title', {
                        rules: [
                          { required: true, message: '请输衣服名称！' },
                        ],
                      })(
                        <Input id="title" name="title" placeholder={this.props.garmentOne.title ? this.props.garmentOne.title : ''} />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <Col span={24} className={styles.name_label}>类别:</Col>
                    <Col span={22} offset={2}>
                      <div className={styles.c_type}>
                        <div>
                          {tags.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                              <Tag key={tag} className={styles.tag} closable={true} afterClose={() => this.handleClose(tag)}>
                                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                              </Tag>
                            );
                            return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                          })}
                          <Dropdown overlay={menu}>
                            <Button className={styles.tag} size="small" type="dashed" >+</Button>
                          </Dropdown>
                        </div>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div>
                        <Row className={styles.c_type}>
                          <Col span={24}><label className={styles.col_title}>衣服仓储编号:</label></Col>
                          <Col span={12} offset={4}>
                            <SelectC {...this.state} callbackRCP1={this.chooseRCP1.bind(this)} callbackRCP2={this.chooseRCP2.bind(this)} callbackRCP3={this.chooseRCP3.bind(this)} />
                          </Col>
                        </Row>
                      </div>
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
                      {getFieldDecorator('description', {
                        rules: [
                          { message: '请输入描述信息！' },
                        ],
                      })(
                        <Input id="description" name="description" type="textarea" rows={3} />
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
