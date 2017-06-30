/* 预约订单管理组件 */
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import {
  Row, Col, Modal, Form, Button, Input, Select,
  Upload, Icon, Tag, Menu, Dropdown, Tooltip, message,
} from 'antd';
import { ImageUploadList } from './ImageUploadList';
import SelectC from './SelectC';
import ActiveLink from '../../../layouts/ActiveLink/ActiveLink'
import styles from './PostPicModal.less';

const FormItem = Form.Item;

class PostPicModal extends Component {
  static defaultProps = {
    onChange: Function,
  }

  static PropTypes = {
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      success: this.props.success,
      tags: [],
      loading: false,
      visible: false,
      url: '',
      for_url: this.props.garmentOne.detail_image,
      detail_files: [],
      title: '默认信息',
      row: 0,
      carbit: 0,
      place: 0,
      coverImageAttribute: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { garmentOne } = nextProps;
    const { url, row, carbit, place, tags } = this.state;
    const pos = garmentOne.row_carbit_place ? garmentOne.row_carbit_place.split('-') : [];
    if (this.props.garmentOne.cover_image !== garmentOne.cover_image) {
      this.setState({
        tags: garmentOne.tag_list || [],
        url: garmentOne.cover_image,
        row: pos[0],
        carbit: pos[1],
        place: pos[2],
        title: garmentOne.title,
        for_url: garmentOne.detail_image,
      });
    }
  }

  handleOk(e) {
    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    const { row, carbit, place, coverImageAttribute, url } = this.state
    const { garmentOne } = this.props;
    const rowO = row === 0 && garmentOne.row_carbit_place ? garmentOne.row_carbit_place.split('-')[0] : row
    const carbitO = carbit === 0 && garmentOne.row_carbit_place ? garmentOne.row_carbit_place.split('-')[1] : carbit
    const placeO = place === 0 && garmentOne.row_carbit_place ? garmentOne.row_carbit_place.split('-')[2] : place
    const titleO = value.title ? 'value.title' : garmentOne.title
    const coverImageAttributeO = coverImageAttribute || garmentOne.cover_image;
    const idO = garmentOne.id ? garmentOne.id : null
    const description = value.description
    const id = 0

    if (!url) {
      message.warning('请上传衣服封面图片');
      return;
    }
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        message.warning('表单信息填写错误');
      } else if (!(row && carbit && place)) {
        message.warning('请选择仓储编号');
      } else {
        this.setState({ loading: true });
        if (this.props.garmentOne && idO) {
          this.updateGarment(titleO, rowO, carbitO, placeO, coverImageAttributeO, idO)
        } else {
          this.createGarment(titleO, rowO, carbitO, placeO, coverImageAttributeO, idO)
        }
      }
    })
  }

  imgPush() {
    const lists = []
    for (let item = 0; item < this.state.detail_files.length; item++) {
      lists.push(`garment[detail_images_${item}_attributes][photo]`)
    }
    return lists
  }

  handleCancel() {
    const visible = this.state.visible
    this.setState({ visible }, () => this.props.onChange(visible));
  }

  errorLabel() {
    const picErroInfo = []
    const { url } = this.state;
    if (!url) {
      picErroInfo.push(<div key="err_image_info" className={styles.err_image_info}>请上传商品主图！</div>)
    }
    return picErroInfo;
  }

  createGarment(title, row, carbit, place, coverImageAttribute, id) {
    // 细节图
    const images = {};
    this.state.detail_files.forEach((file, index) => {
      images[`garment[detail_image_${index + 1}_attributes][photo]`] = file;
    });
    // 主图
    if (typeof (coverImageAttribute) !== 'string') {
      images['garment[cover_image_attributes][photo]'] = coverImageAttribute;
    }
    SuperAgent
      .post(`http://closet-api.tallty.com/admin/exhibition_chests/${this.props.id}/garments`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .field('appointment_id', this.props.ap_id)
      .field('garment[title]', title)
      .field('garment[row]', row)
      .field('garment[add_tag_list]', this.state.tags)
      .field('garment[carbit]', carbit)
      .field('garment[place]', place)
      .field('garment[cover_image_attributes][photo]', coverImageAttribute)
      .field(images)
      .end((err, res) => {
        if (!err || err === null) {
          // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
          this.props.onChange(this.state.visible);
          this.props.callbackParent();
          this.setState({
            loading: false,
            tags: [],
            visible: false,
            url: '',
            for_url: this.props.garmentOne.detail_image,
            detail_files: [],
            title: '',
            row: 0,
            carbit: 0,
            place: 0,
            coverImageAttribute: null,
          });
        } else {
          message.error('提交衣服信息失败，请稍后重试！');
          this.setState({ loading: false });
        }
      })
  }

  updateGarment(title, row, carbit, place, coverImageAttribute, id) {
    const { tags, detail_files } = this.state;
    const { garmentOne } = this.props;
    const addTags = tags.filter(tag => (!garmentOne.tag_list.includes(tag)));
    const removeTags = garmentOne.tag_list.filter(tag => (!tags.includes(tag)));
    // 细节图
    const images = {};
    detail_files.forEach((file, index) => {
      images[`garment[detail_image_${index + 1}_attributes][photo]`] = file;
    });
    // 主图
    if (typeof (coverImageAttribute) !== 'string') {
      images['garment[cover_image_attributes][photo]'] = coverImageAttribute;
    }
    SuperAgent
      .put(`http://closet-api.tallty.com/admin/exhibition_chests/${this.props.id}/garments/${id}`)
      .set('Accept', 'application/json')
      .set('X-Admin-Token', localStorage.token)
      .set('X-Admin-Email', localStorage.email)
      .field('appointment_id', this.props.ap_id)
      .field('garment[title]', title)
      .field('garment[add_tag_list]', addTags)
      .field('garment[remove_tag_list]', removeTags)
      .field('garment[row]', row)
      .field('garment[carbit]', carbit)
      .field('garment[place]', place)
      .field(images)
      .end((err, res) => {
        if (!err || err === null) {
          // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
          this.props.onChange(this.state.visible);
          this.props.callbackParent();
          this.setState({ loading: false });
        } else {
          message.error('更新衣服信息失败');
          this.setState({ loading: false });
        }
      })
  }

  getObjectURL(file) {
    let url = null;
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
    const fileList = this.state.for_url === undefined ? [] : this.state.for_url
    const fileListD = this.state.detail_files

    const fileUrl = this.getObjectURL(info.target.files[0])
    fileList.push(
      fileUrl
    )
    fileListD.push(
      info.target.files[0]
    )
    this.setState({ for_url: fileList, detail_files: fileListD })
  }

  deleteDetailPic(i) {
    const fileList = this.state.for_url === undefined ? [] : this.state.for_url
    fileList.splice(i, 1);//splice返回的是删掉的部分
    this.setState({ for_url: fileList });
  }

  getPicContentMore() {
    const urls = this.state.for_url === undefined ? [] : this.state.for_url
    const picContent = []
    for (let i = 0; i < urls.length; i++) {
      picContent.push(<li key={-i} className={styles.img_ul_icon}>
        <img src={`${urls[i]}`} alt="" className={styles.ul_icon} />
        <Icon onClick={this.deleteDetailPic.bind(this, i)} type="close-circle-o" className={styles.delete_icon} />
      </li>)
    }
    return picContent
  }

  handleChange(info) {
    const image = info.file.originFileObj;
    const murl = this.getObjectURL(info.file.originFileObj)
    this.setState({ url: murl, coverImageAttribute: image })
  }

  getPicContent() {
    const picContent = [];
    if (!this.state.url && this.props.garmentOne.cover_image) {
      picContent.push(<img key={'g'} src={this.props.garmentOne.cover_image} alt="" className={styles.ul_icon} />)
    } else {
      if (this.state.url) {
        picContent.push(<img key={'g'} src={this.state.url} alt="" className={styles.ul_icon} />)
      } else {
        picContent.push(<img key={'g'} src="src/images/add_pic.svg" alt="" className={styles.ul_icon} />)
      }
    }
    return picContent
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  handleMenuClick(e) {
    const tags = this.state.tags;
    if (tags.includes(e.key)) return;
    const newTags = [...tags, e.key];
    this.setState({
      tags: newTags,
    });
  }

  chooseRCP1(r) {
    this.setState({
      row: r,
    });
  }
  chooseRCP2(c) {
    this.setState({
      carbit: c,
    });
  }
  chooseRCP3(p) {
    this.setState({
      place: p,
    });
  }

  getAllTagsMenu() {
    const { supportTags } = this.props;
    let values = [];
    if (supportTags) {
      values = supportTags.map(item => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))
    }
    return values;
  }

  render() {
    const modalTitle = []
    modalTitle.push(
      <div key={'h'} className={styles.modal_title}>编辑入库信息</div>
    )
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const { tags, title } = this.state;
    const { garmentOne } = this.props;
    const props = {
      onChange: this.handleChange.bind(this),
    }
    const menu = (
      <Menu onClick={this.handleMenuClick.bind(this)}>
        {this.getAllTagsMenu()}
      </Menu>
    );
    return (
      <div className={styles.link_btn}>
        <Modal
          width="60vw"
          style={{ top: 40 }}
          visible={this.props.visible}
          title={modalTitle}
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
            <Form layout="horizontal">
              <Col span={6} className={styles.left_pic_add}>

                <Upload {...props}>
                  {this.getPicContent()}
                  <br />
                  <label className={styles.main_pic}>商品主图</label>
                  {this.errorLabel()}
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
                        initialValue: title,
                        rules: [
                          { required: true, message: '请输衣服名称！' },
                        ],
                      })(
                        <Input id="title" name="title" placeholder="衣服名称" />
                        )}
                    </FormItem>
                  </Col>
                  <Col span={24} style={{ marginBottom: 10 }}>
                    <Col span={2} className={styles.name_label}>类别:</Col>
                    <Col span={22}>
                      {tags.map((tag, index) => {
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag key={tag} className={styles.tag} closable afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                          </Tag>
                        );
                        return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                      })}
                      <Dropdown overlay={menu}>
                        <Button className={styles.tag} size="small" type="dashed" >+</Button>
                      </Dropdown>
                    </Col>
                  </Col>
                  <Col span={24} className={styles.c_type}>
                    <Col span={6}><label className={styles.col_title}>衣服仓储编号:</label></Col>
                    <Col span={18}>
                      <SelectC
                        {...this.state}
                        callbackRCP1={this.chooseRCP1.bind(this)}
                        callbackRCP2={this.chooseRCP2.bind(this)}
                        callbackRCP3={this.chooseRCP3.bind(this)}
                      />
                    </Col>
                  </Col>
                </Row>
                <Row className={styles.c_detail}>
                  <Col span={24} className={styles.col_title}>细节描述图片</Col>
                  <Col span={24}>
                    <div className="clearfix">
                      {this.getPicContentMore()}
                      <span className={styles.inputContainer}>
                        <input onChange={this.handleChangeMore.bind(this)} multiple type="file" />
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
                        initialValue: garmentOne.description ? garmentOne.description : '',
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
