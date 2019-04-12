import React from "react";
import "./style.css";

function Header(props) {

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor:'darkblue' }}>
      <div>
        <h1 style={{color:'white'}}>{props.children}</h1>
      </div>
      <div>
        <p style={{color:'white'}}>{props.result}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <p style={{ marginRight: 10, color:'white' }}>Score: {props.score}</p>
        <p style={{color:'white'}}>Top Score: {props.topScore}</p>
      </div>
    </div>

  )
}

export default Header;
