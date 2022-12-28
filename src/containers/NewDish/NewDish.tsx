import React from 'react';
import MainForm from "../../components/MainForm/MainForm";
import {Dish} from "../../types";
import {useAppDispatch} from "../../app/hook";
import {createDish} from "../../store/dishesThunks";

const NewDish = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (meal: Dish) => {
    await dispatch(createDish(meal));
  };

  return (
    <div>
      <MainForm onSubmit={onSubmit}/>
    </div>
  );
};

export default NewDish;