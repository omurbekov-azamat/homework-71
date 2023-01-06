import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const MainAdmin = () => {
  return (
    <div>
      <NavBar/>
      <div className='container'>
        <Outlet/>
      </div>
    </div>
  );
};

export default MainAdmin;