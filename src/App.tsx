import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainAdmin from "./containers/MainAdmin/MainAdmin";
import Dishes from "./containers/Dishes/Dishes";
import Orders from "./containers/Orders/Orders";
import MainForm from "./components/MainForm/MainForm";

function App() {
  return (
    <Routes>
      <Route path='/admin' element={<MainAdmin/>}>
        <Route path='/admin/dishes' element={<Dishes/>}/>
        <Route path='/admin/dishes/new-dish' element={<MainForm/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>
      </Route>
    </Routes>
  );
}

export default App;
