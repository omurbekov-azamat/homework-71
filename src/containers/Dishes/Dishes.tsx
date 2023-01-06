import React from 'react';
import {Link} from "react-router-dom";
import Meals from "../../components/Dishes/Meals";

const Dishes = () => {
  return (
    <div>
      <div className='d-flex justify-content-between mb-3'>
        Dishes
        <Link
          to='/admin/new-dish'
          className='btn btn-outline-danger'
        >
          Add new Dish
        </Link>
      </div>
      <Meals/>
    </div>
  );
};

export default Dishes;