
import React from 'react';
import {Route,Switch, Redirect } from 'react-router-dom';
import { WrapperAccountSetting } from '../Admin/accountsetting';
import {projectManager} from './projectmanager';
import App from '../../../components/example';
import auth from "../../auth";
import { Login } from '../../login';
import { project } from '../Project/createProject';
import {table} from "../Project/viewProjects";
import {viewReport} from "../Project/viewReport";
import {viewSchedule} from "../Project/viewSchedule"
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
       
      {/* <Route exact path="/login" component={Login} /> */}
      {/* <Route path="/account" component={account} /> */}
      {/* <PrivateRoute path="/example" component={App}/>   */}
      <Route  path="/projectmanager/accountsetting" component={WrapperAccountSetting} />
      <PrivateRoute path="/projectmanager/createproject" component={project}/> 
      <PrivateRoute exact path="/projectmanager/viewproject" component={table}/> 
      <Route exact path="/projectmanager/viewreport" component={viewReport}/> 
      <Route exact path="/projectmanager/viewschedule" component={viewSchedule}/>
    </Switch>
     
  </main>
);

export default Submain