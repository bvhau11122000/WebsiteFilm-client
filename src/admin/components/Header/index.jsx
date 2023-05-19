import React from "react";
import User from "../HomePage/User";
import "./header.css";


const Header = () => {
  
  return (
    <div className="DbHeader">
      <h1 >Vanhau2000</h1>
      <div className="DbHeader_item">
        <User />
      </div>
    </div>
  );
};

export default Header;
