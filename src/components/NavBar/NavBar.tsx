import React from 'react';
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <div className="container d-flex justify-content-between">
        <NavLink to='/admin' className="navbar-brand">Turtle Pizza Admin</NavLink>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="dishes" className="nav-link">
                Dishes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="orders" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;