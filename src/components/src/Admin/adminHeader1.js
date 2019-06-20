import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import UserService from "../../../service/UserServices";
import {
  Layout, Menu, Icon, Avatar, Dropdown , Mention,
} from 'antd';
import axios from 'axios';
import qs from 'qs';

const {
  Header, Content, Footer, Sider,
} = Layout;

const { toString, toContentState } = Mention;

function onChange(contentState) {
  console.log(toString(contentState));
}

//const SubMenu = Menu.SubMenu;
const menu = (
  <Menu theme="dark">
    {/* <Menu.Item>
    <div>
    <Icon type="user" />
    <a href="http://localhost:3000/projectmanager/accountsetting"> Account</a>
    </div>
    </Menu.Item > */}
    {/* <Menu.Item onClick={() => { console.log("account setting has been clicked") }}>        
    <Icon type="user" />
    <span>Account setting</span>
    <Link to="/projectmanager/viewproject" />
    </Menu.Item> */}
    <Menu.Item onClick={() => { UserService.logout(); }}>
    <Icon type="logout" />
    <span>logout</span>
    </Menu.Item>

  </Menu>
);


export class AdminHeader extends React.Component {
  componentDidMount () {
    
  }
  // componentDidMount () {
  //   let component = this;
  //   var request = new XMLHttpRequest(); request.open('GET', '/table', true);
  //   request.onload = () => {
  //   if (request.status >= 200 && request.status < 400) {
  //   // Success!
    
  //   axios.get('http://localhost:4000/api/projects')
  //   .then(function (projectResponse) {
  //     //console.log(proresponse);
   
  //      let data =projectResponse.data;
  //     console.log("this is the data");
  //     console.log(projectResponse.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //   this.setState({someData: request.responseText}) } else {
  //           // We reached our target server, but it returned an error
  //           // Possibly handle the error by changing your state.
  //   } };
  //   request.onerror = () => {
  //   // There was a connection error of some sort.
  //   // Possibly handle the error by changing your state.
  //   };
  //       request.send();
  //      }

    render() {
     // console.log(projectSelected.projectName));

        return (  
        
          
         <Header style={{ background: '', padding: 0 }} > 
         <div className="right">   
          <Dropdown overlay={menu} trigger={['click']}>
          <section>
        
 
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <span className="user">Account</span>
          </section>
          </Dropdown>
          </div>
         </Header> 
        );
    }
}