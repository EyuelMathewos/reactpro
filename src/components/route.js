import React, { Component } from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import {home} from './home'
import { SiderDemo } from './src/Admin/dashboard';
 //import account from './accountsetting'
 //import { WrappedRegistrationForm } from './Register.js'
 //import { WrapperAccountSetting } from './accountsetting'
import { Login } from './login'
import { project } from './src/Project/createProject';
import {createschedule} from "./src/Project/createSchedule";
// import Settings from './Settings'
// import hellow from './Helloworld'
import * as session from 'browser-session-store';
import App from './example';
import auth from "./auth";
 import {table} from "./src/Project/viewProjects";
import {landingpage} from './landingPage';
import {projectManager} from './src/ProjectManager/projectmanager';
import {siteCoordinator} from './src/SiteCoordinator/sitecoordinator';
import {siteEngineer} from './src/SiteEngineer/siteengineer'
//import {Events} from './src/Project/Tabel';
import {createreport} from "./src/Project/createReport"
import {editReport} from "./src/Project/editReport"
import {viewSchedule} from "./src/Project/viewSchedule"
let authuser = new auth();
const PrivateRoute = ({component: Component, ...rest}) =>(

  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean

   localStorage.getItem("authorized")
   ?<Component {...props}/>
   : <Redirect to='/login'/>
  )

  }/>
)

const Main = () => (
  <main>
    
    <Switch>
    /sitecoordinator/viewproject
      <Route  path="/dashboard" component={SiderDemo} />  
      <Route exact path="/" component={home} />
      <Route exact path="/project" component={project} />
      <Route exact path="/createschedule" component={createschedule}/>
      <Route path="/siteengineer/createreport" component={createreport} />
      <Route exact path="/siteengineer/editreport" component={editReport}/>
      {/* <Route exact path="/viewschedule" component={viewSchedule}/> */}
      {/* <Route path="/account" component={account} /> */}
      {/* <Route  path="/register" component={WrappedRegistrationForm} /> */}
      {/* <Route  path="/accountsetting" component={WrapperAccountSetting} /> */}
      <Route  path="/login" component={Login} />
      {/* <Route  path="/table" component={Events} /> */}
      <Route  path="/land" component={landingpage} />
      <PrivateRoute path="/projectmanager" component={projectManager} />
      <PrivateRoute exact path="/siteengineer" component={siteEngineer}/>
      <PrivateRoute path="/sitecoordinator" component={siteCoordinator} />
      <PrivateRoute path="/example" component={App}/>
      <Route exact path="/siteengineer/viewproject" component={table}/> 
    </Switch>
  </main>
  
  
);

export default Main;
