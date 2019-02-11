import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './components/hello'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import WhiteBoard from './components/WhiteBoard'
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <div className="container-fluid">
    <WhiteBoard/>
  </div>,
  document.getElementById("root")
);