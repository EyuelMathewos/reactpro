
import React from 'react';
import {Route,Switch, Redirect } from 'react-router-dom';
import {projectManager} from './projectmanager';
import App from '../example';
import auth from "../auth";
import { Login } from '../login';
import { project } from './Project/project';
import {table} from "./Project/viewProjects";
let logauth = new Login();

const PrivateRoute = ({component: Component, ...rest}) =>(
  <Route {...rest} render={(props)=>(
   //need to auth.isAuthenticated to return boolean
   
   localStorage.getItem("auth")
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
      <PrivateRoute path="/example" component={App}/>  
      <PrivateRoute path="/projectmanager/createproject" component={project}/> 
      <Route exact path="/projectmanager/viewproject" component={table}/> 
    </Switch>
     
  </main>
);

export default Submain