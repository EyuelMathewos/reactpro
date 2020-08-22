import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Avatar, Icon } from 'antd';
import 'antd/dist/antd.css';
import '../components/home.css';
const menu = (
    <Menu theme="dark">
    <Menu.Item key="1">Home<Link to="/"/></Menu.Item>
    <Menu.Item key="2">Login<Link to="/Login"/></Menu.Item>
    {/* <Menu.Item key="3">About</Menu.Item> */}
  </Menu>
  );

  export class RightMenu extends Component {
  render() {
    return (
		<div className="rightMenu">   
          <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="menu-unfold" style={{ fontSize: '30px', color: '#08c' }}/>
          {/* <Avatar style={{ backgroundColor: '#87d068' }}/> */}
          </Dropdown>
        </div>
    );
  }
}

export default RightMenu;