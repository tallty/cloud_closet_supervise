{/*登录页*/}
import React, { Component, PropTypes } from 'react';
import SuperAgent from 'superagent'
import { Form, Button, Row, Col, Input } from 'antd'
import { Link, withRouter } from 'react-router'
import styles from './App.less';
import MainLayout from '../layouts/MainLayout/MainLayout';

const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    localStorage.email = ''
    localStorage.password = ''     
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.props.form.getFieldsValue()
    var email = value.email
    var password = value.password
    this.pushAppoint(email, password )
  }

  // 预约
  pushAppoint(email, password){
    var url = "http://closet-api.tallty.com/admins/sign_in"
    SuperAgent.post(url)
              .set('Accept', 'application/json')
              .send({'admin': {'email': email, 'password': password}})
              .end( (err, res) => {
                if (res.ok) {
                  localStorage.email = email
                  localStorage.token = res.body.authentication_token
                  this.props.router.replace('/appoint')
                }
              })       
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.container}>
        <div className={styles.login_content}>
          <Row className={styles.order_content}>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)} >
              <Col span={24} className={styles.login_title}>后台登录</Col>
              <Col span={24}>
                <FormItem id="control-input1" >
                  {getFieldDecorator('email', { initialValue: '' })(
                    <Input id="control-input1" placeholder="用户邮箱"/>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem id="control-input2">
                {getFieldDecorator('password', { initialValue: '' })(
                  <Input type="password" id="control-input2" placeholder="密码" className={styles.email_input}/>
                )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  <Button className={styles.order_btn} type="primary" htmlType="submit">登 录</Button>
                </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
      // <MainLayout>
      //   <Todos location={location} />
      // </MainLayout>
    );
  }
};

App = Form.create({})(App);

export default withRouter(App);
