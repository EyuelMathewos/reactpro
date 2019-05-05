
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import axios from 'axios';
import qs from 'qs';
import auth from './auth';
import { withRouter } from "react-router-dom";


import {
  Form, Icon, Input, Button, Checkbox, Card
} from 'antd';

 class login extends React.Component {

 
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        localStorage.setItem("hello","hello world form react");
        axios.post('http://localhost:3000/api/Accounts/login',qs.stringify(values))
    .then(function (response) {
    console.log(response);
    localStorage.setItem("Accesstoken",response.data.id);
    //getting user information {"where": {"id": "5cb156c02ce1b8041e980450"}}
    axios.get("http://localhost:3000/api/Accounts/"+response.data.userId)
    .then(function (getResponse) {
      console.log(getResponse);
      localStorage.setItem("userRole",getResponse.data.role);
      localStorage.setItem("userName",getResponse.data.username);
      //this is the redirect by role 
      let authuser = new auth();
       console.log("this the value :"+authuser.isAuthenticated());
      
      //this is the reditect by role 
      
    })
    .catch(function (error) {
      console.log(error);
      
    });
    //getting user information

    
  })
  .catch(function (error) {
    
    console.log(error);
  });
        console.log('Received values of form: ', values);
      // let valu="values";
       console.log(qs.stringify(values));
       console.log("?filter="+qs.stringify({"where": {"id": "5cb156c02ce1b8041e980450"}}));
      }
    });
  }
  

  render() {
      
    const { getFieldDecorator } = this.props.form;
    
    return (
         
    
         

        <div align="center" style={{ background: '#ECECEC', padding: '100px',minHeight: 710  }}>
        <Card title="Login" hoverable="true" bordered={false} style={{ width: 400 }}>
            <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </Form.Item>
      </Form>
      </Card>
        </div>
      
    );
  }
}

export const Login = Form.create({ name: 'normal_login' })(login);

// ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('container'));
          