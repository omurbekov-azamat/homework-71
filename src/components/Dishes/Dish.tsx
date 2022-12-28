import React from 'react';
import {ApiDish} from "../../types";

interface Props {
  dish: ApiDish;
}

const Dish: React.FC<Props> = ({dish}) => {
  return (
    <div className='d-flex justify-content-between align-items-center p-2 mb-2 border'>
      <div className='d-flex align-items-center'>
        <img src={dish.image} alt={dish.title} style={{width: '100px', height: '100px'}}/>
        <p className='ms-3 text-capitalize'>{dish.title}</p>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <p className='me-3 text-capitalize m-0'>price: {dish.price} som</p>
        <div className='d-flex'>
          <button className='btn btn-info'>Edit</button>
          <button className='ms-4 btn btn-danger'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Dish;