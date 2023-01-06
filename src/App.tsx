import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainAdmin from "./containers/MainAdmin/MainAdmin";
import Dishes from "./containers/Dishes/Dishes";
import Orders from "./containers/Orders/Orders";
import NewDish from "./containers/NewDish/NewDish";
import EditDish from "./containers/EditDish/EditDish";
import Home from "./containers/Home/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin' element={<MainAdmin/>}>
        <Route path='/admin' element={<Dishes/>}/>
        <Route path='/admin/dishes' element={<Dishes/>}/>
        <Route path='/admin/new-dish' element={<NewDish/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>
        <Route path='/admin/edit-dish/:id' element={<EditDish/>}/>
      </Route>
      <Route path='*' element={<h1>Not found!</h1>}/>
    </Routes>
  );
}

export default App;
