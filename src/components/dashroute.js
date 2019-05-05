
import React from 'react';
//import ReactDOM from 'react-dom';
import { WrappedRegistrationForm } from './Register.js'
 import { WrapperAccountSetting } from './accountsetting'
import { Login } from './login'
import {Route,Switch } from 'react-router-dom';




const Submain = () => (
  <main>
     <Switch>
      {/* <Route exact path="/dashboard" component={SiderDemo} /> */}
      {/* <Route path="/account" component={account} /> */}
      <Route  path="/dashboard/register" component={WrappedRegistrationForm} />
      <Route  path="/dashboard/accountsetting" component={WrapperAccountSetting} />
      <Route  path="/dashboard/login" component={Login} />    
    </Switch>
  
  </main>
);

export default Submain