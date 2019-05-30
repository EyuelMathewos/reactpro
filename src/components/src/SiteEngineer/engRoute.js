
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
      {/* <Route path="/account" component={account} /> */}
      {/* <PrivateRoute path="/example" component={App}/>   */}
      <Route  path="/siteengineer/accountsetting" component={WrapperAccountSetting} />
      <Route exact path="/siteengineer/createschedule" component={createschedule}/>
      <Route exact path="/siteengineer/viewproject" component={table}/>
      <Route path="/siteengineer/createreport" component={createreport} /> 
      <Route exact path="/siteengineer/viewreport" component={viewReport}/> 
      
      <Route exact path="/siteengineer/viewschedule" component={viewSchedule}/>
      <Route exact path="/siteengineer/request" component={request}/>
    </Switch>
     
  </main>
);

export default Submain