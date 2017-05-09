import React, { Component, PropTypes } from 'react';
import { Row, Col, Select } from 'antd';
import styles from './PostPicModal.less';

const Option = Select.Option;

const option1 = []
for (var i = 1; i < 11; i++) {
  const value = i
  option1.push(
    <Option key={value} value={value}>{i}</Option>
  )
}

const option2 = []
for (var i = 1; i < 8; i++) {
  const value = i
  option2.push(
    <Option key={value} value={value}>{i}</Option>
  )
}

const option3 = []
for (var i = 1; i < 6; i++) {
  const value = i
  option3.push(
    <Option key={value} value={value}>{i}</Option>
  )
}

class SelectC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: null,
      carbit: null,
      place: null,
    };
  }

  handleChange(value) {
    this.props.callbackRCP1(value)
  }

  handleChange1(value) {
    this.props.callbackRCP2(value)
  }

  handleChange2(value) {
    this.props.callbackRCP3(value)
  }

  render() {
    const selet1 = []
    selet1.push(
      <Select
        key="row"
        showSearch
        value={this.props.row || ''}
        style={{ width: 60, height: 16, lineHeight: 16 }}
        optionFilterProp="children"
        notFoundContent="Nothing found"
        onChange={this.handleChange.bind(this)}
      >
        {option1}
      </Select>
    )
    const selet2 = []
    selet2.push(
      <Select
        key="cabinet"
        showSearch
        style={{ width: 60, height: 16, lineHeight: 16 }}
        value={this.props.carbit || ''}
        optionFilterProp="children"
        notFoundContent="Nothing found"
        onChange={this.handleChange1.bind(this)}
      >
        {option2}
      </Select>
    )
    const selet3 = []
    selet3.push(
      <Select
        key="place"
        showSearch
        value={this.props.place || ''}
        style={{ width: 60, height: 16, lineHeight: 16 }}
        optionFilterProp="children"
        notFoundContent="Nothing found"
        onChange={this.handleChange2.bind(this)}
      >
        {option3}
      </Select >
    )
    return (
      <Row className={styles.selectRow}>
        <Col span={6} className={styles.selectCell}>
          <label>排</label> {selet1}
        </Col>
        <Col span={6} className={styles.selectCell}>
          <label>柜</label> {selet2}
        </Col>
        <Col span={6} className={styles.selectCell}>
          <label>位</label> {selet3}
        </Col>
      </Row>
    );
  }
}

export default SelectC
