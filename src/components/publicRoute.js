import React from 'react';
import {Route,Switch, Redirect } from 'react-router-dom';

import { home } from './home';




const Publicmain = () => (
  
  <main>
     <Switch>
     <Route exact path="/home" component={home}/>
      {/* <Route exact path="/login" component={Login} />
      {/* <Route path="/account" component={account} /> */}
      {/* <PrivateRoute path="/example" component={App}/>   */}
      {/* <Route  path="/siteengineer/accountsetting" component={WrapperAccountSetting} />
      <Route exact path="/siteengineer/createschedule" component={createschedule}/>
      <Route exact path="/siteengineer/viewproject" component={table}/>
      <Route path="/siteengineer/createreport" component={createreport} /> 
      <Route exact path="/siteengineer/viewreport" component={viewReport}/> 
      
      <Route exact path="/siteengineer/viewschedule" component={viewSchedule}/>
      <Route exact path="/siteengineer/request" component={request}/> */} 
    </Switch>
     
  </main>
);

export default Publicmain