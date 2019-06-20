
import React from 'react';
//import ReactDOM from 'react-dom';
import { WrappedRegistrationForm } from './Register'
 import { WrapperAccountSetting } from './accountsetting'
import { Login } from '../../login'
import {Route,Switch } from 'react-router-dom';
import {editReport} from "../Project/editReport"
import {viewSchedule} from "../Project/viewSchedule"
import {createschedule} from "../Project/createSchedule";
import {table} from "../Project/viewProjects";
import {createreport} from "../Project/createReport";
import { users } from './Users';
// import {frontDashboard} from "./frontDashboard"
// import {createreport} from "../Project/createReport"

const Submain = () => (
  <main>
     <Switch>
      {/* <Route exact path="/dashboard" component={frontDashboard} /> */}
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
      <Route  path="/login" component={Login} />    
    </Switch>
  
  </main>
);

export default Submain