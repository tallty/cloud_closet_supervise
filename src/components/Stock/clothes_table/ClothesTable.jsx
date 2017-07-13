import React, { Component, PropTypes } from 'react'
import css from './clothes_table.less'
import { Row, Col, Button } from 'antd'

const { number, string, arrayOf, shape, func, bool } = PropTypes;
const parseStoreMonth = new Map([
  [3, '三个月'], [6, '六个月'], [9, '九个月'],
  [12, '一年'], [24, '两年'],
]);
const imageMap = new Map([
  ['叠放柜', '/src/images/icon_stack_sm.svg'],
  ['挂柜', '/src/images/icon_hang_sm.svg'],
  ['组合柜', '/src/images/icon_hang_sm.svg'],
  ['单件礼服', '/src/images/icon_full_dress_sm.svg'],
  ['礼服柜', '/src/images/icon_full_dress_sm.svg'],
  ['真空袋-中', '/src/images/icon_bag_sm.svg'],
  ['真空袋-大', '/src/images/icon_bag_sm.svg'],
]);

export class ClothesTable extends Component {
  getOrderList() {
    const data = []
    this.props.groups.forEach((item, index, obj) => {
      data.push(
        <Row key={index} className={css.order_item}>
          <Col span={7} style={{ textAlign: 'left' }}>
            <div className={css.img_div}>
              <img src={imageMap.get(item.title)} alt="icon" />
            </div>
            <div className={css.kind}>{item.title}</div>
          </Col>
          <Col span={4}>{item.is_chest ? parseStoreMonth.get(item.store_month) : '-'}</Col>
          <Col span={3}>{item.count} 个</Col>
          <Col span={3}>{item.unit_price}/月</Col>
          <Col span={4}>{item.price}</Col>
          <Col span={3}>
            <Button onClick={this.handleClick.bind(this, index, item)} type="danger">删除</Button>
          </Col>
        </Row>
      )
    })
    return data;
  }

  handleClick(index, item) {
    this.props.itemClickEvent(index, item);
  }

  render() {
    return (
      <div>
        <Row className={css.order_table_header}>
          <Col span={7} style={{textAlign: 'left', paddingLeft: 4}}>种类</Col>
          <Col span={4}>仓储时长</Col>
          <Col span={3}>数量</Col>
          <Col span={3}>单价</Col>
          <Col span={4}>总价</Col>
          <Col span={3}>操作</Col>
        </Row>
        {
          this.props.groups.length > 0 ?
            this.getOrderList() :
            <Row>
              <Col span={24} className={css.empty_table}>未添加衣柜</Col>
            </Row>
        }
      </div>
    )
  }
}

ClothesTable.defaultProps = {
  groups: [],
  onTableClickEvent: () => {}
}

ClothesTable.PropTypes = {
  groups: arrayOf(
    shape({
      count: number,
      store_month: number,
      price: number,
      title: string,
      unit_price: number,
      price_icon_image: string,
      is_chest: bool
    })
  ),
  onTableClickEvent: func
}
