import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import UserService from "../../../service/UserServices";
import {
  Layout, Menu, Icon, Avatar, Dropdown , Mention,Drawer
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
function drawercall() {
  
  // var localdata=JSON.parse(session.get("userData"));
  // var localuserdata=JSON.parse(localStorage.getItem("projectSelected"));
  // console.log(localdata);
  var localuserdata=JSON.parse(sessionStorage.getItem('userData'));
  console.log(localuserdata);

  return (
      <div>
        <center>
       <p><b>User Name</b></p>
       <p>{localuserdata.username} </p>
       <p><b>First Name</b></p>
       <p>{localuserdata.firstName} </p>
       <p><b>Middle Name</b></p>
       <p>{localuserdata.lastName} </p>
       <p><b>Role</b></p>
       <p>{localuserdata.role} </p>
       <p><b>Email</b></p>
       <p>{localuserdata.email} </p>
       </center>
      </div>
    
  );
}
//const SubMenu = Menu.SubMenu;

let value="this is the content";
let projectSelected;
if(localStorage.getItem("projectSelected")===null){
projectSelected="You Did't Select Any Project"
}else{
let projectselectedValue=localStorage.getItem("projectSelected");
projectSelected=JSON.parse(projectselectedValue);
}

export class TopHeader extends React.Component {
  state = {
    visible: false
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
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
     const menu = (
      <Menu theme="dark">
        <Menu.Item onClick={() => { this.showDrawer()}}>
        <Icon type="user" />
        <span>Account</span>
        </Menu.Item >
        {/* <Menu.Item>  
          <div>    
        <Icon type="user" />
        <a href="http://localhost:3000/projectmanager/accountsetting"> Account Setting</a>
        <Link to="/projectmanager/viewproject" />
        </div>  
        </Menu.Item> */}
        <Menu.Item onClick={() => { UserService.logout(); }}>
        <Icon type="logout" />
        <span>logout</span>
        </Menu.Item>
    
      </Menu>
    );
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

          <Drawer
        title="User Profile"
        placement="right"
        closable={true}
        onClose={this.onClose}
        visible={this.state.visible}
        
      >   {drawercall()}
      </Drawer>
         </Header> 
        );

    
    }
}