import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import { Layout, Menu, Breadcrumb,Popover,Card, Icon, Avatar } from 'antd';
import { SplitImg, Split, SplitTitle, Synopsis, SplitSide } from "../Home/components/Split.js";
import site from '../Home/components/assets/img/site.jpg';
const { Header, Content, Footer } = Layout;

export class home extends React.Component {
 

  render() {
   
    return (
      <Content>
    
      <div style={{ background: '', padding: 0 }}>
      {/* <Card
     style={{ width: "100%" }}
    cover={
      <img
        alt="example"
        src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
      />
    }
  >
  </Card> */}
          <Split>
        <Synopsis>
            <div>
             <SplitTitle>CMS</SplitTitle>
                <p>Construction Management System</p>
            </div>
            </Synopsis>
        </Split>

        <SplitSide>
            <div>
                <SplitTitle>Construction Management System</SplitTitle>
                <p>
                Construction management software is a project management platform that helps companies in processes like budget management, communication, decision-making, and job scheduling, to name a few.
                </p>
            </div>
            <div>
                <SplitImg src={site} alt="" />
            </div>



        </SplitSide>
      </div>
      </Content>

    );
  }
}