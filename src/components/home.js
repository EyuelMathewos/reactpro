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

export class home extends React.Component {
 

  render() {
   
    return (
      <div style={{ background: '', padding: 0, minHeight: 510 }}>This is the home</div>
  // <div><h1>This is the home</h1></div>
    );
  }
}