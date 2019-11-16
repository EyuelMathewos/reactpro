
import React from 'react';
//import ReactDOM from 'react-dom';
import { WrappedRegistrationForm } from './Register'
 import { WrapperAccountSetting } from './accountsetting'
import { Login } from '../../login'
import {Route,Switch,Redirect } from 'react-router-dom';
import {editReport} from "../Project/editReport"
import {viewSchedule} from "../Project/viewSchedule"
import {createschedule} from "../Project/createSchedule";
import {table} from "../Project/viewProjects";
import {createreport} from "../Project/createReport";
import { users } from './Users';
import {frontDashboard} from "./frontDashboard"
// import {createreport} from "../Project/createReport"
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
      <Route exact path="/dashboard" component={frontDashboard} />
      {/* <Route path="/account" component={account} /> */}
      {/* <Route path="/createreport" component={createreport} /> */}
      <Route path="/siteengineer/createreport" component={createreport} />
      <Route exact path="/siteengineer/editreport" component={editReport}/>
      <Route exact path="/siteengineer/createschedule" component={createschedule}/>
      <Route exact path="/siteengineer/viewschedule" component={viewSchedule}/>
      <Route exact path="/siteengineer/viewproject" component={table}/> 
      <Route  path="/dashboard/register" component={WrappedRegistrationForm} />
      <Route  path="/dashboard/accountsetting" component={WrapperAccountSetting} />
      <Route path="/dashboard/users" component={users}/>
     
    </Switch>
  
  </main>
);

export default Submain