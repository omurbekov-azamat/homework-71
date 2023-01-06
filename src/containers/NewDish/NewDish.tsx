import React from 'react';
import {Dish} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {createDish} from "../../store/dishesThunks";
import {useNavigate} from "react-router-dom";
import MainForm from "../../components/MainForm/MainForm";

const NewDish = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (meal: Dish) => {
    await dispatch(createDish(meal));
    navigate('/admin');
  };

  return (
    <div>
      <MainForm onSubmit={onSubmit}/>
    </div>
  );
};

export default NewDish;