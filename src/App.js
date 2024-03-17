import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";
 
function App() {

  return (
    
    <React.Fragment>
       {/* <button onClick={App}>wether app</button> */}
      <div className="container">
        <CurrentLocation />
      <div className="footer-info">
        | Developed by{" "}
        <a target="_blank" href="https://github.com/amirmoeed1/wether-App.git/">
        Amir Moeed 
        </a>{" "}|
      </div>
        
        
        
      </div>
    </React.Fragment>
  );
}

export default App;
