
import React from 'react';
import {Route,Switch, Redirect } from 'react-router-dom';
import { WrapperAccountSetting } from '../Admin/accountsetting';
//import {projectManager} from './projectmanager';
//import App from '../../../components/example';
//import auth from "../../auth";
import { Login } from '../../login';
import { project } from '../Project/createProject';
import {table} from "../Project/viewProjects";
import {createreport} from "../Project/createReport"
import {viewReport} from "../Project/viewReport";
import {createschedule} from "../Project/createSchedule";
import {viewSchedule} from "../Project/viewSchedule";
import {request} from "../Project/request";
import {createrep} from "../Project/createReq"
let logauth = new Login();

const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean
   //localStorage.getItem("auth")
   localStorage.getItem("authorized")
   ?<Component {...props}/>
   : <Redirect to='/login'/>
  )

  }/>
)



const Submain = () => (
  
  <main>
     <Switch>
       
      <Route exact path="/login" component={Login} />
      <Route  path="/sitecoordinator/accountsetting" component={WrapperAccountSetting} />   
      <PrivateRoute exact path="/sitecoordinator/viewproject" component={table}/>
      <Route exact path="/sitecoordinator/viewreport" component={viewReport}/> 
      <Route exact path="/sitecoordinator/viewschedule" component={viewSchedule}/>
      <Route path="/sitecoordinator/createreport" component={createrep}/>
    </Switch>
     
  </main>
);

export default Submain