import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {selectOrders, selectOrdersLoadings} from "../../store/dishesSlice";
import {fetchOrders} from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";
import OrdersApi from "../../components/OrderApi/OrdersApi";

const Orders = () => {
  const dispatch = useAppDispatch();
  const gotOrders = useAppSelector(selectOrders);
  const fetchLoading = useAppSelector(selectOrdersLoadings);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  let noOrder: JSX.Element | JSX.Element[] = <h1 className='text-center'>There is no order</h1>;

  if (gotOrders.length > 0) {
    noOrder = gotOrders.map((order) => (
      <div
        className='border border-dark p-2 m-2'
        key={Math.random() * 99999}
      >
        <OrdersApi items={order.orders} id={order.id}/>
      </div>
    ))
  }

  return (
    <>
      {fetchLoading && <Spinner/>}
      {noOrder}
    </>
  );
};

export default Orders;