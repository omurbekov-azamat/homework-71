import React from 'react';
import {completeOrder} from "../../store/dishesThunks";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {DELIVERY} from "../../constants";
import OrderApi from "./OrderApi";
import {AboutNewOrder} from "../../types";
import {selectCompleteOrderLoading} from "../../store/dishesSlice";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  items: AboutNewOrder[],
  id: string;
}

const OrdersApi: React.FC<Props> = ({items, id}) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectCompleteOrderLoading);

  const total = items.reduce((sum, order) => {
    return sum + order.price;
  }, DELIVERY);

  const onDeleteOrder = async (id: string) => {
    await dispatch(completeOrder(id));
  };

  return (
    <>
      {items.map((test) => (
          <OrderApi
            key={Math.random() * 99999}
            item={test}
          />
      ))}
      <div  className='d-flex justify-content-between text-capitalize'>
        <div>
          <p>delivery: </p>
          <p>total: </p>
        </div>
        <div>
          <p>price: {DELIVERY} som</p>
          <p>price: {total} som</p>
        </div>
      </div>
      <div className='text-center'>
        <button
          className='btn btn-danger'
          onClick={() => onDeleteOrder(id)}
          disabled={deleteLoading ? deleteLoading === id : false}
        >
          {deleteLoading && deleteLoading === id && <ButtonSpinner/>}
          Complete order
        </button>
      </div>
    </>
  );
};

export default OrdersApi;