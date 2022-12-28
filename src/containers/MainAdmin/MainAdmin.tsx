import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Outlet} from "react-router-dom";

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