
import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../index.css';
import Publicmain from './publicRoute';
//import Main from './route'
import { Layout, Menu, Breadcrumb,Popover } from 'antd';

const { Header, Content, Footer } = Layout;



export class landingPage extends React.Component {
  

  render() {
    
   
    return (
      <BrowserRouter>
      <Layout className="layout">
    <Header>
      <div className="homelogo" />
      <div className="Menu">
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home<Link to="/home"/></Menu.Item>
        <Menu.Item key="2">Contact us</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>
      </div>
    </Header>
    <Content style={{ margin: '0 16px' }}>
      <Publicmain/>
      {/* <main/> */}
      {/* <div style={{ background: '#fff', padding: 0, minHeight: 510 }}>Content</div> */}
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      
    </Footer>
  </Layout>
  </BrowserRouter>
    );
  }
}
