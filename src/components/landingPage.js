import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import auth from './auth';
import {
  Form, Icon, Input, Button, Checkbox, Card
} from 'antd';
let authuser = new auth();

const AuthButton = withRouter(
  ({ history }) =>
  authuser.isAuthenticated ? (
      <p>
        Welcome!{" "}
       
        <Button
          onClick={() => {
            authuser.login(() => {
              history.push("/example");
            });
          }}
          type="primary" htmlType="submit" className="login-form-button">
          Sign out
        </Button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);
export class landingpage extends React.Component {
 

  render() {
   
    return (
  
  <AuthButton/>
    );
  }
}