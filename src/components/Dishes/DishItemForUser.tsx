import React from 'react';
import {ApiDish} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {addDish} from "../../store/dishesSlice";

interface Props {
  dish: ApiDish;
}

const DishItemForUser: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();

  const addToOrder = () => {
    dispatch(addDish(dish));
  };

  return (
    <div
      className='d-flex justify-content-between align-items-center p-2 mb-2 border'
      onClick={addToOrder}
    >
      <div className='d-flex align-items-center'>
        <img
          src={dish.image}
          alt={dish.title}
          style={{width: '100px', height: '100px'}}
        />
        <p className='ms-3 text-capitalize'>{dish.title}</p>
      </div>
        <p className='me-3 text-capitalize m-0'>price: {dish.price} som</p>
    </div>
  );
};

export default DishItemForUser;