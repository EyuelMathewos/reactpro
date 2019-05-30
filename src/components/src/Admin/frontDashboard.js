import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import UserService from "../../../service/UserServices";
import {
  Layout, Menu, Icon, Avatar, Dropdown , Mention,Button
} from 'antd';
import axios from 'axios';
import qs from 'qs';



export class frontDashboard extends React.Component {
  render() {
    // console.log(projectSelected.projectName));

       return ( 
         <div>
           <Button type="primary" onClick={this.showDrawer}>
          <Icon type="plus" /> New account
        </Button>
         </div>
        )
      }



}
