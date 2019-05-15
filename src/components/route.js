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
import {table} from "./src/Project/viewProjects";
import {landingpage} from './landingPage';
import {projectManager} from './src/projectmanager';
import {siteCoordinator} from './src/sitecoordinator';
import {Events} from './src/Project/Tabel';
//import {Demo} from "./src/Project/viewReport"
let authuser = new auth();
const PrivateRoute = ({component: Component, ...rest}) =>(
  
  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean
   
   localStorage.getItem("auth")
   ?<Component {...props}/>
   : <Redirect to='/login'/>
  )

  }/>
)

const Main = () => (
  <main>
    
    <Switch>
      
       
      <Route  path="/dashboard" component={SiderDemo} />  
    
      <Route exact path="/" component={home} />
      <Route exact path="/project" component={project} />
      <Route exact path="/schedule" component={schedule}/>
      <Route exact path="/projectmanager/viewproject" component={table}/>
      {/* <Route exact path="/viewreport" component={report}/> */}
      {/* <Route path="/account" component={account} /> */}
      {/* <Route  path="/register" component={WrappedRegistrationForm} /> */}
      {/* <Route  path="/accountsetting" component={WrapperAccountSetting} /> */}
      <Route  path="/login" component={Login} />
      <Route  path="/table" component={Events} />
      <Route  path="/land" component={landingpage} />
      <Route path="/projectmanager" component={projectManager} />
      <Route path="/sitecoordinator" component={siteCoordinator} />
      <PrivateRoute path="/example" component={App}/>
      <Route exact path="/projectmanager/viewproject" component={table}/> 
    </Switch>
  </main>
  
  
);

export default Main;
