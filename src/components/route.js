import React, { Component } from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import {home} from './home'
import { SiderDemo } from './dashboard';
 //import account from './accountsetting'
 //import { WrappedRegistrationForm } from './Register.js'
 //import { WrapperAccountSetting } from './accountsetting'
import { Login } from './login'
import { WrappedDemo } from './src/Project/project'
// import Settings from './Settings'
// import hellow from './Helloworld'
import App from './example';
import auth from "./auth";
const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean
   auth.isAuthenticated === true
   ?<Component {...props}/>
   : <Redirect to='/login'/>
  )

  }/>
)


const Main = () => (
  <main>
    
    <Switch>
      <Route exact path="/" component={home} />
      <Route exact path="/project" component={WrappedDemo} />

      {/* <Route path="/account" component={account} /> */}
      {/* <Route  path="/register" component={WrappedRegistrationForm} /> */}
      {/* <Route  path="/accountsetting" component={WrapperAccountSetting} /> */}
      <Route  path="/login" component={Login} />
      <Route  path="/dashboard" component={SiderDemo} />
      {/* <Route  path="/example" component={App} /> */}
      <PrivateRoute path="/example" component={App}/>
    </Switch>
  </main>
  
  
);

export default Main;
