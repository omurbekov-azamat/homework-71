import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectDishes, selectFetchDishesLoading} from "../../store/dishesSlice";
import {fetchDishes} from "../../store/dishesThunks";
import Spinner from "../Spinner/Spinner";
import Dish from "./Dish";

const Meals = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectFetchDishesLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      {fetchLoading ? <Spinner/> : dishes.map((dish) => (
        <Dish
          dish={dish}
          key={dish.id}
        />
      ))}
    </div>
  );
};

export default Meals;