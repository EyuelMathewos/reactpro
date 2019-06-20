import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import UserService from "../../../service/UserServices";
import {
  Layout, Menu, Icon, Avatar, Dropdown , Mention,Button, Card
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import {table} from "../Project/viewProjects";
import { height } from 'window-size';



export class projectManagerDash extends React.Component {
  render() {
    // console.log(projectSelected.projectName));

       return ( 
         <div>
           <h1>the Dashboard content will be here</h1>
          
           <Card style={{ width: 800, height:100}}>
        
       </Card>
         </div>
      
        )
      }
     


}
