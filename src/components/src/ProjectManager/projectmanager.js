
import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Submain from './pManagerRoute';
import {TopHeader} from '../Header/topHeader';
import {
  Layout, Menu, Icon, Avatar, Button, Affix, Dropdown, Drawer
} from 'antd';

const {
  Header, Content, Footer, Sider,
} = Layout;

const SubMenu = Menu.SubMenu;

// console.log("this is the user data");
// let results=session.get("userData",(err, results) => (console.log("error occured")) );
// console.log(localStorage.getItem("projectSelected"));
// console.log(results);
export class projectManager extends React.Component {

  state = {
    collapsed: false,
    visible: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
   

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

  render() {
    return (
       <BrowserRouter>
       
      <Layout style={{ minHeight: '100vh' }}>
      
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Dashboard</span>
              <Link to="/projectmanager/dashboard" />
            </Menu.Item>
            <Menu.Item key="2">
            {/* onClick={() => alert("clicked")} */}
              <Icon type="desktop" />
              <span>View Projects</span>
              <Link to="/projectmanager/viewproject" />
            </Menu.Item>
            
            <SubMenu
              key="sub2"
              title={<span><Icon type="project" /><span>Manage Project</span></span>}
            >
              <Menu.Item key="6">
              Create Project
              <Link to="/projectmanager/createproject"/>
              </Menu.Item>
              <Menu.Item key="8">
              Requests
              <Link to="/projectmanager/request"/>
              </Menu.Item>
              <Menu.Item key="9">
              View Schedule
              <Link to="/projectmanager/viewschedule"/>
              </Menu.Item>
              <Menu.Item key="10">
              <span>view Report</span>
              <Link to="/projectmanager/viewreport" />
              </Menu.Item>
              <Menu.Item key="11">
              <span>User Access</span>
              <Link to="/projectmanager/useraccess" />
              </Menu.Item>
            

            </SubMenu>
          
          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0 }}>
          <div className="right">    
          <Dropdown overlay={menu} trigger={['click']}>
          <section>
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
          <span className="user">Account</span>
          </section>
          </Dropdown>
          </div>
          </Header> */}
          <TopHeader/>
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div> */}
            {/* <Main/> */}
             <Submain/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {/* Ant Design ©2018 Created by Ant UED */}
          </Footer>
        </Layout>
      </Layout>
       </BrowserRouter>
    );
  }
}
//export const siderdemo = Layout.create({ name: 'siderdemo' })(SiderDemo);
 //export default  SiderDemo;
//ReactDOM.Render(<SiderDemo />, document.getElementById('container'));
//export const dash = BrowserRouter.create({ name: 'dash' })(SiderDemo);