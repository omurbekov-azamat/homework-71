import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {deleteDish} from "../../store/dishesThunks";
import {selectDeleteLoading} from "../../store/dishesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {ApiDish} from "../../types";

interface Props {
  dish: ApiDish;
}

const Dish: React.FC<Props> = ({dish}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const navigate = useNavigate();

  const onDeleteDish = async (id: string) => {
    await dispatch(deleteDish(id));
  };

  return (
    <div className='d-flex justify-content-between align-items-center p-2 mb-2 border'>
      <div className='d-flex align-items-center'>
        <img src={dish.image} alt={dish.title} style={{width: '100px', height: '100px'}}/>
        <p className='ms-3 text-capitalize'>{dish.title}</p>
      </div>
      <div className='d-flex flex-row align-items-center'>
        <p className='me-3 text-capitalize m-0'>price: {dish.price} som</p>
        <div className='d-flex'>
          <button
            className='btn btn-info'
            onClick={() => navigate('/admin/edit-dish/' + dish.id)}
            disabled={deleteLoading ? deleteLoading === dish.id : false}
          >
            Edit
          </button>
          <button
            className='ms-4 btn btn-danger'
            onClick={() => onDeleteDish(dish.id)}
            disabled={deleteLoading ? deleteLoading === dish.id : false}
          >
            {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dish;