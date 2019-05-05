
import React from 'react';
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;



export class home extends React.Component {
  

  render() {
    
   
    return (
      <Layout className="layout">
    <Header>
      <div className="homelogo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Contact us</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>
    </Header>
    <Content>

      <div style={{ background: '#fff', padding: 0, minHeight: 510 }}>Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
    );
  }
}
