import React, { useState, useEffect, useRef } from 'react'
// import ReactDOM from 'react-dom';
import { Link, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './home.css';
import Publicmain from './publicRoute';
import Main from './route'
import { home } from './home';
import {MainMenu} from '../Home/MainMenu'
import { RightMenu } from '../Home/RightMenu'
import { Layout, Menu, Breadcrumb,Popover,Dropdown,Avatar } from 'antd';

const { Header, Content, Footer } = Layout;

const menu = (
  <Menu theme="dark">
  <Menu.Item key="1">Home<Link to="/"/></Menu.Item>
  <Menu.Item key="2">Login<Link to="/Login"/></Menu.Item>
  {/* <Menu.Item key="3">About</Menu.Item> */}
</Menu>
);
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return <span>Window width {width}</span>;
}



export class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    };
  }

  // local methods
  setWindowWidth = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  // lifecycle methods
  componentDidMount() {
    window.addEventListener("resize", this.setWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setWindowWidth);
  }


  // componentDidMount() {
  //   window.addEventListener('resize', this.updateWidth());
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.updateWidth());
  // }



  render() {
    
      
    return (
      <BrowserRouter>
      <Layout className="layout">
      <Header style={{  padding: 0 }}>
        <div className="logo" />
        {/* <div className="rightMenu">   
          <Dropdown overlay={menu} trigger={['click']}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon="list" />
          </Dropdown>
        </div> */}
        {console.log("this.windowWidth"+this.state.width),this.state.width<500?<RightMenu/>:<MainMenu/>}
        
      </Header>
      <Content >
        <div className="site-layout-content"><Publicmain/></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    </BrowserRouter>
     );
  }
}
