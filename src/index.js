import React from "react";
// import { render } from 'react-dom';
// import { SiderDemo } from './components/dashboard';
// import {Login} from './components/login';
import Main from './components/route';
// import App from './components/dashroute';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom'
// render((
//   <div className="item-card">
//   <BrowserRouter>
//     {/* <SiderDemo/> */}
//     {/* <Login/> */}
//     {/* <Main/> */}
    
//   </BrowserRouter>


//   </div>

  
  
// ), document.getElementById('container'));


ReactDOM.render(
  <BrowserRouter>
      {/* <SiderDemo/> */}
      {/* <Login/> */}
      <Main/>
  </BrowserRouter>,
  document.getElementById('container')
  );