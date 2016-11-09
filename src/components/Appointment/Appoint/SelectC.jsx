import React, { Component, PropTypes } from 'react';
import { Row, Col, Select } from 'antd';

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
      
    };
  }

  handleChange(value) {
    console.log("=================");
    console.log(this.props.row);
    this.props.callbackRCP(`${value}`,"","")
  }

  handleChange1(value) {
    this.props.callbackRCP("",`${value}`,"")
  }

  handleChange2(value) {
    this.props.callbackRCP("","",`${value}`)
  }

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
      <Row>
        <Col span={8}>排 {selet1}</Col>
        <Col span={8}>柜 {selet2}</Col>
        <Col span={8}>位 {selet3}</Col>
      </Row>
    );
  }
}

export default SelectC
