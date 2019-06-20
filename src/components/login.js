
import React from 'react';
import {ReactDOM} from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import axios from 'axios';
import qs from 'qs';
import auth from './auth';
import { withRouter } from "react-router-dom";
//import hello from './landingPage';
import { SiderDemo } from './src/Admin/dashboard';
import UserService from "../service/UserServices";
import ClientSession from "../service/ClientSession";
import Api from '../service/Api';
import * as session from 'browser-session-store';
import {
  Form, Icon, Input, Button, Checkbox, Card,message
} from 'antd';
      let authuser = new auth();
  
 class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      checked: ""
    };
  }
 
  
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UserService.login(values.username, values.password)
          .then(response => {
            console.log("the data sored"+response.user.id)
            if (response.success) {
              message.success(response.message);
              //setting information that the user is logged in 
              ClientSession.isLoggedIn(isLoggedIn => {
                this.setState(
                  {
                    isLoggedIn: isLoggedIn,
                    checked: "yes"
                  },
                  () => {
                    localStorage.setItem("authorized","true");
                    console.log("hello world this is working yaa"+this.state.isLoggedIn);
                    return "do nothing";
                  }
                );
              });
              
              //getting user role and user information
              Api.find('accounts', response.user.userId, null)
              .then((getResponse) => {
                  console.log("response is", getResponse);
                  session.put("userData", getResponse.data);
                  let results=session.get("userData",(err, results) => (console.log(results)) );
                        //checking user loggedin the redirect to pages based on role
                        if(this.state.isLoggedIn){
                         if("admin"===getResponse.data.role){
                          history.push("/dashboard");
                         }
                         else if("projectManager"===getResponse.data.role){
                          history.push("/projectmanager"); 
                         }
                         else if("siteEngineer"===getResponse.data.role){
                          history.push("/siteengineer"); 
                         }
                         else if("siteCoordinator"===getResponse.data.role){
                          history.push("/sitecoordinator"); 
                         }
                         else if("finance"===getResponse.data.role){
                          history.push("/finance"); 
                         }
                         else{
                           history.push("/pagenotfound");
                         }
                        }

              });

            } else {
              message.error(response.message);
            }
          })
          .catch(error => {
            message.error("Incorrect username or password");
          });
          //end of getting user role and user information
      }
    });
  };
  
  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { history } = this.props;
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       localStorage.setItem("hello","hello world form react");
  //       axios.post('http://localhost:4000/api/Accounts/login',qs.stringify(values))
  //   .then(function (response) {
  //   console.log(response);
  //   localStorage.setItem("Accesstoken",response.data.id);
  //   //getting user information {"where": {"id": "5cb156c02ce1b8041e980450"}}
  //   axios.get("http://localhost:4000/api/Accounts/"+response.data.userId)
  //   .then(function (getResponse) {
  //     console.log(getResponse);
  //     localStorage.setItem("userRole",getResponse.data.role);
  //     localStorage.setItem("userName",getResponse.data.username);
  //     //this is the redirect by role 

      
  //     console.log("this the value :"+authuser.isAuthenticated());
  //     if(authuser.isAuthenticated()){
  //      if("admin"===getResponse.data.role){
  //       history.push("/dashboard");
  //      }
  //      else if("projectManager"===getResponse.data.role){
  //       history.push("/projectmanager"); 
  //      }
  //      else if("siteEngineer"===getResponse.data.role){
  //       history.push("/siteengineer"); 
  //      }
  //      else if("siteCoordinator"===getResponse.data.role){
  //       history.push("/sitecoordinator"); 
  //      }
  //      else if("finance"===getResponse.data.role){
  //       history.push("/finance"); 
  //      }
  //      else{
  //        history.push("/pagenotfound");
  //      }
  //     }
       
       
  //     //this is the reditect by role 
      
  //   })
  //   .catch(function (error) {
  //     console.log(error);
      
  //   });
  //   //getting user information

    
  // })
  // .catch(function (error) {
    
  //   console.log(error);
  // });
  //       console.log('Received values of form: ', values);
  //     // let valu="values";
  //      console.log(qs.stringify(values));
  //      console.log("?filter="+qs.stringify({"where": {"id": "5cb156c02ce1b8041e980450"}}));
  //     }
  //   });



  //   axios.get('http://localhost:4000/api/projects')
  //   .then(function (proresponse) {
  //     //console.log(proresponse);
  //     console.log(proresponse.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // }
  

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
          