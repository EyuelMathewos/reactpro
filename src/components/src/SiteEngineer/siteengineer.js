
import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
//import '../../../index.css';
 import Main from '../../route';
import Submain from '../../src/Admin/dashroute';

import {
  Layout, Menu, Icon,
} from 'antd';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

export class siteEngineer extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

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
              <Link to="/dashboard" />
            </Menu.Item>
            <Menu.Item key="2">
            {/* onClick={() => alert("clicked")} */}
              <Icon type="desktop" />
              <span>View Projects</span>
              <Link to="/siteengineer/viewproject" />
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Schedule</span></span>}
            >
              <Menu.Item key="3">create Schedule<Link to="/siteengineer/createschedule"/></Menu.Item>
              <Menu.Item key="4">view Schedule<Link to="/siteengineer/viewschedule/"/></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>Send Report</span></span>}
            >
              <Menu.Item key="5">create Report<Link to="/siteengineer/createreport"/></Menu.Item>
              <Menu.Item key="6">Edit Report<Link to="/siteengineer/editreport"/></Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
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
            Ant Design ©2018 Created by Ant UED
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