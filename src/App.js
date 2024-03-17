import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
 
function App() {

  return (
     
    <React.Fragment>
        
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        | Developed by Amir Moeed |{" "}
        <a target="_blank" href="https://github.com/amirmoeed1/wether-App.git/">
        Source Code
        </a>{" "}|
        
        
        
      </div>
    </React.Fragment>
  );
}

export default App;
