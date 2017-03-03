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
    console.log(value);
    this.props.callbackRCP1(value)
    // this.setState({row: value,})
    // if (this.state.place&&this.state.row&&this.state.carbit){
    //   var row = value
    //   var carbit = this.state.carbit
    //   var place = this.state.place
    //   this.backParent(row, carbit, place)
    // }
  }

  handleChange1(value) {
    console.log(value);
    this.props.callbackRCP2(value)
    // this.setState({carbit: value,})
    // if (this.state.place&&this.state.row&&this.state.carbit){
    //   var row = this.state.row
    //   var carbit = value
    //   var place = this.state.place
    //   this.backParent(row, carbit, place)
    // }
  }

  handleChange2(value) {
    console.log(value);
    this.props.callbackRCP3(value)
    // this.setState({place: value,})
    // if (this.state.place&&this.state.row&&this.state.carbit){
    //   var row = this.state.row
    //   var carbit = this.state.carbit
    //   var place = value
    //   this.backParent(row, carbit, place)
    // }
  }

  // backParent(row, carbit, place){
  //   console.log(row, carbit, place);
  //   row&&carbit&&place?this.props.callbackRCP(row, carbit, place):''
  // }

  render() {
    const selet1 = []
    selet1.push(
      <Select key={"row"} showSearch
            style={{ width: 35, height: 16, lineHeight: 16 }}
            placeholder="1 "
            optionFilterProp="children"
            notFoundContent="Nothing found"
            onChange={this.handleChange.bind(this)}
          >
            {option1}
          </Select>
    )
    const selet2 = []
    selet2.push(
      <Select key={"cabinet"} showSearch
            style={{ width: 35, height: 16, lineHeight: 16 }}
            placeholder={this.props.row}
            optionFilterProp="children"
            notFoundContent="Nothing found"
            onChange={this.handleChange1.bind(this)}
          >
            {option2}
          </Select>
    )
    const selet3 = []
    selet3.push(
      <Select key={"place"} showSearch
            style={{ width: 35, height: 16, lineHeight: 16 }}
            placeholder="1 "
            optionFilterProp="children"
            notFoundContent="Nothing found"
            onChange={this.handleChange2.bind(this)}
          >
            {option3}
          </Select>
    )
    return (
      <Row className={styles.selectRow}>
        <Col span={2}><label>排</label></Col>
        <Col span={6} className={styles.selectCell}>{selet1}</Col>
        <Col span={2}><label>柜</label></Col>
        <Col span={6} className={styles.selectCell}>{selet2}</Col>
        <Col span={2}><label>位</label></Col>
        <Col span={6} className={styles.selectCell}>{selet3}</Col>
      </Row>
    );
  }
}

export default SelectC
