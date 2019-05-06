import React, { Component } from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import {home} from './home'
import { SiderDemo } from './dashboard';
 //import account from './accountsetting'
 //import { WrappedRegistrationForm } from './Register.js'
 //import { WrapperAccountSetting } from './accountsetting'
import { Login } from './login'
import { project } from './src/Project/project';
import {schedule} from "./src/Project/schedule";
// import Settings from './Settings'
// import hellow from './Helloworld'
import App from './example';
import auth from "./auth";
import {landingpage} from './landingPage';
//import {Demo} from "./src/Project/viewReport"
let authuser = new auth();
const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean
   
   authuser.isAuthenticated() === true
   ?<Component {...props}/>
   : <Redirect to='/login'/>
  )

  }/>
)


const Main = () => (
  <main>
    
    <Switch>
      <Route exact path="/" component={home} />
      <Route exact path="/project" component={project} />
      <Route exact path="/schedule" component={schedule}/>
      {/* <Route exact path="/viewreport" component={report}/> */}
      {/* <Route path="/account" component={account} /> */}
      {/* <Route  path="/register" component={WrappedRegistrationForm} /> */}
      {/* <Route  path="/accountsetting" component={WrapperAccountSetting} /> */}
      <Route  path="/login" component={Login} />
      <Route  path="/dashboard" component={SiderDemo} />
      <Route  path="/land" component={landingpage} />
      <PrivateRoute path="/example" component={App}/>
    </Switch>
  </main>
  
  
);

export default Main;
