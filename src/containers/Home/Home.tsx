import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {resetDish, showCheckOrder, selectDishes, selectFetchDishesLoading, selectOrderDishes} from "../../store/dishesSlice";
import {fetchDishes} from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";
import DishItemForUser from "../../components/Dishes/DishItemForUser";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectFetchDishesLoading);
  const orderDishes = useAppSelector(selectOrderDishes);

  let order = (
    <div className="alert alert-primary">
      Order is empty! Add something!
    </div>
  );

  const total = orderDishes.reduce((sum, order) => {
    return sum + order.amount * order.dish.price;
  }, 0);

  useEffect(() => {
      dispatch(fetchDishes());
  }, [dispatch]);

  if (orderDishes.length > 0) {
    order = (
        <div className="alert alert-primary d-flex justify-content-between">
          Order is total: {total} kgs
          <button
            className='btn btn-outline-dark'
            onClick={() => dispatch(showCheckOrder())}
          >
            Checkout
          </button>
        </div>
    )
  }

  return (
    <>
      <div className="navbar navbar-expand-sm navbar-dark bg-success mb-3">
        <div className="container">
          <NavLink
            to='/'
            className="navbar-brand"
            onClick={() => dispatch(resetDish())}
          >
            Turtle Pizza
          </NavLink>
        </div>
      </div>
      <div className='container'>
        <div className='overflow-auto' style={{height: '500px'}}>
          {fetchLoading ? <Spinner/> : dishes.map((dish) => (
            <DishItemForUser
              dish={dish}
              key={dish.id}
            />
          ))}
        </div>
        {order}
        <Modal/>
      </div>
    </>
  );
};

export default Home;