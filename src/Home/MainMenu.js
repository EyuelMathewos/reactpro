import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
export class MainMenu extends Component {
  render() {
    return (
      <div className="rightMainMenu">   
  
        <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">Home<Link to="/"/></Menu.Item>
            <Menu.Item key="2">Login<Link to="/Login"/></Menu.Item>
        </Menu>
      </div>
    );
  }
}
