import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import UserService from "../../../service/UserServices";
import {
  Layout, Menu, Icon, Avatar, Dropdown , Mention,Button,Row, Col, Card, Tooltip
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { users } from './Users';


export class frontDashboard extends React.Component {
  render() {
    // console.log(projectSelected.projectName));

       return ( 
        
<div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
      <Card bordered={false}>
          Card content
        </Card>  
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
        )
      }



}
